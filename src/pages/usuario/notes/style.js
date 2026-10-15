import styled from "styled-components";

const theme = {
  primary: "#831614",
  primaryDark: "#571111",
  black: "#010000",
  text: "#292929",
  muted: "#666666",
  white: "#ffffff",
  paper: "#fffdf0",
  background: "#ffffff",
  border: "#ffdb53",
  shadow: "rgba(1, 0, 0, .14)"
};

// Página externa: permanece branca.
export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: ${theme.background};
  font-family: "Poppins", sans-serif;
  color: ${theme.black};
  overflow-x: hidden;
  box-sizing: border-box;

  &, & *, & *::before, & *::after {
    font-family: "Poppins", sans-serif;
    box-sizing: border-box;
  }
`;

export const Content = styled.main`
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 35px 0 100px;

  @media (max-width: 768px) {
    width: 92%;
    padding: 25px 0 80px;
  }

  @media (max-width: 480px) {
    width: 90%;
    padding: 20px 0 70px;
  }
`;

export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 45px;

  @media (max-width: 600px) {
    margin-bottom: 30px;
  }
`;

export const Title = styled.h1`
  margin: 0 0 14px;
  color: ${theme.primary};
  font-size: clamp(2.8rem, 5vw, 4.8rem);
  font-weight: 900;
  letter-spacing: -2px;
  line-height: 1.05;

  @media (max-width: 768px) {
    font-size: clamp(2.5rem, 9vw, 4rem);
    letter-spacing: -1.5px;
  }

  @media (max-width: 480px) {
    font-size: 2.3rem;
  }
`;

export const Subtitle = styled.p`
  width: 100%;
  max-width: 700px;
  margin: 10px auto 0;
  color: ${theme.muted};
  font-size: 1.55rem;
  line-height: 1.6;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

// Capa vinho com textura de zine e contorno amarelo.
export const Notebook = styled.section`
  position: relative;
  isolation: isolate;
  width: 100%;
  padding: 35px;
  background:
    radial-gradient(circle, rgba(255,219,83,.13) 1.5px, transparent 2px) 0 0 / 22px 22px,
    linear-gradient(140deg, #831614 0%, #571111 65%, #350b0b 100%);
  border: 3px solid ${theme.border};
  border-radius: 28px;
  box-shadow:
    0 18px 45px rgba(1,0,0,.2),
    inset 0 0 0 5px rgba(255,219,83,.07);
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    inset: 9px;
    z-index: -1;
    border: 1px dashed rgba(255,219,83,.45);
    border-radius: 19px;
    pointer-events: none;
  }

  @media (max-width: 900px) {
    padding: 25px;
  }

  @media (max-width: 600px) {
    padding: 18px;
    border-radius: 22px;
  }
`;

// Adesivos pixelados com recorte claro e sombra.
export const NotebookSticker = styled.img`
  position: absolute;
  z-index: 4;
  display: block;
  height: auto;
  object-fit: contain;
  pointer-events: none;
  user-select: none;
  filter:
    drop-shadow(2px 0 0 ${theme.white})
    drop-shadow(-2px 0 0 ${theme.white})
    drop-shadow(0 2px 0 ${theme.white})
    drop-shadow(0 -2px 0 ${theme.white})
    drop-shadow(3px 5px 2px rgba(1,0,0,.32));

  &.sticker-top-left {
    top: 9px;
    left: 8px;
    width: 56px;
    transform: rotate(-11deg);
  }

  &.sticker-bottom-right {
    right: 8px;
    bottom: 48px;
    width: 82px;
    transform: rotate(9deg);
  }

  &.sticker-top-right {
    top: 9px;
    right: 8px;
    width: 58px;
    transform: rotate(10deg);
  }

  &.sticker-bottom-left {
    left: 8px;
    bottom: 48px;
    width: 65px;
    transform: rotate(-9deg);
  }

  @media (max-width: 900px) {
    &.sticker-top-left,
    &.sticker-top-right {
      width: 48px;
    }

    &.sticker-bottom-right {
      width: 70px;
      bottom: 45px;
    }

    &.sticker-bottom-left {
      width: 56px;
      bottom: 45px;
    }
  }

  @media (max-width: 700px) {
    &.sticker-top-left,
    &.sticker-top-right {
      width: 42px;
      top: 7px;
    }

    &.sticker-bottom-right {
      width: 59px;
      right: 6px;
      bottom: 43px;
    }

    &.sticker-bottom-left {
      width: 48px;
      left: 6px;
      bottom: 43px;
    }
  }
`;

export const NotebookHeader = styled.div`
  width: 100%;
  margin-bottom: 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 20px;

  @media (max-width: 600px) {
    align-items: flex-start;
    flex-direction: column;
    gap: 8px;
  }
`;

export const NotebookHeaderTitle = styled.h2`
  margin: 0;
  color: ${theme.border};
  font-size: 20px;
  font-weight: 700;
  line-height: 1.35;
`;

export const NotebookHeaderInfo = styled.span`
  color: rgba(255, 247, 208, .9);
  font-size: 13px;
  font-weight: 500;
  white-space: nowrap;
