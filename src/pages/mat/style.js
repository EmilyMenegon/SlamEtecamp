import styled, {
  createGlobalStyle,
  css,
  keyframes
} from "styled-components";

const colors = {
  yellow: "#FFDB53",
  yellowStrong: "#F9BE06",
  cream: "#FFF7D0",
  red: "#831614",
  wine: "#571111",
  black: "#010000",
  dark: "#383131",
  white: "#fff"
};

const flutuar = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(15px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const modalShow = keyframes`
  from {
    transform: translateY(20px) scale(.96);
    opacity: 0;
  }
  to {
    transform: translateY(0) scale(1);
    opacity: 1;
  }
`;

/* =========================================================
   BREAKPOINTS USADOS NESTE ARQUIVO

   - 960px: o botão de sair (casinha) passa para dentro do card
            do título, para não ficar por cima dele.
   - 900px: tablet.
   - 600px: celular.
   - 420px: celular pequeno (botões dos modais empilham).
   - 360px: celular bem pequeno.
========================================================= */

export const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html,
  body,
  #root {
    margin: 0;
    padding: 0;
    width: 100%;
    min-width: 100%;
    min-height: 100%;
  }

  html {
    -webkit-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  body {
    font-family: "Poppins", sans-serif;
    background: ${colors.cream};
    overflow-x: hidden;
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
`;

export const Container = styled.div`
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100dvh;
  margin: 0;
  padding: 40px 0 70px;
  overflow: hidden;
  background: ${colors.cream};
  font-family: "Poppins", sans-serif;

  @media (max-width: 900px) {
    padding: 32px 0 110px;
  }

  /* espaço extra embaixo para o botão + não cobrir o último card */
  @media (max-width: 600px) {
    padding: 24px 0 110px;
  }
`;

/* =========================================================
   PIXELS (bichinhos flutuantes)

   - position: fixed -> ficam presos à tela, e não ao Container
     (que cresce com a lista e deixava eles no meio das notas).
   - z-index: 1 -> ficam ATRÁS do conteúdo (4), do Header (5),
     do Fab (100) e dos modais (9999), mas acima do fundo.
   - pointer-events: none -> não atrapalham cliques.
   - tamanho acompanha a largura da tela e tem limites.
   - quem prefere menos movimento no sistema não vê a animação.
========================================================= */

const pixelBase = css`
  position: fixed;
  height: auto;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  z-index: 1;
  will-change: transform;

  @media (prefers-reduced-motion: reduce) {
    animation: none !important;
  }
`;

export const Pixel01 = styled.img`
  ${pixelBase}
  top: clamp(130px, 22vh, 260px);
  left: clamp(4px, 1.2vw, 28px);
  width: clamp(44px, 7vw, 130px);
  animation: ${flutuar} 4.8s ease-in-out infinite;

  @media (max-width: 600px) {
    top: auto;
    bottom: 22%;
    left: 4px;
    width: 46px;
    opacity: .9;
  }

  @media (max-width: 360px) {
    width: 38px;
  }
`;

export const Pixel02 = styled.img`
  ${pixelBase}
  top: clamp(90px, 14vh, 190px);
  right: clamp(4px, 1.2vw, 28px);
  width: clamp(48px, 7.5vw, 140px);
  animation: ${flutuar} 5.4s ease-in-out infinite;
  animation-delay: .5s;

  @media (max-width: 600px) {
    top: 78px;
    right: 4px;
    width: 48px;
    opacity: .9;
  }

  @media (max-width: 360px) {
    width: 40px;
  }
`;

export const Pixel03 = styled.img`
  ${pixelBase}
  /* sempre acima do botão flutuante (Fab) */
  bottom: calc(35px + 68px + 22px + env(safe-area-inset-bottom, 0px));
  right: clamp(4px, 1.5vw, 34px);
  width: clamp(44px, 6.5vw, 125px);
  animation: ${flutuar} 5.1s ease-in-out infinite;
  animation-delay: 1s;

  @media (max-width: 600px) {
    bottom: calc(20px + 60px + 14px + env(safe-area-inset-bottom, 0px));
    right: 4px;
    width: 46px;
    opacity: .9;
  }

  @media (max-width: 360px) {
    width: 38px;
  }
`;

export const Header = styled.header`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto 35px;
  display: flex;
  justify-content: center;
  position: relative;
  z-index: 5;

  @media (max-width: 900px) {
    margin-bottom: 28px;
  }

  @media (max-width: 600px) {
    width: 92%;
    margin-bottom: 22px;
  }
`;

export const LogoText = styled.div`
  width: 100%;
  max-width: 720px;
  padding: 28px 35px;
  background: ${colors.white};
  border-radius: 18px;
  border-bottom: 7px solid ${colors.yellow};
  box-shadow: 0 12px 30px rgba(87, 17, 17, .08);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;

  /* deixa espaço dos dois lados para o botão de sair não cobrir o título */
  @media (max-width: 960px) {
    padding: 24px 84px;
  }

  @media (max-width: 600px) {
    padding: 20px 64px;
    border-radius: 16px;
    border-bottom-width: 6px;
  }
`;

export const Title = styled.h1`
  margin: 0;
  color: ${colors.red};
  font-size: 42px;
  font-weight: 800;
  letter-spacing: -.5px;
  text-align: center;

  &::after {
    content: "";
    display: block;
    width: 55px;
    height: 5px;
    margin: 10px auto 0;
    border-radius: 10px;
    background: ${colors.yellow};
  }

  @media (max-width: 900px) {
    font-size: 38px;
  }

  @media (max-width: 600px) {
    font-size: 32px;

    &::after {
      width: 46px;
      height: 4px;
      margin-top: 8px;
    }
  }

  @media (max-width: 360px) {
    font-size: 28px;
  }
`;

export const BackButton = styled.button`
  position: absolute;
  left: 0;
  top: 0;
  width: 58px;
  height: 58px;
  padding: 0;
  border: 0;
  border-radius: 16px;
  background: ${colors.yellow};
  color: ${colors.black};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transform: translateZ(0);
  z-index: 10;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .2);
  transition: color .3s ease, transform .25s ease;

  &::before {
    content: "";
    position: absolute;
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: ${colors.red};
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    z-index: 0;
    transition: transform .55s cubic-bezier(.16, 1, .3, 1);
  }

  svg {
    position: relative;
    z-index: 2;
    width: 22px;
    height: 22px;
    transition: transform .25s ease;
  }

  &:hover {
    color: ${colors.white};
    transform: translateY(-3px);
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(4);
  }

  &:hover svg {
    transform: scale(1.08);
  }

  &:active {
    transform: scale(.95);
  }

  /* telas médias e pequenas: o botão fica dentro do card, centralizado */
  @media (max-width: 960px) {
    left: 14px;
    top: 50%;
    margin-top: -29px;
  }

  @media (max-width: 600px) {
    left: 10px;
    width: 48px;
    height: 48px;
    margin-top: -24px;

    svg {
      width: 18px;
      height: 18px;
    }
  }
`;

export const Content = styled.main`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  position: relative;
  z-index: 4;

  @media (max-width: 600px) {
    width: 92%;
  }
`;

export const EventoGroup = styled.section`
  width: 100%;
  max-width: 1400px;
  margin: 0 auto 35px;
  padding: 28px;
  position: relative;
  background: rgba(255, 255, 255, .72);
  border-radius: 24px;
  box-shadow: 0 12px 35px rgba(87, 17, 17, .08);
  animation: ${fadeIn} .35s ease;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 28px;
    width: 70px;
    height: 6px;
    border-radius: 0 0 8px 8px;
    background: ${colors.yellow};
  }

  @media (max-width: 900px) {
    margin-bottom: 28px;
    padding: 24px;
    border-radius: 22px;

    &::before {
      left: 24px;
    }
  }

  @media (max-width: 600px) {
    margin-bottom: 22px;
    padding: 20px 14px 18px;
    border-radius: 18px;

    &::before {
      left: 18px;
      width: 56px;
    }
  }
