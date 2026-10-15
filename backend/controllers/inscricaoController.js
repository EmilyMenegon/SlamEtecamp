import db from "../database.js";

const TURNOS = ["Manhã", "Tarde", "Noite"];

function textoValido(valor, max) {
  return (
    typeof valor === "string" &&
    valor.trim().length > 0 &&
    valor.trim().length <= max
  );
}

export function criarInscricao(req, res) {
  // O e-mail vem do token, nunca do corpo da requisição:
  // assim ninguém consegue inscrever a conta de outra pessoa.
  const email = req.usuario.email;
  const { nome_poeta, turma, turno, curso } = req.body;

  if (!nome_poeta || !turma || !turno || !curso) {
    return res.status(400).json({
      erro: "Preencha todos os campos.",
    });
  }

  if (
    !textoValido(nome_poeta, 100) ||
    !textoValido(turma, 40) ||
    !textoValido(curso, 60) ||
    !TURNOS.includes(turno)
  ) {
    return res.status(400).json({
      erro: "Dados da inscrição inválidos.",
    });
  }

  const usuario = db
    .prepare("SELECT * FROM usuario WHERE email = ?")
    .get(email);

  if (!usuario) {
    return res.status(404).json({
      erro: "Usuário não encontrado.",
    });
  }

  if (usuario.inscricao_id) {
    return res.status(400).json({
      erro: "Você já realizou sua inscrição.",
    });
  }

  try {
    const stmtInscricao = db.prepare(
      `INSERT INTO inscricoes
       (nome_poeta, turma, turno, curso, criado_em)
       VALUES (?, ?, ?, ?, datetime('now'))`
    );

    const info = stmtInscricao.run(
      nome_poeta,
      turma,
      turno,
      curso
    );

    db.prepare(
      `UPDATE usuario
       SET tipo_usuario = 'poeta',
           inscricao_id = ?
       WHERE email = ?`
    ).run(info.lastInsertRowid, email);

    res.status(201).json({
      mensagem: "Inscrição realizada com sucesso!",
      tipo: "poeta",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: "Erro ao realizar inscrição.",
    });
  }
}

export function buscarInscricaoPorEmail(req, res) {
  // Só o organizador pode consultar outro e-mail; os demais veem apenas o próprio.
  const email =
    req.usuario.tipo === "organizador" ? req.params.email : req.usuario.email;

  const usuario = db
    .prepare(
      "SELECT inscricao_id FROM usuario WHERE email = ?"
    )
    .get(email);

  if (!usuario || !usuario.inscricao_id) {
    return res.status(404).json({
      erro: "Nenhuma inscrição encontrada.",
    });
  }

  const inscricao = db
    .prepare(
      "SELECT * FROM inscricoes WHERE id_inscricoes = ?"
    )
    .get(usuario.inscricao_id);

  res.json(inscricao);
}

export function listarInscricoes(req, res) {
  const inscricoes = db
    .prepare(`
      SELECT
        i.*,

        CASE
          WHEN EXISTS (
            SELECT 1
            FROM usuario u
            JOIN usuario_evento pe
              ON pe.usuario_id = u.id
            WHERE u.inscricao_id = i.id_inscricoes
          )
          THEN 1
          ELSE 0
        END AS atribuido_evento,

        (
          SELECT e.nome
          FROM usuario u
          JOIN usuario_evento pe
            ON pe.usuario_id = u.id
          JOIN evento e
            ON e.id_evento = pe.evento_id
          WHERE u.inscricao_id = i.id_inscricoes
          ORDER BY e.id_evento
          LIMIT 1
        ) AS evento_nome

      FROM inscricoes i
      ORDER BY i.id_inscricoes
    `)
    .all();

  res.json(inscricoes);
}

export function atualizarInscricao(req, res) {
  const { id } = req.params;
  const { nome_poeta, turma, turno, curso } = req.body;

  if (!nome_poeta || !turma || !turno || !curso) {
    return res.status(400).json({
      erro: "Preencha todos os campos.",
    });
  }

  if (
    !textoValido(nome_poeta, 100) ||
    !textoValido(turma, 40) ||
    !textoValido(curso, 60) ||
    !TURNOS.includes(turno)
  ) {
    return res.status(400).json({
      erro: "Dados da inscrição inválidos.",
    });
  }

  const info = db
    .prepare(
      `UPDATE inscricoes
       SET nome_poeta = ?,
           turma = ?,
           turno = ?,
           curso = ?
       WHERE id_inscricoes = ?`
    )
    .run(
      nome_poeta,
      turma,
      turno,
      curso,
      id
    );

  if (info.changes === 0) {
    return res.status(404).json({
      erro: "Inscrição não encontrada.",
    });
  }

  res.json({
    mensagem: "Inscrição atualizada com sucesso!",
  });
}

export function excluirInscricao(req, res) {
  const { id } = req.params;

  const inscricao = db
    .prepare(`
      SELECT
        i.id_inscricoes,
        i.nome_poeta,
        u.id AS usuario_id
      FROM inscricoes i
      LEFT JOIN usuario u
        ON u.inscricao_id = i.id_inscricoes
      WHERE i.id_inscricoes = ?
    `)
    .get(id);

  if (!inscricao) {
    return res.status(404).json({
      erro: "Inscrição não encontrada.",
    });
  }

  if (inscricao.usuario_id) {
    const participante = db
      .prepare(`
        SELECT
          pe.id,
          e.nome
        FROM usuario_evento pe
        JOIN evento e
          ON e.id_evento = pe.evento_id
        WHERE pe.usuario_id = ?
        LIMIT 1
      `)
      .get(inscricao.usuario_id);

    if (participante) {
      return res.status(400).json({
        erro:
          `Não é possível excluir esta inscrição porque o poeta ` +
          `já está atribuído ao evento "${participante.nome}".`,
      });
    }
  }

  try {
    const info = db
      .prepare(
        "DELETE FROM inscricoes WHERE id_inscricoes = ?"
      )
      .run(id);

    if (info.changes === 0) {
      return res.status(404).json({
        erro: "Inscrição não encontrada.",
      });
    }

    db.prepare(`
      UPDATE usuario
      SET tipo_usuario = 'aluno',
          inscricao_id = NULL
      WHERE inscricao_id = ?
    `).run(id);

    res.status(200).json({
      mensagem: "Inscrição excluída com sucesso!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: "Erro ao excluir inscrição.",
    });
  }
}

export function listarPoetas(req, res) {
  const poetas = db
    .prepare(`
      SELECT
        u.id AS usuarioId,
        i.nome_poeta,
        i.turma,
        i.turno,
        i.curso
      FROM usuario u
      JOIN inscricoes i
        ON i.id_inscricoes = u.inscricao_id
      WHERE u.tipo_usuario = 'poeta'
      ORDER BY i.nome_poeta
    `)
    .all();

  res.json(poetas);
}