`;

export const Pages = styled.div`
  position: relative;
  width: 100%;
  min-height: 650px;
  display: flex;
  align-items: stretch;
  justify-content: center;
  perspective: 2200px;
  perspective-origin: center center;
  overflow: hidden;
  cursor: grab;
  user-select: none;
  touch-action: pan-y;

  &:active {
    cursor: grabbing;
  }

  @media (max-width: 900px) {
    min-height: 570px;
  }

  @media (max-width: 700px) {
    min-height: 480px;
  }
`;

export const PageCard = styled.article`
  position: relative;
  width: 100%;
  min-height: 650px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  background: ${theme.paper};
  border: 1px solid rgba(255,219,83,.9);
  border-radius: 24px;
  box-shadow:
    0 10px 28px rgba(0,0,0,.12),
    inset 0 0 0 4px rgba(255,219,83,.08);
  transform-style: preserve-3d;
  overflow: visible;

  @media (max-width: 900px) {
    min-height: 570px;
  }

  @media (max-width: 700px) {
    min-height: 480px;
    grid-template-columns: 1fr;
  }

  @media (max-width: 500px) {
    min-height: 430px;
    border-radius: 20px;
  }
`;

export const PageSide = styled.div`
  position: relative;
  min-width: 0;
  min-height: 100%;
  padding: 35px 40px 28px;
  display: flex;
  flex-direction: column;
  background: ${theme.paper};
  overflow: hidden;

  /* Linhas suaves de papel para escrita. */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    background: repeating-linear-gradient(
      to bottom,
      transparent 0,
      transparent 31px,
      rgba(131,22,20,.075) 32px
    );
  }

  /* Sombra leve nas bordas da folha. */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: 1;
    pointer-events: none;
    background: linear-gradient(
      90deg,
      rgba(0,0,0,.025),
      transparent 9%,
      transparent 91%,
      rgba(0,0,0,.018)
    );
  }

  /* Folhas que giram durante a navegação. */
  &.turning-page {
    position: absolute;
    top: 0;
    bottom: 0;
    width: 50%;
    z-index: 50;
    padding: 35px 40px 28px;
    pointer-events: none;
    transform-style: preserve-3d;
    backface-visibility: hidden;
    will-change: transform;
    box-shadow: none;
  }

  &.turning-page.next-page {
    left: 50%;
    right: auto;
    transform-origin: left center;
  }

  &.turning-page.previous-page {
    left: 0;
    right: auto;
    transform-origin: right center;
  }

  &.turning-page.active {
    z-index: 100;
  }

  @media (max-width: 900px) {
    padding: 30px 28px 24px;

    &.turning-page {
      padding: 30px 28px 24px;
    }
  }

  @media (max-width: 700px) {
    width: 100%;
    grid-column: 1;
    padding: 25px 22px 20px;

    &.right-page,
    &.turning-page {
      display: none;
    }

    &.turning-page {
      padding: 25px 22px 20px;
    }
  }

  @media (max-width: 500px) {
    padding: 25px 22px 20px;

    &.turning-page {
      padding: 25px 22px 20px;
    }
  }
`;

export const PageHeader = styled.header`
  position: relative;
  z-index: 3;
  min-height: 48px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  margin-bottom: 18px;
  padding: 0 62px 14px;
  background: ${theme.paper};
  border-bottom: 3px solid ${theme.border};

  @media (max-width: 900px) {
    padding-right: 52px;
    padding-left: 52px;
  }

  @media (max-width: 700px) {
    padding-right: 44px;
    padding-left: 44px;
  }
`;

export const PageTitle = styled.h3`
  margin: 0;
  color: ${theme.primary};
  font-size: 18px;
  font-weight: 700;
  line-height: 1.35;
  word-break: break-word;

  @media (max-width: 500px) {
    font-size: 16px;
  }
`;

export const PageNumber = styled.span`
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 38px;
  height: 30px;
  padding: 0 10px;
  border-radius: 999px;
  background: ${theme.border};
  color: ${theme.black};
  font-size: 11px;
  font-weight: 800;
`;

export const TitleInput = styled.input`
  position: relative;
  z-index: 3;
  width: 100%;
  flex-shrink: 0;
  margin-bottom: 14px;
  padding: 0 2px 10px;
  border: none;
  border-bottom: 2px dashed ${theme.border};
  outline: none;
  background: transparent;
  transform: translateZ(0);
  color: ${theme.primary};
  font-size: 19px;
  font-weight: 700;
  transition: border-color .2s ease;

  &::placeholder {
    color: rgba(131,22,20,.4);
    font-weight: 600;
  }

  &:focus {
    border-bottom-style: solid;
    border-bottom-color: ${theme.primary};
  }

  &:read-only {
    cursor: default;
  }

  @media (max-width: 500px) {
    font-size: 16px;
    margin-bottom: 10px;
  }
