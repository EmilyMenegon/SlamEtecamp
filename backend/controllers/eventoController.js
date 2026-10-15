import db from "../database.js";

function resolverUsuarioId(email) {
  const usuario = db
    .prepare("SELECT id FROM usuario WHERE email = ?")
    .get(email);

  return usuario ? usuario.id : null;
}

function montarEvento(linhaEvento) {
  return {
    id: linhaEvento.id_evento,
    nome: linhaEvento.nome,
    descricao: linhaEvento.descricao,
    data: linhaEvento.data_evento,
    horario: linhaEvento.horario,
    local: linhaEvento.local,
    imagem: linhaEvento.imagem || "",
    criadoEm: linhaEvento.criado_em,
  };
}

export function listarEventos(req, res) {
  const linhas = db
    .prepare("SELECT * FROM evento ORDER BY id_evento DESC")
    .all();

  res.json(linhas.map(montarEvento));
}

export function criarEvento(req, res) {
  const { nome, descricao, data, horario, local, imagem } = req.body;

  if (!nome || !descricao || !data || !horario || !local) {
    return res.status(400).json({
      erro: "Preencha todos os campos obrigatórios.",
    });
  }

  const usuarioId = resolverUsuarioId(req.usuario.email);

  if (!usuarioId) {
    return res.status(401).json({
      erro: "Usuário não encontrado.",
    });
  }

  try {
    const info = db
      .prepare(
        `INSERT INTO evento
        (nome, descricao, data_evento, horario, local, imagem, usuario_id)
        VALUES (?, ?, ?, ?, ?, ?, ?)`
      )
      .run(
        nome.trim(),
        descricao.trim(),
        data,
        horario,
        local.trim(),
        imagem || "",
        usuarioId
      );

    const linhaEvento = db
      .prepare("SELECT * FROM evento WHERE id_evento = ?")
      .get(info.lastInsertRowid);

    res.status(201).json(montarEvento(linhaEvento));
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: "Erro ao criar evento.",
    });
  }
}

export function atualizarEvento(req, res) {
  const { id } = req.params;
  const { nome, descricao, data, horario, local, imagem } = req.body;

  if (!nome || !descricao || !data || !horario || !local) {
    return res.status(400).json({
      erro: "Preencha todos os campos obrigatórios.",
    });
  }

  const eventoExistente = db
    .prepare("SELECT * FROM evento WHERE id_evento = ?")
    .get(id);

  if (!eventoExistente) {
    return res.status(404).json({
      erro: "Evento não encontrado.",
    });
  }

  try {
    db.prepare(
      `UPDATE evento
       SET nome = ?,
           descricao = ?,
           data_evento = ?,
           horario = ?,
           local = ?,
           imagem = ?
       WHERE id_evento = ?`
    ).run(
      nome.trim(),
      descricao.trim(),
      data,
      horario,
      local.trim(),
      imagem || eventoExistente.imagem || "",
      id
    );

    const linhaEvento = db
      .prepare("SELECT * FROM evento WHERE id_evento = ?")
      .get(id);

    res.json(montarEvento(linhaEvento));
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: "Erro ao atualizar evento.",
    });
  }
}

export function excluirEvento(req, res) {
  const { id } = req.params;

  const eventoExistente = db
    .prepare("SELECT * FROM evento WHERE id_evento = ?")
    .get(id);

  if (!eventoExistente) {
    return res.status(404).json({
      erro: "Evento não encontrado.",
    });
  }

  try {
    db.prepare(
      "DELETE FROM usuario_evento WHERE evento_id = ?"
    ).run(id);

    db.prepare(
      "DELETE FROM notas WHERE evento_id = ?"
    ).run(id);

    db.prepare(
      "UPDATE usuario SET evento_id = NULL WHERE evento_id = ?"
    ).run(id);

    db.prepare(
      "DELETE FROM evento WHERE id_evento = ?"
    ).run(id);

    res.json({
      mensagem: "Evento excluído com sucesso!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: "Erro ao excluir evento.",
    });
  }
}

export function listarParticipantes(req, res) {
  const { id } = req.params;

  const participantes = db
    .prepare(`
      SELECT
        u.id AS usuarioId,
        i.nome_poeta,
        i.turma,
        i.turno,
        i.curso
      FROM usuario_evento pe
      JOIN usuario u ON u.id = pe.usuario_id
      JOIN inscricoes i ON i.id_inscricoes = u.inscricao_id
      WHERE u.tipo_usuario = 'poeta'
        AND pe.evento_id = ?
      ORDER BY i.nome_poeta
    `)
    .all(id);

  res.json(participantes);
}

export function definirParticipantes(req, res) {
  const { id } = req.params;
  const { usuarioIds } = req.body;

  const eventoExistente = db
    .prepare("SELECT id_evento FROM evento WHERE id_evento = ?")
    .get(id);

  if (!eventoExistente) {
    return res.status(404).json({
      erro: "Evento não encontrado.",
    });
  }

  if (!Array.isArray(usuarioIds)) {
    return res.status(400).json({
      erro: "Envie a lista de participantes.",
    });
  }

  try {
    const poetasComNota = db
      .prepare(`
        SELECT DISTINCT usuario_id
        FROM notas
        WHERE evento_id = ?
      `)
      .all(id)
      .map((nota) => Number(nota.usuario_id));

    const participantesAtuais = db
      .prepare(`
        SELECT usuario_id
        FROM usuario_evento
        WHERE evento_id = ?
      `)
      .all(id)
      .map((participante) => Number(participante.usuario_id));

    const idsEnviados = [
      ...new Set(usuarioIds.map(Number)),
    ];

    const removidosComNota = participantesAtuais.filter(
      (usuarioId) =>
        poetasComNota.includes(usuarioId) &&
        !idsEnviados.includes(usuarioId)
    );

    if (removidosComNota.length > 0) {
      return res.status(400).json({
        erro: "Não é possível remover poetas que já possuem notas neste evento.",
      });
    }

    db.prepare(
      "DELETE FROM usuario_evento WHERE evento_id = ?"
    ).run(id);

    if (idsEnviados.length > 0) {
      const placeholders = idsEnviados.map(() => "?").join(", ");

      db.prepare(`
        INSERT OR IGNORE INTO usuario_evento
          (usuario_id, evento_id)
        SELECT id, ?
        FROM usuario
        WHERE id IN (${placeholders})
          AND tipo_usuario = 'poeta'
      `).run(id, ...idsEnviados);
    }

    res.json({
      mensagem: "Participantes atualizados com sucesso!",
    });
  } catch (err) {
    console.error(err);

    res.status(500).json({
      erro: "Erro ao definir participantes.",
    });
  }
}
