import styled, { createGlobalStyle } from "styled-components";

/* ============================================================
   PALETA
============================================================ */

const colors = {
  yellow: "#FFDB53",
  yellowStrong: "#F9BE06",
  cream: "#FFF7D0",
  input: "#FFFDF0",
  red: "#831614",
  wine: "#571111",
  black: "#010000",
  white: "#fff",
};


/* ============================================================
   GLOBAL
============================================================ */

export const GlobalStyle = createGlobalStyle`
@font-face {
  font-family: "Lost in South";
  src: url("/fonts/Lost in South.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}

  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    width: 100%;
    min-height: 100%;
  }

  html {
    min-height: 100%;
    background: ${colors.white};
  }

  body {
    min-height: 100vh;
    overflow-x: hidden;
    background: ${colors.white};
    font-family: "Poppins", sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  button,
  input {
    font-family: inherit;
  }

  button {
    -webkit-tap-highlight-color: transparent;
    touch-action: manipulation;
  }

  input {
    -webkit-appearance: none;
    appearance: none;
  }
`;

/* ============================================================
   CONTAINER
============================================================ */

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;

  display: flex;
  align-items: center;
  justify-content: center;

  overflow: hidden;
  padding: 30px 20px;

  background: ${colors.white};

  @media (max-width: 768px) {
    min-height: 100dvh;
    padding: 70px 14px 18px;
  }

  @media (max-width: 500px) {
    padding: 64px 10px 10px;
  }

  @media (max-height: 700px) and (max-width: 768px) {
    align-items: flex-start;
    padding-top: 62px;
  }
`;

/* ============================================================
   EQUALIZADOR
============================================================ */

export const MusicVisualizer = styled.div`
  position: fixed;
  left: 0;
  bottom: 0;

  width: 100vw;
  height: 50vh;

  display: flex;
  align-items: flex-end;

  overflow: hidden;
  pointer-events: none;

  z-index: 1;
  opacity: 1;

  @media (max-width: 768px) {
    height: 30vh;
  }

  @media (max-width: 500px) {
    height: 25vh;
  }
`;

export const MusicColumn = styled.div`
  flex: 1;
  height: 100%;

  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  gap: 0.6%;
`;

export const Pixel = styled.div`
  width: 100%;
  aspect-ratio: 1;
  flex-shrink: 0;

  background: ${colors.yellow};
  opacity: 0;

  box-shadow: 0 0.5vw rgba(249, 190, 6, 0.04);

  @media (max-width: 768px) {
    box-shadow: 0 1px rgba(249, 190, 6, 0.04);
  }
`;

/* ============================================================
   HOME
   Mesma animação e borda dos botões de "anos" (Inscrições):
   - borda 2px
   - botão sobe 8px com sombra
   - bolinha amarela cresce a partir do mouse
============================================================ */

export const HomeButton = styled.button`
  position: fixed;

  top: 2%;
  left: 2%;

  width: 58px;
  height: 58px;

  padding: 0;

  border: 2px solid ${colors.red};
  border-radius: 50%;

  background: ${colors.red};
  color: ${colors.white};

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  overflow: hidden;
  isolation: isolate;

  transform: translateZ(0);

  z-index: 999;

  box-shadow:
    0 10px 30px rgba(0, 0, 0, 0.2);

  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.3s ease,
    color 0.25s ease;

  &::before {
    content: "";

    position: absolute;

    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);

    width: 20px;
    height: 20px;

    border-radius: 50%;

    background: ${colors.yellow};

    transform:
      translate(-50%, -50%)
      scale(0);

    pointer-events: none;

    z-index: -1;

    transition:
      transform
      0.65s
      cubic-bezier(0.16, 1, 0.3, 1);
  }

  .button-content {
    position: relative;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;

    color: inherit;
  }

  &:hover {
    color: #111;

    border-color: ${colors.red};

    transform: translateY(-8px);

    box-shadow:
      0 18px 35px rgba(131, 22, 20, 0.16);
  }

  &:hover::before {
    transform:
      translate(-50%, -50%)
      scale(8);
  }

  &:active {
    transform:
      translateY(-3px)
      scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid ${colors.yellow};
    outline-offset: 4px;
  }

  svg {
    font-size: 24px;
  }

  @media (max-width: 768px) {
    top: 14px;
    left: 14px;

    width: 48px;
    height: 48px;

    svg {
      font-size: 20px;
    }

    &:hover {
      transform: translateY(-4px);
    }
  }

  @media (max-width: 500px) {
    top: 10px;
    left: 10px;

    width: 44px;
    height: 44px;

    svg {
      font-size: 18px;
    }
  }
