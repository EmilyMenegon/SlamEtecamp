import express from "express";
import cors from "cors";
import http from "http";
import { Server } from "socket.io";
import { verificarToken } from "./middlewares/auth.js";
import authRoutes from "./routes/authRoutes.js";
import tabelasRoutes from "./routes/tabelasRoutes.js";
import perfilRoutes from "./routes/perfilRoutes.js";
import inscricaoRoutes from "./routes/inscricaoRoutes.js";
import galeriaRoutes from "./routes/galeriaRoutes.js";
import muralRoutes from "./routes/muralRoutes.js";
import eventoRoutes from "./routes/eventoRoutes.js";
import notaRoutes from "./routes/notaRoutes.js";
import anotacaoRoutes from "./routes/anotacaoRoutes.js";
import regulamentoRoutes from "./routes/regulamentoRoutes.js";

const app = express();
const server = http.createServer(app);

/*
 * Quem pode falar com o back-end (CORS).
 *
 * Já funcionam, sem configurar nada:
 *  - localhost / 127.0.0.1 em qualquer porta;
 *  - endereços da rede local (192.168.x.x, 10.x.x.x, 172.16-31.x.x), para
 *    abrir o placar em outro computador na mesma rede.
 *
 * Se precisar liberar outro endereço, crie um arquivo .env no backend com:
 * FRONT_URL=https://meusite.com
 */
const ORIGENS_EXTRAS = (process.env.FRONT_URL || "")
  .split(",")
  .map((origem) => origem.trim())
  .filter(Boolean);

const ORIGEM_LOCAL =
  /^https?:\/\/(localhost|127\.0\.0\.1|192\.168\.\d{1,3}\.\d{1,3}|10\.\d{1,3}\.\d{1,3}\.\d{1,3}|172\.(1[6-9]|2\d|3[01])\.\d{1,3}\.\d{1,3})(:\d+)?$/;

function origemPermitida(origem) {
  if (!origem) return true; // chamadas sem Origin (ex.: mesma origem)
  return ORIGEM_LOCAL.test(origem) || ORIGENS_EXTRAS.includes(origem);
}

const opcoesCors = {
  origin: (origem, callback) => callback(null, origemPermitida(origem)),
};

const io = new Server(server, { cors: opcoesCors });

app.use(cors(opcoesCors));

/* ---------- Limite de tentativas ---------- */

/*
 * Limite de requisições por IP (feito aqui mesmo, sem instalar pacote).
 * Exemplo: criarLimite(15 * 60 * 1000, 100) = 100 requisições a cada 15 min.
 */
function criarLimite(janelaMs, maximo) {
  const acessos = new Map();

  // limpa os registros vencidos de tempos em tempos
  setInterval(() => {
    const agora = Date.now();

    for (const [ip, registro] of acessos) {
      if (registro.reinicia <= agora) acessos.delete(ip);
    }
  }, janelaMs).unref();

  return (req, res, next) => {
    const agora = Date.now();

    let registro = acessos.get(req.ip);

    if (!registro || registro.reinicia <= agora) {
      registro = { total: 0, reinicia: agora + janelaMs };
      acessos.set(req.ip, registro);
    }

    registro.total += 1;

    if (registro.total > maximo) {
      return res.status(429).json({
        erro: "Muitas tentativas. Aguarde alguns minutos e tente de novo.",
      });
    }

    next();
  };
}

// Login e cadastro (limite mais alto: vários alunos usam a mesma rede da escola)
const limiteLogin = criarLimite(15 * 60 * 1000, 100);

// Recuperação de senha
const limiteCodigo = criarLimite(15 * 60 * 1000, 20);

app.use(["/login", "/cadastro"], limiteLogin);
app.use(
  ["/solicitar-codigo", "/verificar-codigo", "/redefinir-senha"],
  limiteCodigo
);

/* ---------- Tamanho das requisições ---------- */