`;

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 24px;
  animation: ${fadeIn} .35s ease;

  > * {
    width: min(100%, 380px);
    flex: 0 1 380px;
    min-width: 0;
  }

  @media (max-width: 900px) {
    gap: 20px;
  }

  @media (max-width: 600px) {
    gap: 16px;

    > * {
      width: 100%;
      flex: 1 1 100%;
    }
  }
`;

export const EventoGroupHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 14px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid rgba(255, 219, 83, .45);

  /* no celular: título em cima e botão de publicar embaixo, largura total */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: stretch;
    gap: 12px;
    margin-bottom: 18px;
    padding-bottom: 14px;
  }
`;

export const EventoGroupTitle = styled.h2`
  margin: 0;
  min-width: 0;
  color: ${colors.wine};
  font-size: 22px;
  font-weight: 800;
  overflow-wrap: anywhere;

  @media (max-width: 600px) {
    font-size: 19px;
  }
`;

export const PublishButton = styled.button`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 12px 20px;
  border: 2px solid ${colors.red};
  border-radius: 12px;
  background: ${colors.red};
  color: ${colors.yellow};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transform: translateZ(0);
  transition: color .3s ease, transform .25s ease, box-shadow .3s ease;

  &::before {
    content: "";
    position: absolute;
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${colors.yellow};
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    z-index: 0;
    transition: transform .65s cubic-bezier(.16, 1, .3, 1);
  }

  svg,
  span {
    position: relative;
    z-index: 2;
  }

  svg {
    flex-shrink: 0;
  }

  &:hover:not(:disabled) {
    color: ${colors.wine};
    transform: translateY(-3px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, .17);
  }

  &:hover:not(:disabled)::before {
    transform: translate(-50%, -50%) scale(10);
  }

  &:active:not(:disabled) {
    transform: translateY(1px) scale(.98);
  }

  &:disabled {
    opacity: .6;
    cursor: not-allowed;
  }

  @media (max-width: 600px) {
    width: 100%;
    min-height: 46px;
    padding: 12px 16px;
    font-size: 13px;
  }
