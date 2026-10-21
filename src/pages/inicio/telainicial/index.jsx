import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";

import {
  FaArrowRight,
  FaFileAlt,
  FaCalendarAlt,
  FaTrophy,
  FaBookOpen,
  FaMicrophone,
  FaImages,
  FaTimes,
  FaChevronLeft,
  FaChevronRight,
} from "react-icons/fa";

import {
  GlobalStyle,
  Page,
  HeroWrapper,
  Hero,
  Header,
  Logo,
  HeaderBar,
  Container,
  LeftSide,
  BigText,
  SmallText,
  Buttons,
  PrimaryButton,
  ImageBox,
  Image,
  Circle,
  PixelImage,
  MarqueeSection,
  InkPaint,
  MarqueeReveal,
  MarqueeTrack,
  AnimatedImage,
  Phrase,
  AboutSection,
  AboutContainer,
  AboutTitle,
  AboutContent,
  AboutText,
  AboutFindBox,
  AboutWords,
  AboutWord,
  AboutGame,
  AboutBoard,
  AboutRow,
  AboutLetter,
  GameFeedback,
  FeaturesSection,
  SectionTitle,
  FeaturesGrid,
  FeatureCard,
  FeatureIcon,
  FeatureTitle,
  FeatureText,
  GalleryWrapper,
  GalleryViewport,
  GalleryTrack,
  GalleryCard,
  GalleryImage,
  GalleryState,
  LightboxOverlay,
  LightboxImage,
  LightboxClose,
  LightboxNav,
  LightboxCounter,
  CTASection,
  CTAContainer,
  CTAIcon,
  CTAText,
  CTATitle,
  CTASubtitle,
  CTALink,
} from "./style";

gsap.registerPlugin(ScrollTrigger);

const API_URL = "http://localhost:3001";

// quantidade mínima de cards em um "conjunto" do carrossel (garante o loop sem buracos)
const MIN_CARDS_LOOP = 10;
// velocidade do carrossel em pixels por segundo
const CAROUSEL_SPEED = 60;

function normalizarImagem(valor) {
  if (!valor) return null;

  // BLOB serializado pelo Express: { type: "Buffer", data: [...] }
  if (typeof valor === "object" && Array.isArray(valor.data)) {
    try {
      const texto = new TextDecoder().decode(
        new Uint8Array(valor.data)
      );
      return normalizarImagem(texto);
    } catch {
      return null;
    }
  }

  if (typeof valor !== "string") return null;

  const src = valor.trim();

  if (!src || src.startsWith("data:video")) return null;

  // já é data URL, URL completa ou caminho
  if (
    src.startsWith("data:") ||
    src.startsWith("http://") ||
    src.startsWith("https://") ||
    src.startsWith("blob:")
  ) {
    return src;
  }

  if (src.startsWith("/")) return `${API_URL}${src}`;

  // base64 puro, sem prefixo
  return `data:image/jpeg;base64,${src}`;
}

const words = [
  "SLAM",
  "POESIA",
  "SENTIMENTOS",
  "ARTE",
  "ESCRITA",
  "ORALIDADE",
  "RIMAS",
  "PERFORMANCES",
  "CONFIANÇA",
  "EXPRESSÃO",
];

const board = [
  ["P", "O", "R", "H", "C", "D", "W", "J", "M", "N", "S", "R"],
  ["C", "E", "Ã", "R", "M", "W", "E", "A", "J", "A", "S", "L"],
  ["O", "O", "R", "S", "Y", "J", "L", "T", "M", "T", "O", "O"],
  ["K", "C", "R", "F", "S", "S", "P", "I", "R", "B", "T", "N"],
  ["L", "O", "I", "A", "O", "E", "R", "U", "V", "A", "N", "M"],
  ["Q", "N", "A", "I", "L", "R", "R", "T", "O", "J", "E", "C"],
  ["W", "F", "T", "D", "P", "I", "M", "P", "P", "L", "M", "M"],
  ["S", "I", "I", "Y", "N", "O", "D", "A", "X", "L", "I", "R"],
  ["H", "A", "R", "B", "U", "Z", "E", "A", "N", "E", "T", "H"],
  ["G", "N", "C", "S", "V", "A", "R", "S", "D", "C", "N", "A"],
  ["P", "Ç", "S", "M", "M", "X", "W", "Z", "I", "E", "E", "A"],
  ["Y", "A", "E", "P", "Y", "J", "Z", "V", "Z", "A", "S", "S"],
];