// Só estas rotas recebem imagens/vídeos em base64.
const jsonGrande = express.json({ limit: "50mb" });
app.use("/galeria", jsonGrande);
app.use("/eventos", jsonGrande);
app.use("/perfil", jsonGrande);
app.use("/regulamento", jsonGrande);

// Todas as outras: limite pequeno.
app.use(express.json({ limit: "100kb" }));

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.json({ message: "Backend funcionando!" });
});

/*
 * As páginas /tabelas mostram o banco inteiro. Elas só abrem na própria
 * máquina do servidor (veja tabelasRoutes.js).
 *
 * Para desligar de vez (ex.: ao publicar o site num servidor), crie um
 * arquivo .env no backend com:
 *
 * HABILITAR_TABELAS=false
 */
if (process.env.HABILITAR_TABELAS !== "false") {
  app.use(tabelasRoutes);
}

app.use(perfilRoutes);
app.use(inscricaoRoutes);
app.use(galeriaRoutes);
app.use(authRoutes);
app.use(muralRoutes);
app.use(eventoRoutes);
app.use(notaRoutes);
app.use(anotacaoRoutes);
app.use(regulamentoRoutes);

/* ---------- Erros ---------- */

app.use((err, req, res, next) => {
  if (err.type === "entity.too.large") {
    return res.status(413).json({ erro: "Arquivo ou texto grande demais." });
  }

  if (err.type === "entity.parse.failed") {
    return res.status(400).json({ erro: "JSON inválido." });
  }

  console.error(err);
  res.status(500).json({ erro: "Erro interno do servidor." });
});

/* ---------- Placar ao vivo (Socket.IO) ---------- */

let aoVivo = {
  poeta: "",
  notas: [null, null, null, null, null],
};

/*
 * Qualquer pessoa (ex.: a TV) pode se conectar e ASSISTIR.
 * Só o matemático logado consegue ALTERAR o placar.
 *
 * No front do matemático, a conexão envia o token:
 *   io(API_URL, { auth: { token } })
 */
io.use((socket, next) => {
  const token = socket.handshake.auth?.token;

  if (token) {
    try {
      socket.data.usuario = verificarToken(token);
    } catch {
      // token inválido: continua como espectador
    }
  }

  next();
});

function ehMatematico(socket) {
  return socket.data.usuario?.tipo === "matematico";
}

function notaValida(valor) {
  if (valor === null || valor === "") return true;

  const numero = Number(valor);

  return !Number.isNaN(numero) && numero >= 0 && numero <= 10;
}

// Aceita só os campos do placar, no formato esperado.
function limparDadosAoVivo(dados) {
  const limpo = {};

  if (typeof dados?.poeta === "string") {
    limpo.poeta = dados.poeta.slice(0, 100);
  }

  if (
    Array.isArray(dados?.notas) &&
    dados.notas.length === 5 &&
    dados.notas.every(notaValida)
  ) {
    limpo.notas = dados.notas;
  }

  // tempo do cronômetro, em segundos
  if (
    typeof dados?.tempo === "number" &&
    Number.isFinite(dados.tempo) &&
    dados.tempo >= 0 &&
    dados.tempo <= 3600
  ) {
    limpo.tempo = Math.floor(dados.tempo);
  }

  return limpo;
}

io.on("connection", (socket) => {
  // Quem conecta (ex: a TV) recebe o estado atual
  socket.emit("aoVivoAtual", aoVivo);

  // O matemático envia atualizações (poeta e/ou notas)
  socket.on("aoVivoAtualizar", (dados) => {
    if (!ehMatematico(socket)) return;

    aoVivo = { ...aoVivo, ...limparDadosAoVivo(dados) };
    io.emit("aoVivoAtual", aoVivo);
  });

  // Limpa o placar (ex: ao trocar de poeta)
  socket.on("aoVivoLimpar", () => {
    if (!ehMatematico(socket)) return;

    aoVivo = { poeta: "", notas: [null, null, null, null, null] };
    io.emit("aoVivoAtual", aoVivo);
  });
});

const PORT = 3001;
server.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});