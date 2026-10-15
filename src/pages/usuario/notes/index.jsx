import React, { useCallback, useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useNavigate } from "react-router-dom";
import { FaLock } from "react-icons/fa";
import Layout from "../../../components/Layout";
import { getUsuarioLogado, getAuthHeaders } from "../../../utils/auth";
import {
  Page, Content, Header, Title, Subtitle, Notebook, NotebookSticker,
  NotebookHeader, NotebookHeaderTitle, NotebookHeaderInfo, Pages,
  PageCard, PageSide, PageHeader, PageNumber, PageTitle, TitleInput,
  WritingArea, PageFooter, PageNavigation, NavigationButton, PageCounter,
  DragHint, SaveStatus, LockedState, LockedIcon, LockedTitle, LockedText,
  LockedButton
} from "./style";

const API_URL = "http://localhost:3001";
const TOTAL_PAGES = 40;
const DEBOUNCE_MS = 1000;

const createPages = () =>
  Array.from({ length: TOTAL_PAGES }, (_, index) => ({
    number: index + 1,
    title: "",
    content: ""
  }));

function LeftStickers() {
  return (
    <>
      <NotebookSticker
        src="/pixel01.png"
        className="sticker-top-left"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <NotebookSticker
        src="/pixel03.png"
        className="sticker-bottom-right"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
    </>
  );
}

function RightStickers() {
  return (
    <>
      <NotebookSticker
        src="/pixel02.png"
        className="sticker-top-right"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
      <NotebookSticker
        src="/pixel01.png"
        className="sticker-bottom-left"
        alt=""
        aria-hidden="true"
        draggable={false}
      />
    </>
  );
}

