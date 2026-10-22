import {
  useLayoutEffect,
  useRef,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";
import { gsap } from "gsap";
import { salvarUsuarioLogado } from "../../utils/auth";

import {
  FaHome,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import {
  Container,
  GlobalStyle,
  MusicVisualizer,
  MusicColumn,
  Pixel,
  Card,
  SidePanel,
  PanelContent,
  PanelLogo,
  PanelTitle,
  PanelText,
  PanelButton,
  FormSide,
  FormContent,
  FormTitle,
  Form,
  InputWrapper,
  InputLabel,
  Input,
  PasswordWrapper,
  EyeButton,
  Button,
  ForgotPassword,
  ErrorMessage,
  SuccessMessage,
  HomeButton,
} from "./style";

export default function Login() {
  const navigate = useNavigate();

  const pageRef = useRef(null);
  const animationRef = useRef(false);

  const [mode, setMode] = useState("cadastro");

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [codigo, setCodigo] = useState("");
  const [codigoEnviado, setCodigoEnviado] = useState(false);
  const [codigoVerificado, setCodigoVerificado] = useState(false);

  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarNovaSenha, setConfirmarNovaSenha] =
    useState("");

  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const [mostrarSenha, setMostrarSenha] =
    useState(false);

  const [
    mostrarConfirmarSenha,
    setMostrarConfirmarSenha,
  ] = useState(false);

  const [
    mostrarNovaSenha,
    setMostrarNovaSenha,
  ] = useState(false);

  const [
    mostrarConfirmarNovaSenha,
    setMostrarConfirmarNovaSenha,
  ] = useState(false);

  const [
    mostrarEsqueciSenha,
    setMostrarEsqueciSenha,
  ] = useState(false);

  const [senhaRedefinida, setSenhaRedefinida] =
    useState(false);

  const isLogin = mode === "login";
  const isRedefinir = mode === "redefinir";

  /*
  ============================================================
  BOTÃO LÍQUIDO
  ============================================================
  */

  function handleButtonMove(event) {
    const button = event.currentTarget;
    const rect = button.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    button.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    button.style.setProperty(
      "--mouse-y",
      `${y}px`
    );
  }

  /*
  ============================================================
  EQUALIZADOR
  ============================================================
  */

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const ctx = gsap.context(() => {
      const columns =
        page.querySelectorAll(".music-column");

      columns.forEach(
        (column, columnIndex) => {
          const pixels =
            column.querySelectorAll(
              ".music-pixel"
            );

          gsap.set(pixels, {
            opacity: 0,
          });

          const initialHeight = Math.floor(
            2 +
              Math.random() *
                Math.max(
                  1,
                  pixels.length - 2
                )
          );

          for (
            let i = 0;
            i < initialHeight;
            i++
          ) {
            gsap.to(pixels[i], {
              opacity:
                0.07 +
                Math.random() * 0.1,

              duration:
                0.4 +
                Math.random() * 0.3,

              delay:
                columnIndex * 0.015 +
                i * 0.025,

              ease: "power2.out",
            });
          }

          const animate = () => {
            const height = Math.floor(
              2 +
                Math.random() *
                  Math.max(
                    1,
                    pixels.length - 1
                  )
            );

            pixels.forEach(
              (pixel, index) => {
                gsap.to(pixel, {
                  opacity:
                    index < height
                      ? 0.07 +
                        Math.random() *
                          0.11
                      : 0,

                  duration:
                    0.3 +
                    Math.random() * 0.3,

                  ease: "sine.inOut",

                  overwrite: true,
                });
              }
            );

            gsap.delayedCall(
              0.5 +
                Math.random() * 0.4,
              animate
            );
          };

          gsap.delayedCall(
            0.7 +
              Math.random() * 0.4,
            animate
          );
        }
      );
    }, page);

    return () => ctx.revert();
  }, []);

  /*
  ============================================================
  ANIMAÇÃO INICIAL
  ============================================================
  */

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const ctx = gsap.context(() => {
      const card =
        page.querySelector(".login-card");

      const home =
        page.querySelector(".login-home");

      const panelContent =
        page.querySelector(
          ".panel-content"
        );

      const formElements =
        page.querySelectorAll(
          ".form-title, .form-input, .form-feedback, .login-button, .bottom-link"
        );

      gsap.fromTo(
        card,
        {
          opacity: 0,
          y: 40,
          scale: 0.97,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          ease: "power4.out",
        }
      );

      /*
        clearProps: "transform" -> depois da animação o GSAP
        não deixa mais um transform inline, que travaria o
        efeito de hover (subir 8px) dos botões.
      */

      gsap.fromTo(
        home,
        {
          opacity: 0,
          scale: 0.5,
          rotation: -25,
        },
        {
          opacity: 1,
          scale: 1,
          rotation: 0,
          duration: 0.6,
          delay: 0.2,
          ease: "back.out(1.8)",
          clearProps: "transform",
        }
      );

      gsap.fromTo(
        panelContent,
        {
          opacity: 0,
          y: 30,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          delay: 0.3,
          ease: "power3.out",
        }
      );

      gsap.fromTo(
        formElements,
        {
          opacity: 0,
          y: 40,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.55,
          stagger: 0.08,
          delay: 0.45,
          ease: "power3.out",
          clearProps: "transform",
        }
      );
    }, page);

    return () => ctx.revert();
  }, []);

  /*
  ============================================================
  CORREÇÃO DO POSICIONAMENTO DO PAINEL
  ============================================================
  */

  useLayoutEffect(() => {
    const page = pageRef.current;

    if (!page) return;

    const panel =
      page.querySelector(".panel-side");

    if (!panel) return;

    gsap.set(panel, {
      clearProps: "transform",
    });
  }, [mode]);

  /*
  ============================================================
  ELEMENTOS ANIMÁVEIS
  ============================================================
  */

  function getFormAnimatedElements(page) {
    if (!page) return [];

    return page.querySelectorAll(
      ".form-title, .form-input, .form-feedback, .login-button, .bottom-link"
    );
  }

  /*
  ============================================================
  LIMPAR RECUPERAÇÃO
  ============================================================
  */

  function limparRecuperacao() {
    setCodigo("");
    setCodigoEnviado(false);
    setCodigoVerificado(false);
    setNovaSenha("");
    setConfirmarNovaSenha("");
    setSenhaRedefinida(false);
  }

  /*
  ============================================================
  VOLTAR PARA LOGIN
  ============================================================
  */

  function voltarParaLogin() {
    setNome("");
    setConfirmarSenha("");

    setCodigo("");
    setCodigoEnviado(false);
    setCodigoVerificado(false);

    setNovaSenha("");
    setConfirmarNovaSenha("");

    setMostrarEsqueciSenha(false);

    setSenhaRedefinida(false);

    setErro("");
    setSucesso("");

    /*
      IMPORTANTE:
      NÃO limpamos email nem senha.
      Assim eles continuam preenchidos
      quando o usuário voltar para o login.
    */

    changeMode("login");
  }

  /*
  ============================================================
  TRANSIÇÃO ENTRE MODOS
  ============================================================
  */

  function changeMode(newMode) {
    if (
      newMode === mode ||
      animationRef.current
    ) {
      return;
    }

    const page = pageRef.current;

    if (!page) {
      setMode(newMode);
      return;
    }

    const card =
      page.querySelector(".login-card");

    const panel =
      page.querySelector(".panel-side");

    const panelContent =
      page.querySelector(
        ".panel-content"
      );

    if (
      !card ||
      !panel ||
      !panelContent
    ) {
      setMode(newMode);
      return;
    }

    setErro("");
    setSucesso("");
    setMostrarEsqueciSenha(false);

    if (newMode !== "redefinir") {
      setSenhaRedefinida(false);
    }

    animationRef.current = true;

    const goingToLogin =
      newMode === "login" ||
      newMode === "redefinir";

    const direction =
      goingToLogin ? 1 : -1;

    const cardRect =
      card.getBoundingClientRect();

    const panelRect =
      panel.getBoundingClientRect();

    const currentPanelLeft =
      panelRect.left -
      cardRect.left;

    const currentElements =
      getFormAnimatedElements(page);

    gsap.killTweensOf([
      card,
      panel,
      panelContent,
      currentElements,
    ]);

    const tl = gsap.timeline({
      defaults: {
        overwrite: "auto",
      },

      onComplete: () => {
        animationRef.current = false;
      },
    });

    tl.to(
      panelContent,
      {
        opacity: 0,
        y: -25,
        duration: 0.22,
        ease: "power2.in",
      }
    );

    tl.to(
      currentElements,
      {
        opacity: 0,
        y: 35,
        duration: 0.2,
        stagger: 0.02,
        ease: "power2.in",
      },
      "<"
    );

    const travel =
      direction === 1
        ? cardRect.width -
          panelRect.width -
          currentPanelLeft
        : -currentPanelLeft;

    tl.to(
      panel,
      {
        x: travel,
        duration: 0.72,
        ease: "power2.inOut",
      },
      "-=0.01"
    );

    tl.add(() => {
      setMode(newMode);
    });

    tl.call(() => {
      requestAnimationFrame(() => {
        const newElements =
          getFormAnimatedElements(page);

        gsap.set(newElements, {
          opacity: 0,
          y: 40,
        });

        gsap.to(newElements, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.075,
          ease: "power3.out",
          overwrite: true,
          clearProps: "transform",
        });
      });
    });

    tl.to(
      panelContent,
      {
        opacity: 1,
        y: 0,
        duration: 0.45,
        ease: "power3.out",
      }
    );
  }

  /*
  ============================================================
  SUBMIT
  ============================================================
  */

  async function handleSubmit(e) {
    e.preventDefault();

    setErro("");
    setSucesso("");

    /*
    ------------------------------------------------------------
    VOLTAR PARA LOGIN
    ------------------------------------------------------------
    */

    if (
      mode === "redefinir" &&
      senhaRedefinida
    ) {
      voltarParaLogin();
      return;
    }

    /*
    ------------------------------------------------------------
    CADASTRO
    ------------------------------------------------------------
    */

    if (mode === "cadastro") {
      if (senha !== confirmarSenha) {
        setErro(
          "As senhas não coincidem."
        );
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:3001/cadastro",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              nome,
              email,
              senha,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setErro(
            data.erro ||
              "Erro ao cadastrar."
          );
          return;
        }

        setNome("");
        setSenha("");
        setConfirmarSenha("");

        changeMode("login");
      } catch (err) {
        console.error(err);

        setErro(
          "Não foi possível conectar ao servidor."
        );
      }

      return;
    }

    /*
    ------------------------------------------------------------
    RECUPERAÇÃO / REDEFINIÇÃO
    ------------------------------------------------------------
    */

    if (mode === "redefinir") {
      /*
      ----------------------------------------------------------
      GERAR CÓDIGO
      ----------------------------------------------------------
      */

      if (!codigoEnviado) {
        if (!email) {
          setErro(
            "Informe seu email."
          );
          return;
        }

        try {
          const res = await fetch(
            "http://localhost:3001/solicitar-codigo",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
              }),
            }
          );

          const data =
            await res.json();

          if (!res.ok) {
            setErro(
              data.erro ||
                "Não foi possível gerar o código."
            );
            return;
          }

          setCodigoEnviado(true);

          setSucesso(
            "Código gerado! Verifique o terminal do servidor."
          );
        } catch (err) {
          console.error(err);

          setErro(
            "Não foi possível conectar ao servidor."
          );
        }

        return;
      }

      /*
      ----------------------------------------------------------
      VERIFICAR CÓDIGO
      ----------------------------------------------------------
      */

      if (!codigoVerificado) {
        if (!codigo) {
          setErro(
            "Informe o código de recuperação."
          );
          return;
        }

        try {
          const res = await fetch(
            "http://localhost:3001/verificar-codigo",
            {
              method: "POST",

              headers: {
                "Content-Type":
                  "application/json",
              },

              body: JSON.stringify({
                email,
                codigo,
              }),
            }
          );

          const data =
            await res.json();

          if (!res.ok) {
            setErro(
              data.erro ||
                "Código inválido."
            );
            return;
          }

          setCodigoVerificado(true);

          setSucesso(
            "Código confirmado! Agora crie sua nova senha."
          );
        } catch (err) {
          console.error(err);

          setErro(
            "Não foi possível conectar ao servidor."
          );
        }

        return;
      }

      /*
      ----------------------------------------------------------
      REDEFINIR SENHA
      ----------------------------------------------------------
      */

      if (
        novaSenha !==
        confirmarNovaSenha
      ) {
        setErro(
          "As senhas não coincidem."
        );
        return;
      }

      try {
        const res = await fetch(
          "http://localhost:3001/redefinir-senha",
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json",
            },

            body: JSON.stringify({
              email,
              codigo,
              novaSenha,
            }),
          }
        );

        const data = await res.json();

        if (!res.ok) {
          setErro(
            data.erro ||
              "Não foi possível redefinir a senha."
          );
          return;
        }

        /*
        --------------------------------------------------------
        GUARDA A NOVA SENHA PARA O LOGIN
        --------------------------------------------------------
        */

        setSenha(novaSenha);

        setNovaSenha("");
        setConfirmarNovaSenha("");

        setSenhaRedefinida(true);

        setSucesso(
          "Senha redefinida com sucesso! Agora você pode voltar para o login."
        );
      } catch (err) {
        console.error(err);

        setErro(
          "Não foi possível conectar ao servidor."
        );
      }

      return;
    }

    /*
    ------------------------------------------------------------
    LOGIN
    ------------------------------------------------------------
    */

    try {
      const res = await fetch(
        "http://localhost:3001/login",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            email,
            senha,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setErro(
          data.erro ||
            "Email ou senha inválidos."
        );
        return;
      }

      salvarUsuarioLogado({
        nome: data.nome,
        tipo: data.tipo,
        email,
        token: data.token,
      });

      localStorage.setItem(
        "token",
        data.token
      );

      if (
        data.tipo ===
        "matematico"
      ) {
        navigate("/mat", {
          state: {
            aba: "notas",
          },
        });
      } else if (
        data.tipo ===
        "organizador"
      ) {
        navigate(
          "/adm/inicioadm"
        );
      } else {
        navigate(
          "/usuario/home"
        );
      }
    } catch (err) {
      console.error(err);

      setErro(
        "Não foi possível conectar ao servidor."
      );
    }
  }

  /*
  ============================================================
  SENHA
  ============================================================
  */

  function togglePassword(setter) {
    setter(
      (value) => !value
    );
  }

  function renderPassword(
    label,
    value,
    setValue,
    visible,
    setVisible,
    extraProps = {}
  ) {
    return (
      <PasswordWrapper className="form-input">
        <InputLabel>
          {label}
        </InputLabel>

        <Input
          type={
            visible
              ? "text"
              : "password"
          }
          value={value}
          onChange={(e) =>
            setValue(
              e.target.value
            )
          }
          {...extraProps}
        />

        <EyeButton
          type="button"
          onClick={() =>
            togglePassword(
              setVisible
            )
          }
          aria-label={
            visible
              ? "Ocultar senha"
              : "Mostrar senha"
          }
        >
          {visible ? (
            <FaEyeSlash />
          ) : (
            <FaEye />
          )}
        </EyeButton>
      </PasswordWrapper>
    );
  }

  /*
  ============================================================
  RENDER
  ============================================================
  */

  return (
    <>
      <GlobalStyle />

      <Container ref={pageRef}>
        <MusicVisualizer>
          {Array.from({
            length: 48,
          }).map(
            (_, columnIndex) => (
              <MusicColumn
                key={columnIndex}
                className="music-column"
              >
                {Array.from({
                  length: 12,
                }).map(
                  (_, pixelIndex) => (
                    <Pixel
                      key={pixelIndex}
                      className="music-pixel"
                    />
                  )
                )}
              </MusicColumn>
            )
          )}
        </MusicVisualizer>

        <HomeButton
          className="login-home"
          onClick={() =>
            navigate("/")
          }
          onPointerMove={
            handleButtonMove
          }
          aria-label="Voltar para a página inicial"
        >
          <span className="button-content">
            <FaHome />
          </span>
        </HomeButton>

        <Card
          className={`login-card ${
            isLogin ||
            isRedefinir
              ? "is-login"
              : "is-cadastro"
          }`}
        >
          <SidePanel className="panel-side">
            <PanelContent className="panel-content">

              <PanelLogo>
                <img
                  src="/logo.png"
                  alt="Logo Slam Etecamp"
                />
              </PanelLogo>

              <PanelTitle>
                {isRedefinir
                  ? "Lembrou a senha?"
                  : isLogin
                  ? "Bem-vindo de volta!"
                  : "Olá, poeta!"}
              </PanelTitle>

              <PanelText>
                {isRedefinir
                  ? "Para continuar conectado conosco, faça login com suas informações pessoais"
                  : isLogin
                  ? "Para continuar conectado conosco, faça login com suas informações pessoais"
                  : "Insira seus dados pessoais e comece sua jornada conosco"}
              </PanelText>

              <PanelButton
                type="button"
                onClick={() =>
                  changeMode(
                    isRedefinir ||
                      isLogin
                      ? isRedefinir
                        ? "login"
                        : "cadastro"
                      : "login"
                  )
                }
                onPointerMove={
                  handleButtonMove
                }
              >
                <span className="button-content">
                  {isRedefinir
                    ? "Login"
                    : isLogin
                    ? "Cadastro"
                    : "Login"}
                </span>
              </PanelButton>

            </PanelContent>
          </SidePanel>

          <FormSide className="form-side">
            <FormContent className="form-content">

              <FormTitle className="form-title">
                {mode === "login"
                  ? "Login"
                  : mode === "cadastro"
                  ? "Cadastro"
                  : "Redefinir senha"}
              </FormTitle>

              <Form
                onSubmit={
                  handleSubmit
                }
              >

                {mode === "cadastro" && (
                  <InputWrapper className="form-input">
                    <InputLabel>
                      Nome completo
                    </InputLabel>

                    <Input
                      type="text"
                      value={nome}
                      onChange={(e) =>
                        setNome(
                          e.target.value
                        )
                      }
                    />
                  </InputWrapper>
                )}

                {/*
                ------------------------------------------------
                EMAIL
                ------------------------------------------------
                */}

                <InputWrapper className="form-input">
                  <InputLabel>
                    Email
                  </InputLabel>

                  <Input
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(
                        e.target.value
                      )
                    }
                  />
                </InputWrapper>

                {/*
                ------------------------------------------------
                SENHA LOGIN
                ------------------------------------------------
                */}

                {mode !==
                  "redefinir" &&
                  renderPassword(
                    "Senha",
                    senha,
                    setSenha,
                    mostrarSenha,
                    setMostrarSenha,
                    {
                      onFocus: () => {
                        if (
                          mode ===
                          "login"
                        ) {
                          setMostrarEsqueciSenha(
                            true
                          );
                        }
                      },

                      onBlur: () => {
                        setTimeout(
                          () =>
                            setMostrarEsqueciSenha(
                              false
                            ),
                          150
                        );
                      },
                    }
                  )}

                {/*
                ------------------------------------------------
                ESQUECI MINHA SENHA
                ------------------------------------------------
                */}

                {mode === "login" &&
                  mostrarEsqueciSenha && (
                    <ForgotPassword
                      className="form-feedback"
                      type="button"
                      onMouseDown={(e) =>
                        e.preventDefault()
                      }
                      onClick={() =>
                        changeMode(
                          "redefinir"
                        )
                      }
                    >
                      Esqueci minha senha
                    </ForgotPassword>
                  )}

                {/*
                ------------------------------------------------
                CONFIRMAR SENHA CADASTRO
                ------------------------------------------------
                */}

                {mode ===
                  "cadastro" &&
                  renderPassword(
                    "Confirmar senha",
                    confirmarSenha,
                    setConfirmarSenha,
                    mostrarConfirmarSenha,
                    setMostrarConfirmarSenha
                  )}

                {/*
                ------------------------------------------------
                RECUPERAÇÃO
                ------------------------------------------------
                */}

                {mode ===
                  "redefinir" &&
                  !senhaRedefinida && (
                    <>
                      {codigoEnviado && (
                        <InputWrapper className="form-input">
                          <InputLabel>
                            Código de recuperação
                          </InputLabel>

                          <Input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            value={codigo}
                            onChange={(e) =>
                              setCodigo(
                                e.target.value.replace(
                                  /\D/g,
                                  ""
                                )
                              )
                            }
                          />
                        </InputWrapper>
                      )}

                      {codigoVerificado && (
                        <>
                          {renderPassword(
                            "Nova senha",
                            novaSenha,
                            setNovaSenha,
                            mostrarNovaSenha,
                            setMostrarNovaSenha
                          )}

                          {renderPassword(
                            "Confirmar nova senha",
                            confirmarNovaSenha,
                            setConfirmarNovaSenha,
                            mostrarConfirmarNovaSenha,
                            setMostrarConfirmarNovaSenha
                          )}
                        </>
                      )}
                    </>
                  )}

                {/*
                ------------------------------------------------
                MENSAGENS
                ------------------------------------------------
                */}

                {erro && (
                  <ErrorMessage className="form-feedback">
                    {erro}
                  </ErrorMessage>
                )}

                {sucesso && (
                  <SuccessMessage className="form-feedback">
                    {sucesso}
                  </SuccessMessage>
                )}

                {/*
                ------------------------------------------------
                BOTÃO
                ------------------------------------------------
                */}

                <Button
                  type="submit"
                  className="login-button"
                  onPointerMove={
                    handleButtonMove
                  }
                >
                  <span className="button-content">

                    {mode === "login" &&
                      "Entrar"}

                    {mode === "cadastro" &&
                      "Cadastrar"}

                    {mode ===
                      "redefinir" &&
                      !senhaRedefinida &&
                      !codigoEnviado &&
                      "Gerar código"}

                    {mode ===
                      "redefinir" &&
                      !senhaRedefinida &&
                      codigoEnviado &&
                      !codigoVerificado &&
                      "Verificar código"}

                    {mode ===
                      "redefinir" &&
                      !senhaRedefinida &&
                      codigoVerificado &&
                      "Redefinir senha"}

                    {mode ===
                      "redefinir" &&
                      senhaRedefinida &&
                      "Voltar para login"}

                  </span>
                </Button>

              </Form>

            </FormContent>
          </FormSide>
        </Card>
      </Container>
    </>
  );
}