`;

export const PublishedBadge = styled.span`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 18px;
  border-radius: 12px;
  background: ${colors.yellow};
  color: ${colors.wine};
  font-size: 13px;
  font-weight: 700;

  svg {
    font-size: 14px;
  }

  @media (max-width: 600px) {
    justify-content: center;
    width: 100%;
  }
`;

export const Fab = styled.button`
  position: fixed;
  right: 35px;
  bottom: calc(35px + env(safe-area-inset-bottom, 0px));
  width: 68px;
  height: 68px;
  padding: 0;
  border: 0;
  border-radius: 20px;
  background: ${colors.red};
  color: ${colors.yellow};
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transform: translateZ(0);
  z-index: 100;
  box-shadow: 0 10px 30px rgba(0, 0, 0, .2);
  transition: color .3s ease, transform .25s ease, box-shadow .3s ease;

  &::before {
    content: "";
    position: absolute;
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: ${colors.yellow};
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    z-index: 0;
    transition: transform .65s cubic-bezier(.16, 1, .3, 1);
  }

  svg {
    position: relative;
    z-index: 2;
    width: 24px;
    height: 24px;
    transition: transform .3s ease;
  }

  &:hover {
    color: ${colors.red};
    transform: translateY(-4px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, .2);
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(10);
  }

  &:hover svg {
    transform: rotate(90deg);
  }

  &:active {
    transform: translateY(1px) scale(.97);
  }

  @media (max-width: 900px) {
    right: 24px;
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  }

  @media (max-width: 600px) {
    right: 20px;
    bottom: calc(20px + env(safe-area-inset-bottom, 0px));
    width: 60px;
    height: 60px;
    border-radius: 18px;
  }