export default function TelaInicial() {
  const pageRef = useRef(null);
  const marqueeRef = useRef(null);
  const gameRef = useRef(null);
  const feedbackRef = useRef(null);

  // scroll suave
  const lenisRef = useRef(null);

  // carrossel
  const trackRef = useRef(null);
  const tweenRef = useRef(null);
  const hoveringRef = useRef(false);
  const lightboxOpenRef = useRef(false);

  const [selected, setSelected] = useState([]);
  const [found, setFound] = useState([]);
  const [foundCells, setFoundCells] = useState([]);
  const [feedback, setFeedback] = useState("");

  const [fotos, setFotos] = useState([]);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [lightboxIndex, setLightboxIndex] = useState(null);

  // Conjunto base repetido até ter cards suficientes, e depois duplicado
  // para o loop infinito ficar perfeito (-50% do track = 1 conjunto).
  const loopFotos = useMemo(() => {
    if (!fotos.length) return [];

    const base = [];
    while (base.length < MIN_CARDS_LOOP) {
      base.push(...fotos);
    }

    return [...base, ...base];
  }, [fotos]);

  function handleButtonMove(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    button.style.setProperty(
      "--mouse-x",
      `${event.clientX - rect.left}px`
    );

    button.style.setProperty(
      "--mouse-y",
      `${event.clientY - rect.top}px`
    );
  }

  function showFeedback(message, success = false) {
    setFeedback(message);

    setTimeout(() => {
      if (!feedbackRef.current) return;

      gsap.killTweensOf(feedbackRef.current);

      gsap.fromTo(
        feedbackRef.current,
        {
          opacity: 0,
          scale: success ? 0.7 : 0.6,
          y: success ? 20 : 10,
        },
        {
          opacity: 1,
          scale: 1,
          y: 0,
          duration: success ? 0.7 : 0.2,
          ease: success ? "back.out(1.7)" : "back.out(2)",
          onComplete: () => {
            if (!success) {
              gsap.to(feedbackRef.current, {
                opacity: 0,
                scale: 0.8,
                y: -10,
                duration: 0.25,
                delay: 0.45,
                ease: "power2.in",
                onComplete: () => setFeedback(""),
              });
            }
          },
        }
      );
    }, 30);
  }

  function shakeGame() {
    if (!gameRef.current) return;

    gsap.killTweensOf(gameRef.current);

    gsap
      .timeline()
      .to(gameRef.current, { x: -10, duration: 0.07 })
      .to(gameRef.current, { x: 10, duration: 0.07 })
      .to(gameRef.current, { x: -8, duration: 0.06 })
      .to(gameRef.current, { x: 8, duration: 0.06 })
      .to(gameRef.current, { x: -5, duration: 0.05 })
      .to(gameRef.current, { x: 5, duration: 0.05 })
      .to(gameRef.current, { x: 0, duration: 0.08 });
  }

  function selectLetter(row, col) {
    const position = `${row}-${col}`;

    if (selected.length === 0) {
      setSelected([position]);
      return;
    }

    const [r1, c1] = selected[0].split("-").map(Number);

    let cells = [];

    if (r1 === row) {
      for (
        let c = Math.min(c1, col);
        c <= Math.max(c1, col);
        c++
      ) {
        cells.push(`${r1}-${c}`);
      }
    } else if (c1 === col) {
      for (
        let r = Math.min(r1, row);
        r <= Math.max(r1, row);
        r++
      ) {
        cells.push(`${r}-${c1}`);
      }
    } else if (Math.abs(r1 - row) === Math.abs(c1 - col)) {
      const rowStep = row > r1 ? 1 : -1;
      const colStep = col > c1 ? 1 : -1;

      let r = r1;
      let c = c1;

      while (true) {
        cells.push(`${r}-${c}`);

        if (r === row && c === col) break;

        r += rowStep;
        c += colStep;
      }
    }

    const letters = cells.map((item) => {
      const [r, c] = item.split("-").map(Number);
      return board[r][c];
    });

    const word = letters.join("");
    const reverse = word.split("").reverse().join("");

    const correctWord = words.find(
      (item) => item === word || item === reverse
    );

    if (correctWord && !found.includes(correctWord)) {
      const newFound = [...found, correctWord];

      setFound(newFound);

      setFoundCells((prev) => [
        ...new Set([...prev, ...cells]),
      ]);

      setSelected([]);

      if (newFound.length === words.length) {
        setTimeout(
          () =>
            showFeedback(
              "PARABÉNS! VOCÊ ENCONTROU TODAS AS PALAVRAS!",
              true
            ),
          250
        );
      }

      return;
    }

    if (correctWord && found.includes(correctWord)) {
      setSelected([]);
      return;
    }

    setSelected([]);
    shakeGame();
    showFeedback("Credo!");
  }

  /* ---------- LIGHTBOX ---------- */

  function openLightbox(index) {
    if (!fotos.length) return;
    setLightboxIndex(index % fotos.length);
  }

  function closeLightbox() {
    setLightboxIndex(null);
  }

  function nextPhoto(event) {
    event?.stopPropagation();
    setLightboxIndex((i) =>
      i === null ? i : (i + 1) % fotos.length
    );
  }

  function prevPhoto(event) {
    event?.stopPropagation();
    setLightboxIndex((i) =>
      i === null ? i : (i - 1 + fotos.length) % fotos.length
    );
  }

  /* ---------- SCROLL SUAVE (LENIS) ---------- */

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    lenisRef.current = lenis;

    // mantém o ScrollTrigger sincronizado com o scroll suave
    lenis.on("scroll", ScrollTrigger.update);

    const raf = (time) => lenis.raf(time * 1000);

    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(raf);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, []);

  /* ---------- CARREGAR GALERIA ---------- */

  useEffect(() => {
    let ativo = true;

    async function carregarGaleria() {
      try {
        setGalleryLoading(true);

        // rota pública: sem headers de autenticação
        const response = await fetch(`${API_URL}/galeria/fixadas`);

        if (!response.ok) {
          throw new Error(`Erro HTTP ${response.status}`);
        }

        const data = await response.json();

        if (!ativo) return;

        if (Array.isArray(data)) {
          const somenteImagens = data
            .map((foto) => ({
              id: foto.id,
              imagem: normalizarImagem(foto.imagem),
            }))
            .filter((foto) => foto.imagem);

          setFotos(somenteImagens.slice(0, 5));
        } else {
          setFotos([]);
        }
      } catch (erro) {
        console.error("Erro ao carregar a galeria:", erro);

        if (ativo) {
          setFotos([]);
        }
      } finally {
        if (ativo) {
          setGalleryLoading(false);
        }
      }
    }

    carregarGaleria();

    return () => {
      ativo = false;
    };
  }, []);

  /* ---------- CARROSSEL INFINITO ---------- */

  function applyCarouselSpeed(instant = false) {
    const tween = tweenRef.current;

    if (!tween) return;

    const target =
      hoveringRef.current || lightboxOpenRef.current ? 0 : 1;

    if (instant) {
      tween.timeScale(target);
      return;
    }

    gsap.to(tween, {
      timeScale: target,
      duration: 0.5,
      ease: "power2.out",
      overwrite: "auto",
    });
  }

  useLayoutEffect(() => {
    const track = trackRef.current;

    if (!track || !fotos.length) return;

    const build = () => {
      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }

      gsap.set(track, { x: 0 });

      // o track tem 2 conjuntos iguais: metade da largura = 1 conjunto
      const setWidth = track.scrollWidth / 2;

      if (!setWidth) return;

      tweenRef.current = gsap.to(track, {
        x: -setWidth,
        duration: setWidth / CAROUSEL_SPEED,
        ease: "none",
        repeat: -1,
      });

      applyCarouselSpeed(true);
    };

    build();

    let resizeTimer;

    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 200);
    };

    window.addEventListener("resize", onResize);

    // a galeria mudou a altura da página: recalcula os gatilhos de scroll
    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      clearTimeout(resizeTimer);

      if (tweenRef.current) {
        tweenRef.current.kill();
        tweenRef.current = null;
      }
    };
  }, [fotos]);

  // pausa o carrossel enquanto a imagem está ampliada
  useEffect(() => {
    lightboxOpenRef.current = lightboxIndex !== null;
    applyCarouselSpeed();
  }, [lightboxIndex]);

  // teclado + bloqueio do scroll com a imagem aberta
  useEffect(() => {
    if (lightboxIndex === null) return;

    const onKey = (event) => {
      if (event.key === "Escape") closeLightbox();
      if (event.key === "ArrowRight") nextPhoto();
      if (event.key === "ArrowLeft") prevPhoto();
    };

    const overflowAnterior = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    lenisRef.current?.stop();

    window.addEventListener("keydown", onKey);

    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflowAnterior;
      lenisRef.current?.start();
    };
  }, [lightboxIndex === null, fotos.length]);

  /* ---------- ANIMAÇÕES DA PÁGINA ---------- */

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const ctx = gsap.context(() => {
      gsap
        .timeline({
          defaults: {
            ease: "power4.out",
          },
        })
        .from(".hero-logo", {
          y: -30,
          opacity: 0,
          duration: 0.7,
        })
        .from(
          ".hero-title",
          {
            y: 60,
            opacity: 0,
            duration: 0.8,
          },
          "-=.25"
        )
        .from(
          ".hero-description",
          {
            y: 30,
            opacity: 0,
            duration: 0.6,
          },
          "-=.4"
        )
        .from(
          ".hero-buttons",
          {
            y: 25,
            opacity: 0,
            duration: 0.5,
          },
          "-=.3"
        )
        .from(
          ".hero-image",
          {
            y: 60,
            opacity: 0,
            scale: 0.94,
            duration: 0.8,
          },
          "-=.5"
        )
        .from(
          ".hero-circle",
          {
            scale: 0,
            opacity: 0,
            stagger: 0.06,
            duration: 0.4,
            ease: "back.out(1.8)",
          },
          "-=.5"
        )
        .from(
          ".hero-pixel",
          {
            scale: 0,
            opacity: 0,
            rotation: -25,
            stagger: 0.12,
            duration: 0.6,
            ease: "back.out(1.8)",
          },
          "-=.35"
        );

      gsap.utils
        .toArray(".hero-pixel")
        .forEach((pixel, index) => {
          gsap.to(pixel, {
            y: index === 0 ? -18 : index === 1 ? 20 : -15,
            x: index === 0 ? 12 : index === 1 ? -12 : 10,
            rotation: index === 0 ? 6 : index === 1 ? -7 : 5,
            duration: 2.8 + index * 0.45,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

      gsap.utils
        .toArray(".hero-circle")
        .forEach((circle, index) => {
          gsap.to(circle, {
            y: index % 2 === 0 ? -20 : 20,
            x: index % 3 === 0 ? 12 : -12,
            duration: 3 + index * 0.25,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });
        });

      if (marqueeRef.current) {
        gsap.set(marqueeRef.current, {
          x: 0,
          y: 0,
          opacity: 1,
          visibility: "visible",
        });
      }

      const marqueeTrack =
        page.querySelector(".marquee-track");

      if (marqueeTrack) {
        const getWidth = () => marqueeTrack.scrollWidth / 2;

        gsap.to(marqueeTrack, {
          x: () => -getWidth(),
          duration: 25,
          repeat: -1,
          ease: "none",
          modifiers: {
            x: gsap.utils.unitize((value) => {
              const width = getWidth();
              const number = parseFloat(value);

              return number <= -width ? 0 : number;
            }),
          },
        });
      }

      /* ===== REVEAL NO SCROLL (de baixo para cima) ===== */

      // elementos individuais
      gsap.utils.toArray(".reveal").forEach((el) => {
        gsap.fromTo(
          el,
          { y: 70, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.9,
            ease: "power3.out",
            // devolve o controle do transform/opacity ao CSS (hover dos cards etc.)
            clearProps: "transform,opacity",
            scrollTrigger: {
              trigger: el,
              start: "top 88%",
              once: true,
            },
          }
        );
      });

      // grupos (cards): aparecem em sequência
      gsap.set(".reveal-card", { y: 70, opacity: 0 });

      ScrollTrigger.batch(".reveal-card", {
        start: "top 90%",
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            y: 0,
            opacity: 1,
            duration: 0.8,
            ease: "power3.out",
            stagger: 0.12,
            overwrite: true,
            clearProps: "transform,opacity",
          }),
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    }, page);

    return () => ctx.revert();
  }, []);

  const fotoAberta =
    lightboxIndex !== null ? fotos[lightboxIndex] : null;

  return (
    <>
      <GlobalStyle />

      <Page ref={pageRef}>
        <HeroWrapper>
          <Hero>
            <Header>
              <Logo className="hero-logo">
                <img
                  src="/logo.png"
                  alt="Slam Interescolar"
                />
              </Logo>

              <HeaderBar />
            </Header>

            <Container>
              <LeftSide>
                <BigText className="hero-title">
                  DAS RUAS PARA AS{" "}
                  <span>ESCOLAS</span>
                  <br />
                  DAS ESCOLAS PARA AS{" "}
                  <span>RUAS</span>
                </BigText>

                <SmallText className="hero-description">
                  O Slam Etecamp celebra a expressão,
                  criatividade e o poder da palavra entre
                  jovens estudantes.
                </SmallText>

                <Buttons className="hero-buttons">
                  <RouterLink to="/login">
                    <PrimaryButton
                      onPointerMove={handleButtonMove}
                    >
                      <span className="button-content">
                        Participar do Slam Etecamp
                        <FaArrowRight />
                      </span>
                    </PrimaryButton>
                  </RouterLink>
                </Buttons>
              </LeftSide>

              <ImageBox className="hero-image">
                <PixelImage
                  className="hero-pixel hero-pixel-01"
                  src="/pixel01.png"
                  alt=""
                />

                <PixelImage
                  className="hero-pixel hero-pixel-02"
                  src="/pixel02.png"
                  alt=""
                />

                <PixelImage
                  className="hero-pixel hero-pixel-03"
                  src="/pixel03.png"
                  alt=""
                />

                <Circle
                  className="hero-circle"
                  $size="65px"
                  $top="0%"
                  $left="8%"
                />

                <Circle
                  className="hero-circle"
                  $size="45px"
                  $top="0%"
                  $left="28%"
                />

                <Circle
                  className="hero-circle"
                  $size="25px"
                  $top="18%"
                  $right="12%"
                />

                <Circle
                  className="hero-circle"
                  $size="35px"
                  $bottom="10%"
                  $left="2%"
                />

                <Circle
                  className="hero-circle"
                  $size="18px"
                  $bottom="25%"
                  $right="5%"
                />

                <Circle
                  className="hero-circle"
                  $size="70px"
                  $top="99%"
                  $right="20%"
                />

                <Image
                  src="/inicialimg.png"
                  alt="Ilustração do Slam Etecamp"
                />
              </ImageBox>
            </Container>
          </Hero>
        </HeroWrapper>

        <MarqueeSection>
          <MarqueeReveal ref={marqueeRef}>
            <MarqueeTrack className="marquee-track">
              <Phrase>LIBERDADE</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>RESPEITO</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>ESFORÇO</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>AUTENTICIDADE</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>EVOLUÇÃO</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>CORAGEM</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>UNIÃO</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>LIBERDADE</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>RESPEITO</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>ESFORÇO</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>AUTENTICIDADE</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>EVOLUÇÃO</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>CORAGEM</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>UNIÃO</Phrase>
              <AnimatedImage src="/icons.png" alt="Slam" />
              <Phrase>CULTURA</Phrase>
            </MarqueeTrack>
          </MarqueeReveal>

          <InkPaint />
        </MarqueeSection>

        <AboutSection>
          <AboutTitle className="reveal">
            SOBRE O <span>SLAM</span>
          </AboutTitle>

          <AboutContainer>
            <AboutContent>
              <AboutText className="reveal">
                O <b>Slam</b> Interescolar é uma competição
                de <b>poesia</b> falada que reúne estudantes
                de diferentes escolas para compartilharem
                suas ideias, <b>sentimentos</b> e vivências
                por meio da <b>arte</b> e da palavra.
                <br />
                <br />
                Além de incentivar a <b>escrita</b> e a{" "}
                <b>oralidade</b>, a iniciativa fortalece a
                autoestima, o pensamento crítico e o
                respeito. Entre <b>rimas</b>, emoções e{" "}
                <b>performances</b>, os jovens desenvolvem{" "}
                <b>confiança</b> e ampliam suas formas de{" "}
                <b>expressão</b>.
              </AboutText>

              <AboutFindBox className="reveal">
                <h3>Encontre:</h3>

                <AboutWords>
                  {words.map((word) => (
                    <AboutWord
                      key={word}
                      $found={found.includes(word)}
                    >
                      {word}
                    </AboutWord>
                  ))}
                </AboutWords>
              </AboutFindBox>
            </AboutContent>

            {/* a animação de scroll fica no wrapper; o shake usa o AboutBoard */}
            <AboutGame className="reveal">
              {feedback && (
                <GameFeedback
                  ref={feedbackRef}
                  $success={feedback.startsWith("PARABÉNS")}
                >
                  {feedback}
                </GameFeedback>
              )}

              <AboutBoard
                ref={gameRef}
                $completed={found.length === words.length}
              >
                {board.map((row, i) => (
                  <AboutRow key={i}>
                    {row.map((letter, j) => {
                      const position = `${i}-${j}`;

                      return (
                        <AboutLetter
                          type="button"
                          key={j}
                          $active={selected.includes(position)}
                          $found={foundCells.includes(
                            position
                          )}
                          onClick={() =>
                            selectLetter(i, j)
                          }
                        >
                          {letter}
                        </AboutLetter>
                      );
                    })}
                  </AboutRow>
                ))}
              </AboutBoard>
            </AboutGame>
          </AboutContainer>
        </AboutSection>

        <FeaturesSection>
          <SectionTitle className="reveal">
            O QUE VOCÊ ENCONTRA <span>AQUI</span>
          </SectionTitle>

          <FeaturesGrid>
            <FeatureCard className="reveal-card">
              <FeatureIcon>
                <FaFileAlt />
              </FeatureIcon>

              <FeatureTitle>INSCRIÇÕES</FeatureTitle>

              <FeatureText>
                Faça sua inscrição de forma simples e rápida.
              </FeatureText>
            </FeatureCard>

            <FeatureCard className="reveal-card">
              <FeatureIcon>
                <FaCalendarAlt />
              </FeatureIcon>

              <FeatureTitle>ETAPAS DO EVENTO</FeatureTitle>

              <FeatureText>
                Acompanhe todas as fases do Slam
                Interescolar e não perca nada!
              </FeatureText>
            </FeatureCard>

            <FeatureCard className="reveal-card">
              <FeatureIcon>
                <FaTrophy />
              </FeatureIcon>

              <FeatureTitle>PONTUAÇÕES</FeatureTitle>

              <FeatureText>
                Veja as notas, classificações e o ranking
                dos slammers.
              </FeatureText>
            </FeatureCard>

            <FeatureCard className="reveal-card">
              <FeatureIcon>
                <FaBookOpen />
              </FeatureIcon>

              <FeatureTitle>REGRAS E DICAS</FeatureTitle>

              <FeatureText>
                Fique por dentro das regras do Slam e
                prepare sua melhor poesia.
              </FeatureText>
            </FeatureCard>
          </FeaturesGrid>

          <GalleryWrapper className="reveal">
            <img
              className="gallery-background"
              src="/picha.png"
              alt=""
            />

            {galleryLoading ? (
              <GalleryState>Carregando fotos...</GalleryState>
            ) : fotos.length === 0 ? (
              <GalleryState>
                <FaImages style={{ marginRight: 8 }} />
                Nenhuma foto encontrada.
              </GalleryState>
            ) : (
              <GalleryViewport
                onMouseEnter={() => {
                  hoveringRef.current = true;
                  applyCarouselSpeed();
                }}
                onMouseLeave={() => {
                  hoveringRef.current = false;
                  applyCarouselSpeed();
                }}
              >
                <GalleryTrack ref={trackRef}>
                  {loopFotos.map((foto, index) => (
                    <GalleryCard
                      key={`${foto.id}-${index}`}
                      role="button"
                      aria-label="Ampliar foto do Slam Etecamp"
                      tabIndex={index < fotos.length ? 0 : -1}
                      onClick={() => openLightbox(index)}
                      onKeyDown={(event) => {
                        if (
                          event.key === "Enter" ||
                          event.key === " "
                        ) {
                          event.preventDefault();
                          openLightbox(index);
                        }
                      }}
                    >
                      <GalleryImage
                        src={foto.imagem}
                        alt="Foto do Slam Etecamp"
                        draggable={false}
                      />
                    </GalleryCard>
                  ))}
                </GalleryTrack>
              </GalleryViewport>
            )}
          </GalleryWrapper>
        </FeaturesSection>

        <CTASection>
          <CTAContainer>
            <CTAIcon className="reveal-card">
              <FaMicrophone />
            </CTAIcon>

            <CTAText className="reveal-card">
              <CTATitle>SUA VOZ TEM PODER.</CTATitle>

              <CTASubtitle>
                PARTICIPE, PERFORME E TRANSFORME!
              </CTASubtitle>
            </CTAText>

            <CTALink
              className="reveal-card"
              href="/login"
              onPointerMove={handleButtonMove}
            >
              <span className="button-content">
                QUERO PARTICIPAR
                <FaArrowRight />
              </span>
            </CTALink>
          </CTAContainer>
        </CTASection>
      </Page>

      {/* IMAGEM AMPLIADA */}
      {fotoAberta && (
        <LightboxOverlay
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Foto ampliada"
        >
          <LightboxClose
            type="button"
            aria-label="Fechar"
            onPointerMove={handleButtonMove}
            onClick={closeLightbox}
          >
            <FaTimes />
          </LightboxClose>

          {fotos.length > 1 && (
            <LightboxNav
              type="button"
              $side="left"
              aria-label="Foto anterior"
              onPointerMove={handleButtonMove}
              onClick={prevPhoto}
            >
              <FaChevronLeft />
            </LightboxNav>
          )}

          <LightboxImage
            key={fotoAberta.id}
            src={fotoAberta.imagem}
            alt="Foto do Slam Etecamp ampliada"
            draggable={false}
            onClick={(event) => event.stopPropagation()}
          />

          {fotos.length > 1 && (
            <LightboxNav
              type="button"
              $side="right"
              aria-label="Próxima foto"
              onPointerMove={handleButtonMove}
              onClick={nextPhoto}
            >
              <FaChevronRight />
            </LightboxNav>
          )}

          {fotos.length > 1 && (
            <LightboxCounter>
              {lightboxIndex + 1} / {fotos.length}
            </LightboxCounter>
          )}
        </LightboxOverlay>
      )}
    </>
  );
}