`;

export const WritingArea = styled.textarea`
  position: relative;
  z-index: 3;
  width: 100%;
  flex: 1;
  min-height: 0;
  padding: 0 3px 55px;
  resize: none;
  border: none;
  outline: none;
  background: transparent;
  transform: translateZ(0);
  color: ${theme.text};
  font-size: 16px;
  font-weight: 400;
  line-height: 32px;
  caret-color: ${theme.primary};
  user-select: text;
  overflow-y: auto;
  overflow-x: hidden;
  scrollbar-width: thin;
  scrollbar-color: ${theme.primary} transparent;

  &::placeholder {
    color: rgba(17,17,17,.38);
  }

  &::-webkit-scrollbar {
    width: 5px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: ${theme.primary};
    border-radius: 999px;
  }

  &:read-only {
    cursor: default;
  }

  @media (max-width: 500px) {
    font-size: 14px;
    line-height: 30px;
    padding-bottom: 48px;
  }
`;

export const PageFooter = styled.footer`
  position: relative;
  z-index: 3;
  flex-shrink: 0;
  margin-top: 15px;
  padding-top: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${theme.paper};
  border-top: 1px solid ${theme.border};
  color: ${theme.muted};
  font-size: 10px;
  font-weight: 500;
`;

export const PageNavigation = styled.div`
  width: 100%;
  margin-top: 25px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 18px;

  @media (max-width: 600px) {
    gap: 10px;
  }
`;

export const NavigationButton = styled.button`
  min-height: 44px;
  padding: 9px 20px;
  border: 1px solid ${theme.border};
  border-radius: 999px;
  background: ${theme.border};
  color: ${theme.black};
  font-size: 13px;
  font-weight: 700;
  cursor: pointer;
  transition:
    background .2s ease,
    color .2s ease,
    transform .2s ease,
    border-color .2s ease;

  &:hover:not(:disabled) {
    background: ${theme.primary};
    border-color: ${theme.primary};
    color: ${theme.white};
    transform: translateY(-2px);
  }

  &:disabled {
    opacity: .35;
    cursor: not-allowed;
  }

  &:focus-visible {
    outline: 3px solid rgba(131,22,20,.25);
    outline-offset: 3px;
  }

  @media (max-width: 500px) {
    padding: 8px 14px;
    font-size: 11px;
  }
`;

export const PageCounter = styled.div`
  min-width: 125px;
  min-height: 44px;
  padding: 8px 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  border: 2px solid ${theme.border};
  border-radius: 999px;
  background: ${theme.paper};
  color: ${theme.black};
  box-shadow: 0 7px 18px rgba(131,22,20,.12);

  strong {
    color: ${theme.primary};
    font-size: 13px;
    font-weight: 800;
  }

  span {
    color: ${theme.muted};
    font-weight: 700;
  }

  small {
    margin-left: 2px;
    color: ${theme.muted};
    font-size: 9px;
    font-weight: 500;
  }

  @media (max-width: 500px) {
    min-width: 90px;
    padding: 7px 10px;
    gap: 5px;
  }
`;

export const DragHint = styled.div`
  margin-top: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 7px;
  color: rgba(255,247,208,.9);
  font-size: 11px;
  font-weight: 500;

  span {
    width: 24px;
    height: 24px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
    background: ${theme.border};
    color: ${theme.black};
    font-size: 13px;
    font-weight: 800;
  }

  @media (max-width: 500px) {
    font-size: 10px;
  }
`;

export const SaveStatus = styled.span`
  flex-shrink: 0;
  color: rgba(255,247,208,.9);
  font-size: 12px;
  font-weight: 500;
  white-space: nowrap;
`;

// Estado de bloqueio para quem ainda não se inscreveu.
export const LockedState = styled.div`
  width: 100%;
  min-height: 420px;
  padding: 60px 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  gap: 14px;
  background: ${theme.white};
  border: 1px solid ${theme.border};
  border-radius: 24px;
  box-shadow: 0 10px 28px rgba(0,0,0,.10);

  @media (max-width: 600px) {
    min-height: 340px;
    padding: 40px 20px;
  }
`;

export const LockedIcon = styled.div`
  width: 80px;
  height: 80px;
  margin-bottom: 6px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(131,22,20,.10);
  color: ${theme.primary};
  font-size: 34px;
`;

export const LockedTitle = styled.h2`
  margin: 0;
  color: ${theme.black};
  font-size: 24px;
  font-weight: 700;

  @media (max-width: 600px) {
    font-size: 20px;
  }
`;

export const LockedText = styled.p`
  max-width: 460px;
  margin: 0;
  color: ${theme.muted};
  font-size: 15px;
  line-height: 1.6;

  @media (max-width: 600px) {
    font-size: 14px;
  }
`;

export const LockedButton = styled.button`
  margin-top: 10px;
  min-height: 48px;
  padding: 0 26px;
  border: none;
  border-radius: 999px;
  background: ${theme.primary};
  color: ${theme.white};
  font-size: 14px;
  font-weight: 700;
  cursor: pointer;
  transition: background .2s ease, transform .2s ease;

  &:hover {
    background: ${theme.primaryDark};
    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }
`;