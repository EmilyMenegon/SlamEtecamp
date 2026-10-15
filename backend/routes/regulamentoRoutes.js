import { Router } from "express";
import db from "../database.js";
import { exigirLogin, exigirTipo } from "../middlewares/auth.js";

const router = Router();

const PREFIXO_PDF = "data:application/pdf;base64,";

// Nome do regulamento atual (público)
router.get("/regulamento/info", (req, res) => {
  const atual = db
    .prepare(
      "SELECT nome, criado_em FROM regulamento ORDER BY id_regulamento DESC LIMIT 1"
    )
    .get();

  res.json(atual || { nome: "Regulamento-Slam-Interescolar.pdf" });
});

// O PDF em si (público)
router.get("/regulamento/arquivo", (req, res) => {
  const atual = db
    .prepare(
      "SELECT nome, documento FROM regulamento ORDER BY id_regulamento DESC LIMIT 1"
    )
    .get();

  // Sem nada no banco: usa o PDF padrão da pasta public
  if (!atual) return res.redirect("/regulamento.pdf");

  const base64 = atual.documento.slice(atual.documento.indexOf(",") + 1);
  const buffer = Buffer.from(base64, "base64");

  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Length", buffer.length);
  res.setHeader(
    "Content-Disposition",
    `inline; filename="${encodeURIComponent(atual.nome)}"`
  );
  res.send(buffer);
});

// Troca o regulamento (só organizador)
router.put(
  "/regulamento",
  exigirLogin,
  exigirTipo(["organizador"]),
  (req, res) => {
    const { nome, documento } = req.body || {};

    if (
      typeof nome !== "string" ||
      !nome.trim() ||
      typeof documento !== "string" ||
      !documento.startsWith(PREFIXO_PDF)
    ) {
      return res.status(400).json({ erro: "Envie um PDF válido." });
    }

    // O token tem só { email, tipo }: o id vem do banco
    const organizador = db
      .prepare("SELECT id FROM usuario WHERE email = ? AND tipo_usuario = ?")
      .get(req.usuario.email, "organizador");

    if (!organizador) {
      return res.status(403).json({ erro: "Organizador não encontrado." });
    }

    try {
      db.exec("BEGIN");

      db.prepare("DELETE FROM regulamento").run();
      db.prepare(
        "INSERT INTO regulamento (nome, documento, usuario_id) VALUES (?, ?, ?)"
      ).run(nome.trim().slice(0, 200), documento, organizador.id);

      db.exec("COMMIT");

      res.json({ mensagem: "Regulamento atualizado.", nome: nome.trim() });
    } catch (err) {
      try {
        db.exec("ROLLBACK");
      } catch {}

      console.error("Erro ao salvar regulamento:", err);
      res.status(500).json({ erro: "Não foi possível salvar o regulamento." });
    }
  }
);

export default router;