`;

/* ============================================================
   CARD
============================================================ */

export const Card = styled.div`
  position: relative;

  z-index: 5;

  width: min(92%, 1500px);
  height: min(84vh, 850px);

  display: flex;

  border-radius: 32px;

  background: ${colors.white};

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.18),
    0 10px 35px rgba(0, 0, 0, 0.1);

  overflow: hidden;

  transform: translateZ(0);

  backface-visibility: hidden;

  isolation: isolate;

  will-change: transform;

  &.is-login {
    .panel-side {
      order: 2;
    }

    .form-side {
      order: 1;
    }
  }

  &.is-cadastro {
    .panel-side {
      order: 1;
    }

    .form-side {
      order: 2;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 560px;

    height: auto;
    min-height: 0;

    flex-direction: column;

    border-radius: 26px;

    &.is-login,
    &.is-cadastro {
      .panel-side {
        order: 1;
      }

      .form-side {
        order: 2;
      }
    }
  }

  @media (max-width: 500px) {
    border-radius: 22px;
  }

  @media (max-width: 768px) and (max-height: 700px) {
    max-width: 520px;
  }
`;

/* ============================================================
   PAINEL LATERAL
============================================================ */

export const SidePanel = styled.div`
  position: relative;

  width: 46%;
  flex: 0 0 46%;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 7%;

  background: ${colors.wine};
  color: ${colors.white};

  text-align: center;

  overflow: hidden;
  isolation: isolate;

  will-change: transform;

  /* Formas orgânicas */

  &::before {
    content: "";

    position: absolute;

    width: 280px;
    height: 90px;

    right: -105px;
    top: 65px;

    background: ${colors.red};

    opacity: 0.65;

    transform: rotate(-25deg);

    border-radius: 50%;

    z-index: -2;
  }

  &::after {
    content: "";

    position: absolute;

    width: 130px;
    height: 7px;

    left: -25px;
    bottom: 55px;

    background: ${colors.yellow};

    opacity: 0.35;

    transform: rotate(-25deg);

    border-radius: 10px;

    z-index: -2;
  }

  /* Estrelas decorativas */

  .stars {
    position: absolute;

    inset: 0;

    pointer-events: none;

    z-index: -1;

    overflow: hidden;
  }

  .star {
    position: absolute;

    color: ${colors.red};

    line-height: 1;

    font-family: Arial, sans-serif;

    opacity: 0.55;

    user-select: none;

    text-shadow:
      0 0 8px rgba(131, 22, 20, 0.15);
  }

  .star:nth-child(1) {
    top: 10%;
    left: 12%;

    font-size: 17px;

    transform: rotate(12deg);

    opacity: 0.42;
  }

  .star:nth-child(2) {
    top: 21%;
    right: 15%;

    font-size: 25px;

    transform: rotate(-15deg);

    opacity: 0.5;
  }

  .star:nth-child(3) {
    top: 42%;
    left: 7%;

    font-size: 12px;

    transform: rotate(20deg);

    opacity: 0.38;
  }

  .star:nth-child(4) {
    top: 57%;
    right: 9%;

    font-size: 18px;

    transform: rotate(-10deg);

    opacity: 0.45;
  }

  .star:nth-child(5) {
    bottom: 12%;
    left: 18%;

    font-size: 24px;

    transform: rotate(8deg);

    opacity: 0.5;
  }

  .star:nth-child(6) {
    bottom: 24%;
    right: 22%;

    font-size: 11px;

    transform: rotate(-20deg);

    opacity: 0.36;
  }

  .star:nth-child(7) {
    top: 74%;
    left: 43%;

    font-size: 14px;

    transform: rotate(15deg);

    opacity: 0.4;
  }

  .star:nth-child(8) {
    top: 8%;
    right: 39%;

    font-size: 10px;

    transform: rotate(-12deg);

    opacity: 0.34;
  }

  @media (max-width: 1100px) {
    padding: 6% 5%;
  }

  @media (max-width: 768px) {
    width: 100%;
    height: auto;
    min-height: 250px;

    flex: 0 0 auto;

    padding: 28px 30px;
  }

  @media (max-width: 500px) {
    min-height: 220px;
    padding: 24px 20px;
  }

  @media (max-width: 768px) and (max-height: 700px) {
    min-height: 190px;
    padding: 18px 20px;
  }
`;

/* ============================================================
   PANEL CONTENT
============================================================ */

export const PanelContent = styled.div`
  width: 100%;
  max-width: 560px;

  display: flex;
  flex-direction: column;
  align-items: center;

  will-change: transform, opacity;
`;

/* ============================================================
   PANEL LOGO
============================================================ */

export const PanelLogo = styled.div`
  width: 48%;
  max-width: 240px;
  min-width: 130px;

  margin-bottom: 5%;

  img {
    display: block;

    width: 100%;
    height: auto;

    filter:
      drop-shadow(2px 0 0 #fff)
      drop-shadow(-2px 0 0 #fff)
      drop-shadow(0 2px 0 #fff)
      drop-shadow(0 -2px 0 #fff);
  }

  @media (max-width: 1100px) {
    min-width: 105px;
    max-width: 190px;
  }

  @media (max-width: 768px) {
    width: 25%;
    min-width: 75px;
    max-width: 115px;

    margin-bottom: 12px;
  }

  @media (max-width: 500px) {
    width: 23%;
    min-width: 68px;
    max-width: 100px;

    margin-bottom: 8px;
  }

  @media (max-width: 768px) and (max-height: 700px) {
    min-width: 58px;
    max-width: 85px;

    margin-bottom: 5px;
  }
`;

/* ============================================================
   PANEL TITLE
============================================================ */

export const PanelTitle = styled.h1`
  width: 100%;

  margin-bottom: 4%;

  color: ${colors.yellow};

  font-size: clamp(1.8rem, 3vw, 3rem);

  line-height: 1.15;

  @media (max-width: 1100px) {
    font-size:
      clamp(1.6rem, 3vw, 2.4rem);
  }

  @media (max-width: 768px) {
    margin-bottom: 8px;

    font-size:
      clamp(1.4rem, 5vw, 2rem);
  }

  @media (max-width: 500px) {
    font-size:
      clamp(1.25rem, 5.5vw, 1.65rem);
  }
`;

/* ============================================================
   PANEL TEXT
============================================================ */

export const PanelText = styled.p`
  width: 100%;
  max-width: 480px;

  color: ${colors.cream};

  margin-bottom: 7%;

 font-size:
    clamp(
      1rem,
      5.25vw,
      1.50rem
    );

  line-height: 1.6;

  @media (max-width: 768px) {
    max-width: 520px;

    margin-bottom: 5%;

    font-size: 0.85rem;

    line-height: 1.45;
  }

  @media (max-width: 500px) {
    max-width: 340px;

    margin-bottom: 4%;

    font-size: 0.75rem;

    line-height: 1.4;
  }
`;

/* ============================================================
   PANEL BUTTON
============================================================ */

export const PanelButton = styled.button`
  position: relative;

  width: 48%;
  min-width: 160px;

  height: 56px;

  padding: 0 24px;

  border: 2px solid ${colors.yellow};

  border-radius: 15px;

  background: transparent;

  color: ${colors.yellow};

  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;

  overflow: hidden;

  isolation: isolate;

  transform: translateZ(0);

  transition:
    color 0.3s ease,
    transform 0.25s ease;

  &::before {
    content: "";

    position: absolute;

    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);

    width: 40px;
    height: 40px;

    border-radius: 50%;

    background: ${colors.yellow};

    transform:
      translate(-50%, -50%)
      scale(0);

    pointer-events: none;

    z-index: 0;

    transition:
      transform
      0.65s
      cubic-bezier(0.16, 1, 0.3, 1);
  }

  .button-content {
    position: relative;

    z-index: 2;

    display: flex;

    align-items: center;
    justify-content: center;

    color: inherit;
  }

  &:hover {
    color: ${colors.wine};

    transform: translateY(-3px);
  }

  &:hover::before {
    transform:
      translate(-50%, -50%)
      scale(12);
  }

  &:active {
    transform:
      translateY(0)
      scale(0.97);
  }

  @media (max-width: 1100px) {
    min-width: 140px;
    width: 55%;
  }

  @media (max-width: 768px) {
    width: 48%;
    min-width: 140px;

    height: 46px;

    border-radius: 12px;

    font-size: 0.88rem;
  }

  @media (max-width: 500px) {
    width: 52%;
    min-width: 125px;

    height: 43px;

    font-size: 0.82rem;
  }

  @media (max-width: 768px) and (max-height: 700px) {
    height: 40px;
  }
`;

/* ============================================================
   FORM SIDE
============================================================ */

export const FormSide = styled.div`
  width: 54%;
  flex: 0 0 54%;

  display: flex;

  align-items: center;
  justify-content: center;

  padding: 5% 4%;

  background: ${colors.white};

  min-width: 0;

  @media (max-width: 1100px) {
    padding: 4% 5%;
  }

  @media (max-width: 768px) {
    width: 100%;
    flex: 0 0 auto;

    padding: 28px 30px;
  }

  @media (max-width: 500px) {
    padding: 24px 18px;
  }
`;

/* ============================================================
   FORM CONTENT
============================================================ */

export const FormContent = styled.div`
  width: 100%;
  max-width: 650px;

  margin: 0 auto;

  will-change: transform, opacity;

  @media (max-width: 768px) {
    max-width: 480px;
  }
`;

/* ============================================================
   FORM TITLE
============================================================ */

export const FormTitle = styled.h2`
  width: 100%;

  margin-bottom: 6%;

  color: ${colors.red};

  text-align: center;

  font-size:
    clamp(1.7rem, 2.5vw, 2.5rem);

  line-height: 1.15;

  will-change: transform, opacity;

  @media (max-width: 768px) {
    margin-bottom: 24px;

    font-size:
      clamp(1.45rem, 6vw, 2rem);
  }

  @media (max-width: 500px) {
    margin-bottom: 18px;

    font-size:
      clamp(1.35rem, 6vw, 1.7rem);
  }
`;

/* ============================================================
   FORM
============================================================ */

export const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: stretch;

  gap: 22px;

  .bottom-link {
    margin-top: 4%;

    text-align: center;

    cursor: pointer;

    color: ${colors.red};

    font-size: 0.9rem;

    line-height: 1.4;

    will-change: transform, opacity;

    span {
      font-weight: 600;
      cursor: pointer;
    }

    &:hover {
      text-decoration: underline;
    }

    @media (max-width: 500px) {
      font-size: 0.78rem;
    }
  }

  @media (max-width: 768px) {
    gap: 18px;
  }

  @media (max-width: 500px) {
    gap: 16px;
  }
`;

/* ============================================================
   INPUT WRAPPER
============================================================ */

export const InputWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 68px;

  flex-shrink: 0;

  will-change: transform, opacity;

  @media (max-width: 768px) {
    height: 60px;
  }

  @media (max-width: 500px) {
    height: 57px;
  }
`;

/* ============================================================
   LABEL
============================================================ */

export const InputLabel = styled.label`
  position: absolute;

  top: 10px;
  left: 24px;

  z-index: 2;

  color: #7c7040;

  font-size: 0.72rem;

  pointer-events: none;

  @media (max-width: 768px) {
    top: 8px;
    left: 19px;

    font-size: 0.65rem;
  }

  @media (max-width: 500px) {
    top: 7px;
    left: 17px;

    font-size: 0.62rem;
  }
`;

/* ============================================================
   INPUT
============================================================ */

export const Input = styled.input`
  display: block;

  width: 100%;
  height: 68px;

  padding: 27px 62px 8px 24px;

  border: 2px solid ${colors.yellow};

  border-radius: 16px;

  outline: none;

  background: ${colors.input};

  color: #111;

  font-size: 1rem;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: #fffaf0;

    border-color: ${colors.yellowStrong};

    box-shadow:
      0 4px 12px
      rgba(249, 190, 6, 0.1);
  }

  &:focus {
    border-color: ${colors.yellowStrong};

    background: #fffbe6;

    box-shadow:
      0 0 0 3px
      rgba(255, 219, 83, 0.18);
  }

  &::placeholder {
    color: #7c7040;
    opacity: 0.7;
  }

  @media (max-width: 768px) {
    height: 60px;

    padding:
      23px 50px 7px 19px;

    border-radius: 13px;

    font-size: 0.9rem;
  }

  @media (max-width: 500px) {
    height: 57px;

    padding:
      21px 46px 6px 17px;

    border-radius: 12px;

    font-size: 0.84rem;
  }
`;

/* ============================================================
   PASSWORD
============================================================ */

export const PasswordWrapper = styled.div`
  position: relative;

  width: 100%;
  height: 68px;

  flex-shrink: 0;

  will-change: transform, opacity;

  ${Input} {
    width: 100%;
  }

  @media (max-width: 768px) {
    height: 60px;
  }

  @media (max-width: 500px) {
    height: 57px;
  }
`;

/* ============================================================
   EYE
============================================================ */

export const EyeButton = styled.button`
  position: absolute;

  top: 50%;
  right: 22px;

  width: 32px;
  height: 32px;

  transform: translateY(-50%);

  border: 0;

  background: transparent;

  color: #888;

  cursor: pointer;

  display: flex;

  align-items: center;
  justify-content: center;

  font-size: 1.15rem;

  padding: 0;

  &:hover {
    color: ${colors.red};
  }

  @media (max-width: 768px) {
    right: 14px;

    width: 30px;
    height: 30px;

    font-size: 1rem;
  }

  @media (max-width: 500px) {
    right: 11px;

    width: 28px;
    height: 28px;

    font-size: 0.95rem;
  }
`;

/* ============================================================
   ESQUECI SENHA
============================================================ */

export const ForgotPassword = styled.button`
  width: 100%;

  border: 0;

  background: transparent;

  color: ${colors.red};

  cursor: pointer;

  font-size: 0.9rem;

  line-height: 1.3;

  padding: 2px 0;

  will-change: transform, opacity;

  &:hover {
    color: ${colors.black};

    text-decoration: underline;
  }

  @media (max-width: 500px) {
    font-size: 0.78rem;
  }
`;

/* ============================================================
   BOTÃO PRINCIPAL (Entrar, Cadastrar, Gerar código...)
   Mesma animação e borda dos botões de "anos" (Inscrições):
   - borda 2px
   - botão sobe 8px com sombra
   - bolinha amarela cresce a partir do mouse
============================================================ */

export const Button = styled.button`
  position: relative;

  width: 100%;
  height: 62px;

  margin-top: 14px;

  padding: 0 24px;

  border: 2px solid ${colors.red};

  border-radius: 17px;

  background: ${colors.red};

  color: ${colors.white};

  font-size: 1.05rem;
  font-weight: 700;

  cursor: pointer;

  overflow: hidden;

  isolation: isolate;

  transform: translateZ(0);

  will-change: transform, opacity;

  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    box-shadow 0.3s ease,
    color 0.25s ease;

  &::before {
    content: "";

    position: absolute;

    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);

    width: 40px;
    height: 40px;

    border-radius: 50%;

    background: ${colors.yellow};

    transform:
      translate(-50%, -50%)
      scale(0);

    pointer-events: none;

    z-index: -1;

    transition:
      transform
      0.65s
      cubic-bezier(0.16, 1, 0.3, 1);
  }

  .button-content {
    position: relative;

    z-index: 2;

    display: flex;

    align-items: center;
    justify-content: center;

    color: inherit;
  }

  &:hover {
    color: #111;

    border-color: ${colors.red};

    transform: translateY(-8px);

    box-shadow:
      0 18px 35px
      rgba(131, 22, 20, 0.16);
  }

  &:hover::before {
    transform:
      translate(-50%, -50%)
      scale(18);
  }

  &:active {
    transform:
      translateY(-3px)
      scale(0.98);
  }

  &:focus-visible {
    outline: 3px solid ${colors.yellow};
    outline-offset: 4px;
  }

  @media (max-width: 768px) {
    height: 54px;

    margin-top: 12px;

    border-radius: 14px;

    font-size: 0.95rem;

    &:hover {
      transform: translateY(-5px);
    }
  }

  @media (max-width: 500px) {
    height: 50px;

    margin-top: 10px;

    border-radius: 13px;

    font-size: 0.88rem;
  }
`;

/* ============================================================
   MENSAGENS
============================================================ */

export const ErrorMessage = styled.p`
  width: 100%;

  color: #c62828;

  font-size: 0.85rem;

  line-height: 1.3;

  text-align: center;

  will-change: transform, opacity;

  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;

export const SuccessMessage = styled.p`
  width: 100%;

  color: #2e7d32;

  font-size: 0.85rem;

  line-height: 1.3;

  text-align: center;

  will-change: transform, opacity;

  @media (max-width: 500px) {
    font-size: 0.75rem;
  }
`;