`;

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  padding: 20px;
  background: rgba(87, 17, 17, 0.35);
  backdrop-filter: blur(4px);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: 9999;

  @media (max-width: 500px) {
    padding: 16px;
  }
`;

export const Modal = styled.div`
  position: relative;
  width: 420px;
  max-width: 100%;
  margin: auto;
  padding: 32px;
  background: ${colors.white};
  border-radius: 22px;
  text-align: center;
  box-shadow:
    8px 8px 0 ${colors.red},
    0 20px 50px rgba(0, 0, 0, 0.2);
  animation: ${modalShow} 0.25s ease;

  &::before {
    content: "";
    position: absolute;
    width: 90px;
    height: 90px;
    top: -35px;
    right: -35px;
    background: ${colors.yellow};
    border-radius: 50%;
    z-index: -1;
  }

  h3 {
    margin: 0 0 10px;
    color: ${colors.red};
    font-size: 1.4rem;
    font-weight: 900;
  }

  p {
    margin: 0 0 25px;
    color: #666;
    font-size: 0.92rem;
    line-height: 1.5;
  }

  @media (max-width: 500px) {
    padding: 26px 20px;
    border-radius: 18px;
    box-shadow:
      6px 6px 0 ${colors.red},
      0 16px 40px rgba(0, 0, 0, 0.2);

    &::before {
      width: 70px;
      height: 70px;
      top: -26px;
      right: -26px;
    }

    h3 {
      font-size: 1.2rem;
    }

    p {
      font-size: 0.85rem;
    }
  }
`;

export const ModalTitle = styled.h2`
  margin: 0 0 10px;
  color: ${colors.red};
  font-size: 1.4rem;
  font-weight: 900;

  @media (max-width: 500px) {
    font-size: 1.2rem;
  }
`;

export const ModalText = styled.p`
  margin: 0 0 25px;
  color: #666;
  font-size: 0.92rem;
  line-height: 1.5;

  @media (max-width: 500px) {
    margin-bottom: 20px;
    font-size: 0.85rem;
  }
`;

export const Buttons = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  width: 100%;

  @media (max-width: 420px) {
    flex-direction: column;
  }
`;

export const CancelButton = styled.button`
  position: relative;
  width: 145px;
  max-width: 100%;
  height: 46px;
  padding: 0;
  border: 2px solid ${colors.yellow};
  border-radius: 12px;
  background: ${colors.cream};
  color: ${colors.black};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition: color 0.3s ease, transform 0.25s ease;

  &::before {
    content: "";
    position: absolute;
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${colors.yellow};
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    z-index: 0;
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover {
    transform: translateY(-2px);
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(10);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 420px) {
    width: 100%;
  }
`;

export const DeleteButton = styled.button`
  position: relative;
  width: 145px;
  max-width: 100%;
  height: 46px;
  padding: 0;
  border: 0;
  border-radius: 12px;
  background: ${colors.red};
  color: ${colors.white};
  font-size: 0.9rem;
  font-weight: 700;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition:
    color 0.3s ease,
    transform 0.25s ease,
    box-shadow 0.25s ease;

  &::before {
    content: "";
    position: absolute;
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
    width: 25px;
    height: 25px;
    border-radius: 50%;
    background: ${colors.yellow};
    transform: translate(-50%, -50%) scale(0);
    pointer-events: none;
    z-index: 0;
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover {
    color: ${colors.black};
    transform: translateY(-2px);
    box-shadow: 0 8px 20px rgba(131, 22, 20, 0.22);
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(10);
  }

  &:active {
    transform: scale(0.97);
  }

  @media (max-width: 420px) {
    width: 100%;
  }
`;