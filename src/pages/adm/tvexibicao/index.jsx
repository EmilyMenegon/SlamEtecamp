import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { useNavigate } from "react-router-dom";

import {
  Tela,
  ControlesTela,
  BotaoControle,
  IconeCasa,
  Pixel01,
  Pixel02,
  Pixel03,
  Pixel01Extra,
  Pixel02Extra,
  Pixel03Extra,
  Conteudo,
  Cabecalho,
  Titulo,
  AreaPoeta,
  LabelPoeta,
  NomePoeta,
  PoetaAguardando,
  AreaNotas,
  CardJurado,
  NumeroJurado,
  Nota,
  NotaVazia,
} from "./style";

const API_URL = "http://localhost:3001";

// a TV mostra apenas o primeiro nome do poeta
function primeiroNome(nome) {
  return (nome || "").trim().split(/\s+/)[0] || "";
}

export default function TvExibicao() {
  const socketRef = useRef(null);
  const navigate = useNavigate();

  const [poeta, setPoeta] = useState("");
  const [notas, setNotas] = useState([
    null,
    null,
    null,
    null,
    null,
  ]);
  const [telaCheia, setTelaCheia] = useState(false);

  // ============================================================
  // SOCKET
  // ============================================================

  useEffect(() => {
    const socket = io(API_URL);

    socketRef.current = socket;

    socket.on("aoVivoAtual", (dados) => {
      setPoeta(primeiroNome(dados?.poeta));

      setNotas(
        Array.isArray(dados?.notas)
          ? dados.notas
          : [null, null, null, null, null]
      );
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  // ============================================================
  // DETECTA TELA CHEIA
  // ============================================================

  useEffect(() => {
    const atualizarTelaCheia = () => {
      setTelaCheia(!!document.fullscreenElement);
    };

    document.addEventListener(
      "fullscreenchange",
      atualizarTelaCheia
    );

    return () => {
      document.removeEventListener(
        "fullscreenchange",
        atualizarTelaCheia
      );
    };
  }, []);

  // ============================================================
  // VOLTAR PARA O INÍCIO
  // ============================================================

  const voltarParaHome = () => {
    navigate("/adm/inicioadm", {
      replace: true,
    });
  };

  // ============================================================
  // TELA CHEIA
  // ============================================================

  const alternarTelaCheia = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (erro) {
      console.error(
        "Não foi possível alternar a tela cheia:",
        erro
      );
    }
  };

  // ============================================================
  // RENDER
  // ============================================================

  return (
    <Tela>
      {!telaCheia && (
        <ControlesTela>
          {/* ================================================== */}
          {/* BOTÃO INÍCIO */}
          {/* ================================================== */}

          <BotaoControle
            onClick={voltarParaHome}
            title="Voltar"
            aria-label="Voltar"
            type="button"
          >
            <IconeCasa
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path d="M3 10.8 12 3l9 7.8v9.7a1.5 1.5 0 0 1-1.5 1.5h-5.2v-6.5H9.7V22H4.5A1.5 1.5 0 0 1 3 20.5v-9.7Z" />
            </IconeCasa>
          </BotaoControle>

          {/* ================================================== */}
          {/* BOTÃO TELA CHEIA */}
          {/* ================================================== */}

          <BotaoControle
            onClick={alternarTelaCheia}
            title="Expandir tela"
            aria-label="Expandir tela"
            type="button"
          >
            <span aria-hidden="true">
              ⛶
            </span>
          </BotaoControle>
        </ControlesTela>
      )}

      {/* ====================================================== */}
      {/* BICHINHOS */}
      {/* ====================================================== */}

      <Pixel01
        src="/pixel01.png"
        alt=""
      />

      <Pixel02
        src="/pixel02.png"
        alt=""
      />

      <Pixel03
        src="/pixel03.png"
        alt=""
      />

      <Pixel01Extra
        src="/pixel01.png"
        alt=""
      />

      <Pixel02Extra
        src="/pixel02.png"
        alt=""
      />

      <Pixel03Extra
        src="/pixel03.png"
        alt=""
      />

      {/* ====================================================== */}
      {/* CONTEÚDO */}
      {/* ====================================================== */}

      <Conteudo>
        <Cabecalho>
          <Titulo>
            SLAM <span>INTERESCOLAR</span>
          </Titulo>
        </Cabecalho>

        {/* ================================================== */}
        {/* POETA */}
        {/* ================================================== */}

        <AreaPoeta>
          <LabelPoeta>
            POETA
          </LabelPoeta>

          {poeta ? (
            <NomePoeta key={poeta}>
              {poeta}
            </NomePoeta>
          ) : (
            <PoetaAguardando>
              Aguardando poeta...
            </PoetaAguardando>
          )}
        </AreaPoeta>

        {/* ================================================== */}
        {/* NOTAS DOS 5 JURADOS */}
        {/* ================================================== */}

        <AreaNotas>
          {notas.map((nota, index) => (
            <CardJurado key={index}>
              <NumeroJurado>
                JURADO {index + 1}
              </NumeroJurado>

              {nota !== null &&
              nota !== "" &&
              nota !== undefined ? (
                <Nota>
                  {Number(nota).toFixed(1)}
                </Nota>
              ) : (
                <NotaVazia>
                  —
                </NotaVazia>
              )}
            </CardJurado>
          ))}
        </AreaNotas>
      </Conteudo>
    </Tela>
  );
}