export default function Notes() {
  const navigate = useNavigate();
  const [pages, setPages] = useState(createPages);
  const [currentSpread, setCurrentSpread] = useState(0);
  const [isTurning, setIsTurning] = useState(false);
  const [turningDirection, setTurningDirection] = useState(null);
  const [verificando, setVerificando] = useState(true);
  const [inscrito, setInscrito] = useState(false);
  const [saveState, setSaveState] = useState(null);

  const saveTimers = useRef({});
  const nextPageRef = useRef(null);
  const previousPageRef = useRef(null);
  const dragStartX = useRef(null);
  const isDragging = useRef(false);

  const leftPageIndex = currentSpread * 2;
  const rightPageIndex = leftPageIndex + 1;
  const leftPage = pages[leftPageIndex];
  const rightPage = pages[rightPageIndex];

  // Verifica a inscrição e carrega as anotações.
  useEffect(() => {
    const usuario = getUsuarioLogado();

    if (!usuario?.email) {
      setInscrito(false);
      setVerificando(false);
      return;
    }

    let cancelado = false;

    async function verificarECarregar() {
      try {
        const resInscricao = await fetch(
          `${API_URL}/inscricao/${usuario.email}`,
          { headers: getAuthHeaders() }
        );

        if (cancelado) return;

        if (!resInscricao.ok) {
          setInscrito(false);
          setVerificando(false);
          return;
        }

        setInscrito(true);

        const resAnotacoes = await fetch(`${API_URL}/anotacoes`, {
          headers: getAuthHeaders()
        });

        if (cancelado) return;

        if (resAnotacoes.ok) {
          const dados = await resAnotacoes.json();

          if (cancelado || !Array.isArray(dados)) return;

          setPages(paginasAtuais => {
            const novasPaginas = [...paginasAtuais];

            dados.forEach(anotacao => {
              const indice = anotacao.numero_pagina - 1;

              if (indice >= 0 && indice < novasPaginas.length) {
                novasPaginas[indice] = {
                  ...novasPaginas[indice],
                  title: anotacao.titulo || "",
                  content: anotacao.conteudo || ""
                };
              }
            });

            return novasPaginas;
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        if (!cancelado) setVerificando(false);
      }
    }

    verificarECarregar();

    return () => {
      cancelado = true;
    };
  }, []);

  // Limpa os timers ao sair da página.
  useEffect(() => {
    const timers = saveTimers.current;

    return () => {
      Object.values(timers).forEach(clearTimeout);
    };
  }, []);

  // Salva uma página no back-end.
  const salvarPagina = useCallback(async (numeroPagina, titulo, conteudo) => {
    setSaveState("salvando");

    try {
      const res = await fetch(`${API_URL}/anotacoes/${numeroPagina}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders()
        },
        body: JSON.stringify({ titulo, conteudo })
      });

      setSaveState(res.ok ? "salvo" : "erro");
    } catch (err) {
      console.error(err);
      setSaveState("erro");
    }
  }, []);

  // Atualiza o campo e agenda o salvamento automático.
  const updatePageField = (index, field, value) => {
    setPages(previousPages => {
      const novasPaginas = previousPages.map((page, pageIndex) =>
        pageIndex === index ? { ...page, [field]: value } : page
      );

      const numeroPagina = index + 1;
      const paginaAtualizada = novasPaginas[index];

      clearTimeout(saveTimers.current[numeroPagina]);

      saveTimers.current[numeroPagina] = setTimeout(() => {
        salvarPagina(
          numeroPagina,
          paginaAtualizada.title,
          paginaAtualizada.content
        );
      }, DEBOUNCE_MS);

      return novasPaginas;
    });
  };

  // Restaura a folha após a animação.
  const resetTurningPage = page => {
    if (!page) return;

    gsap.killTweensOf(page);
    gsap.set(page, {
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      x: 0,
      zIndex: 1,
      opacity: 1,
      clearProps: "transform,boxShadow,filter"
    });
  };

  // Anima a folha para frente ou para trás.
  const animatePage = (page, direction) => {
    if (!page || isTurning) return;

    setIsTurning(true);
    setTurningDirection(direction < 0 ? "next" : "previous");
    gsap.killTweensOf(page);

    gsap.set(page, {
      rotationY: 0,
      rotationZ: 0,
      scale: 1,
      x: 0,
      opacity: 1,
      zIndex: 100,
      transformPerspective: 2200,
      transformStyle: "preserve-3d",
      transformOrigin: direction < 0 ? "left center" : "right center",
      force3D: true
    });

    const timeline = gsap.timeline({
      defaults: { overwrite: "auto" },
      onComplete: () => {
        setCurrentSpread(previous => previous + (direction < 0 ? 1 : -1));
        resetTurningPage(page);
        setTurningDirection(null);
        setIsTurning(false);
      }
    });

    const steps = [
      {
        rotation: 12, tilt: 0.4, scale: 0.995, x: 2,
        shadowX: 5, shadowY: 7, blur: 18, alpha: 0.10,
        duration: 0.14, ease: "power1.out"
      },
      {
        rotation: 55, tilt: 1, scale: 0.97, x: 7,
        shadowX: 18, shadowY: 12, blur: 30, alpha: 0.17,
        duration: 0.22, ease: "power1.in"
      },
      {
        rotation: 90, tilt: 1.5, scale: 0.94, x: 13,
        shadowX: 26, shadowY: 14, blur: 38, alpha: 0.21,
        duration: 0.14, ease: "power1.inOut"
      },
      {
        rotation: 135, tilt: 1, scale: 0.97, x: 8,
        shadowX: 17, shadowY: 10, blur: 28, alpha: 0.15,
        duration: 0.18, ease: "power2.out"
      },
      {
        rotation: 180, tilt: 0, scale: 1, x: 0,
        shadowX: 0, shadowY: 8, blur: 20, alpha: 0.04,
        duration: 0.20, ease: "power2.out"
      }
    ];

    steps.forEach(step => {
      timeline.to(page, {
        rotationY: step.rotation * direction,
        rotationZ: step.tilt * direction,
        scale: step.scale,
        x: -step.x * direction,
        boxShadow: `${step.shadowX * direction}px ${step.shadowY}px ${step.blur}px rgba(0,0,0,${step.alpha})`,
        duration: step.duration,
        ease: step.ease
      });
    });
  };

  const animateNextPage = () => animatePage(nextPageRef.current, -1);
  const animatePreviousPage = () => animatePage(previousPageRef.current, 1);

  const nextSpread = () => {
    if (isTurning || currentSpread >= TOTAL_PAGES / 2 - 1) return;
    animateNextPage();
  };

  const previousSpread = () => {
    if (isTurning || currentSpread <= 0) return;
    animatePreviousPage();
  };

  // Arrastar para virar as páginas.
  const handlePointerDown = event => {
    if (isTurning) return;
    if (event.target.closest("textarea") || event.target.closest("input")) return;

    dragStartX.current = event.clientX;
    isDragging.current = true;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const handlePointerUp = event => {
    if (!isDragging.current) return;

    const distance = event.clientX - dragStartX.current;
    isDragging.current = false;
    dragStartX.current = null;

    if (Math.abs(distance) < 80) return;
    if (distance < 0) nextSpread();
    else previousSpread();
  };

  const handlePointerCancel = () => {
    isDragging.current = false;
    dragStartX.current = null;
  };

  const textoSalvamento =
    saveState === "salvando" ? "Salvando..." :
    saveState === "salvo" ? "Salvo" :
    saveState === "erro" ? "Erro ao salvar" : "";

  return (
    <Page>
      <Layout />

      <Content>
        <Header>
          <Title>Caderno</Title>
          <Subtitle>
            Rascunhe versos, guarde suas ideias e dê voz às suas palavras.
          </Subtitle>
        </Header>

        {verificando ? null : !inscrito ? (
          <LockedState>
            <LockedIcon><FaLock /></LockedIcon>
            <LockedTitle>Caderno bloqueado</LockedTitle>
            <LockedText>
              O caderno fica disponível para quem está inscrito no Slam.
              Faça sua inscrição para desbloquear e começar a escrever suas poesias.
            </LockedText>
            <LockedButton
              type="button"
              onClick={() => navigate("/usuario/inscricao")}
            >
              Fazer inscrição
            </LockedButton>
          </LockedState>
        ) : (
          <Notebook>
            <NotebookHeader>
              <NotebookHeaderTitle>
                ✦ Caderno de poesias
              </NotebookHeaderTitle>
              <NotebookHeaderInfo>
                {leftPage.number} — {rightPage.number} de {TOTAL_PAGES}
              </NotebookHeaderInfo>
              {textoSalvamento && <SaveStatus>{textoSalvamento}</SaveStatus>}
            </NotebookHeader>

            <Pages
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerCancel}
              aria-label="Caderno de poesias"
            >
              <PageCard>
                {/* Página esquerda */}
                <PageSide>
                  <PageHeader>
                    <PageTitle>Página {leftPage.number}</PageTitle>
                    <PageNumber>{String(leftPage.number).padStart(2, "0")}</PageNumber>
                  </PageHeader>

                  <TitleInput
                    type="text"
                    value={leftPage.title}
                    onChange={event => updatePageField(leftPageIndex, "title", event.target.value)}
                    placeholder="Título da poesia..."
                    maxLength={80}
                    autoComplete="off"
                  />

                  <WritingArea
                    value={leftPage.content}
                    onChange={event => updatePageField(leftPageIndex, "content", event.target.value)}
                    placeholder="Comece a escrever..."
                    spellCheck
                    autoComplete="off"
                    autoCorrect="on"
                    autoCapitalize="sentences"
                  />

                  <PageFooter>Página {leftPage.number}</PageFooter>
                  <LeftStickers />
                </PageSide>

                {/* Página direita */}
                <PageSide className="right-page">
                  <PageHeader>
                    <PageTitle>Página {rightPage.number}</PageTitle>
                    <PageNumber>{String(rightPage.number).padStart(2, "0")}</PageNumber>
                  </PageHeader>

                  <TitleInput
                    type="text"
                    value={rightPage.title}
                    onChange={event => updatePageField(rightPageIndex, "title", event.target.value)}
                    placeholder="Título da poesia..."
                    maxLength={80}
                    autoComplete="off"
                  />

                  <WritingArea
                    value={rightPage.content}
                    onChange={event => updatePageField(rightPageIndex, "content", event.target.value)}
                    placeholder="Continue escrevendo..."
                    spellCheck
                    autoComplete="off"
                    autoCorrect="on"
                    autoCapitalize="sentences"
                  />

                  <PageFooter>Página {rightPage.number}</PageFooter>
                  <RightStickers />
                </PageSide>

                {/* Folha que vira para a esquerda */}
                <PageSide
                  ref={nextPageRef}
                  className={`turning-page next-page ${turningDirection === "next" ? "active" : ""}`}
                >
                  <PageHeader>
                    <PageTitle>Página {rightPage.number}</PageTitle>
                    <PageNumber>{String(rightPage.number).padStart(2, "0")}</PageNumber>
                  </PageHeader>

                  <TitleInput type="text" value={rightPage.title} readOnly tabIndex={-1} />
                  <WritingArea value={rightPage.content} readOnly tabIndex={-1} />
                  <PageFooter>Página {rightPage.number}</PageFooter>
                  <RightStickers />
                </PageSide>

                {/* Folha que vira para a direita */}
                <PageSide
                  ref={previousPageRef}
                  className={`turning-page previous-page ${turningDirection === "previous" ? "active" : ""}`}
                >
                  <PageHeader>
                    <PageTitle>Página {leftPage.number}</PageTitle>
                    <PageNumber>{String(leftPage.number).padStart(2, "0")}</PageNumber>
                  </PageHeader>

                  <TitleInput type="text" value={leftPage.title} readOnly tabIndex={-1} />
                  <WritingArea value={leftPage.content} readOnly tabIndex={-1} />
                  <PageFooter>Página {leftPage.number}</PageFooter>
                  <LeftStickers />
                </PageSide>
              </PageCard>
            </Pages>

            <PageNavigation>
              <NavigationButton
                type="button"
                onClick={previousSpread}
                disabled={currentSpread === 0 || isTurning}
              >
                ← Anterior
              </NavigationButton>

              <PageCounter>
                <strong>{leftPage.number}</strong>
                <span>—</span>
                <strong>{rightPage.number}</strong>
                <small>de {TOTAL_PAGES}</small>
              </PageCounter>

              <NavigationButton
                type="button"
                onClick={nextSpread}
                disabled={currentSpread >= TOTAL_PAGES / 2 - 1 || isTurning}
              >
                Próxima →
              </NavigationButton>
            </PageNavigation>

            <DragHint><span>↔</span> Arraste para virar a página</DragHint>
          </Notebook>
        )}
      </Content>
    </Page>
  );
}