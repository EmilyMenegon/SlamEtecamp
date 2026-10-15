import { DatabaseSync } from "node:sqlite";

const db = new DatabaseSync("dados.db");

db.exec(`
  CREATE TABLE IF NOT EXISTS usuario (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL,
    foto_perfil BLOB,
    tipo_usuario TEXT NOT NULL CHECK (tipo_usuario IN ('organizador', 'poeta', 'aluno')),
    inscricao_id INTEGER,
    resultado_id INTEGER
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS matematico (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT NOT NULL UNIQUE,
    senha TEXT NOT NULL
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS inscricoes (
    id_inscricoes INTEGER PRIMARY KEY AUTOINCREMENT,
    nome_poeta TEXT NOT NULL,
    turma TEXT NOT NULL,
    turno TEXT NOT NULL,
    curso TEXT NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS galeria (
    id_fotos INTEGER PRIMARY KEY AUTOINCREMENT,
    anexo TEXT NOT NULL,
    usuario_id INTEGER NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now'))
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS evento (
    id_evento INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    descricao TEXT NOT NULL,
    data_evento TEXT NOT NULL,
    horario TEXT NOT NULL,
    local TEXT NOT NULL,
    imagem TEXT,
    usuario_id INTEGER NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (usuario_id) REFERENCES usuario (id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS mural (
    id_mural INTEGER PRIMARY KEY AUTOINCREMENT,
    titulo TEXT NOT NULL,
    descricao TEXT NOT NULL,
    cor TEXT,
    usuario_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario (id)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS notas (
    id_notas INTEGER PRIMARY KEY AUTOINCREMENT,
    n1 FLOAT NOT NULL,
    n2 FLOAT NOT NULL,
    n3 FLOAT NOT NULL,
    n4 FLOAT NOT NULL,
    n5 FLOAT NOT NULL,
    media FLOAT NOT NULL,
    desconto FLOAT NOT NULL DEFAULT 0,
    tempo FLOAT,
    resultado FLOAT NOT NULL,
    usuario_id INTEGER NOT NULL,
    evento_id INTEGER,
    criado_em TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (usuario_id) REFERENCES usuario (id),
    FOREIGN KEY (evento_id) REFERENCES evento (id_evento)
  )
`);

db.exec(`
  CREATE TABLE IF NOT EXISTS anotacoes (
    id_anotacao INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    numero_pagina INTEGER NOT NULL,
    titulo TEXT NOT NULL DEFAULT '',
    conteudo TEXT NOT NULL DEFAULT '',
    atualizado_em TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (usuario_id) REFERENCES usuario (id),
    UNIQUE (usuario_id, numero_pagina)
  )
`);

const colunasAnotacoes = db.prepare("PRAGMA table_info(anotacoes)").all();

const temColunaTitulo = colunasAnotacoes.some(
  (coluna) => coluna.name === "titulo"
);

if (!temColunaTitulo) {
  db.exec(
    "ALTER TABLE anotacoes ADD COLUMN titulo TEXT NOT NULL DEFAULT ''"
  );
}

try {
  db.exec(`
    ALTER TABLE notas
    ADD COLUMN evento_id INTEGER
    REFERENCES evento (id_evento)
  `);
} catch (err) {
}

try {
  db.exec(`
    ALTER TABLE notas
    ADD COLUMN publicado INTEGER NOT NULL DEFAULT 0
  `);
} catch (err) {
}

try {
  db.exec(`
    ALTER TABLE usuario
    ADD COLUMN evento_id INTEGER
    REFERENCES evento (id_evento)
  `);
} catch (err) {
}

// O RENAME precisa vir antes do CREATE TABLE abaixo
const tabelaAntiga = db
  .prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'participantes_evento'"
  )
  .get();

const tabelaNova = db
  .prepare(
    "SELECT name FROM sqlite_master WHERE type = 'table' AND name = 'usuario_evento'"
  )
  .get();

if (tabelaAntiga && !tabelaNova) {
  db.exec("ALTER TABLE participantes_evento RENAME TO usuario_evento");
}

db.exec(`
  CREATE TABLE IF NOT EXISTS usuario_evento (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    evento_id INTEGER NOT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuario (id),
    FOREIGN KEY (evento_id) REFERENCES evento (id_evento),
    UNIQUE (usuario_id, evento_id)
  )
`);

// Migra os vínculos antigos de usuario.evento_id
try {
  db.exec(`
    INSERT OR IGNORE INTO usuario_evento (usuario_id, evento_id)
    SELECT id, evento_id
    FROM usuario
    WHERE evento_id IS NOT NULL
  `);
} catch (err) {
  console.error(
    "Erro ao migrar os participantes antigos:",
    err.message
  );
}

try {
  db.exec(`
    CREATE UNIQUE INDEX IF NOT EXISTS idx_notas_poeta_evento
    ON notas (usuario_id, evento_id)
  `);
} catch (err) {
  console.error(
    "Não foi possível criar a regra de resultado único por poeta/evento.",
    err.message
  );
}

db.exec(`
  CREATE TABLE IF NOT EXISTS recuperacao_senha (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    usuario_id INTEGER NOT NULL,
    codigo_hash TEXT NOT NULL,
    expiracao INTEGER NOT NULL,
    usado INTEGER NOT NULL DEFAULT 0,
    criado_em TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (usuario_id) REFERENCES usuario (id)
  )
`);

// Bancos antigos não têm "criado_em" nessas tabelas
function adicionarCriadoEm(tabela) {
  const colunas = db.prepare(`PRAGMA table_info(${tabela})`).all();

  if (colunas.some((coluna) => coluna.name === "criado_em")) return;

  db.exec(`ALTER TABLE ${tabela} ADD COLUMN criado_em TEXT`);
  db.exec(
    `UPDATE ${tabela} SET criado_em = datetime('now') WHERE criado_em IS NULL`
  );
}

adicionarCriadoEm("inscricoes");
adicionarCriadoEm("galeria");

db.exec(`
  CREATE TABLE IF NOT EXISTS regulamento (
    id_regulamento INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT NOT NULL,
    documento TEXT NOT NULL,
    usuario_id INTEGER NOT NULL,
    criado_em TEXT NOT NULL DEFAULT (datetime('now')),
    FOREIGN KEY (usuario_id) REFERENCES usuario (id)
  )
`);

export default db;