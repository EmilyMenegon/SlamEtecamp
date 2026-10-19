
import styled, { css, keyframes } from "styled-components";
 
const COLORS = {
  primary: "#831614",
  primaryDark: "#65100f",
  yellow: "#ffdb53",
  yellowDark: "#e3b900",
  background: "#fff",
  white: "#ffffff",
  text: "#1c1c1c",
  muted: "#777777",
  border: "#d8d8d8",
  danger: "#d62828",
  dangerDark: "#b71c1c",
  cream: "#fff7d0",
  gray: "#666666",
};
 
/* =====================================================
   BUTTON EFFECT
===================================================== */
 
const ButtonEffect = css`
  position: relative;
  overflow: hidden;
  isolation: isolate;
 
  --mouse-x: 50%;
  --mouse-y: 50%;
 
  &::before {
    content: "";
 
    position: absolute;
 
    left: var(--mouse-x);
    top: var(--mouse-y);
 
    width: 20px;
    height: 20px;
 
    border-radius: 50%;
 
    background: ${COLORS.yellow};
 
    transform: translate(-50%, -50%) scale(0);
 
    transition:
      transform 0.55s cubic-bezier(.16, 1, .3, 1);
 
    z-index: -1;
 
    pointer-events: none;
  }
 
  &:hover::before {
    transform: translate(-50%, -50%) scale(15);
  }
`;
 
/* =====================================================
   PAGE
===================================================== */
 
export const Page = styled.div`
  min-height: 100vh;
  width: 100%;
 
  background: #fff;
  color: ${COLORS.text};
 
  font-family: "Poppins", sans-serif;
 
  box-sizing: border-box;
 
  overflow-x: hidden;
`;
 
/* =====================================================
   CONTENT
===================================================== */
 
export const Content = styled.main`
  width: min(97%, 1650px);
 
  margin: 35px auto 55px;
 
  box-sizing: border-box;
 
  @media (max-width: 1100px) {
    width: 96%;
    margin-top: 30px;
  }
 
  @media (max-width: 700px) {
    width: 94%;
    margin: 22px auto 40px;
  }
`;
 
/* =====================================================
   HEADER
===================================================== */
 
export const Header = styled.header`
  position: relative;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  gap: 30px;
 
  margin-bottom: 28px;
 
  @media (max-width: 850px) {
    flex-direction: column;
    align-items: center;
    text-align: center;
 
    gap: 18px;
  }
`;
 
export const TitleArea = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
 
  gap: 8px;
 
  text-align: center;
`;
 
export const Title = styled.h1`
  margin: 0 0 10px;
 
  color: ${COLORS.primary};
 
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
 
  margin: 8px auto 0;
 
  color: #777;
 
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
 
/* =====================================================
   YEARS
===================================================== */
 
export const YearsWrapper = styled.div`
  width: 100%;
 
  margin: 0 auto;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  gap: 18px;
 
  box-sizing: border-box;
 
  @media (max-width: 900px) {
    gap: 12px;
  }
 
  @media (max-width: 600px) {
    gap: 7px;
  }
 
  @media (max-width: 430px) {
    gap: 5px;
  }
`;
 
export const YearsContainer = styled.div`
  width: 100%;
 
  max-width: 1000px;
 
  display: grid;
 
  grid-template-columns: repeat(3, minmax(0, 1fr));
 
  align-items: stretch;
  justify-content: center;
 
  gap: 18px;
 
  @media (max-width: 900px) {
    gap: 12px;
  }
 
  @media (max-width: 700px) {
    gap: 9px;
  }
 
  @media (max-width: 520px) {
    gap: 6px;
  }
`;
 
export const YearArrow = styled.button`
  position: relative;
 
  width: 46px;
  height: 46px;
 
  flex-shrink: 0;
 
  padding: 0;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  border: none;
  border-radius: 12px;
 
  background: ${COLORS.primary};
  color: #fff;
 
  cursor: pointer;
 
  overflow: hidden;
  isolation: isolate;
 
  transition:
    transform .25s cubic-bezier(.22,1,.36,1),
    box-shadow .25s ease,
    opacity .2s ease;
 
  &::before {
    content: "";
 
    position: absolute;
 
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
 
    width: 18px;
    height: 18px;
 
    border-radius: 50%;
 
    background: ${COLORS.yellow};
 
    transform: translate(-50%, -50%) scale(0);
 
    transition:
      transform .55s cubic-bezier(.16,1,.3,1);
 
    z-index: -1;
 
    pointer-events: none;
  }
 
  svg {
    position: relative;
 
    z-index: 2;
 
    width: 21px;
    height: 21px;
 
    stroke-width: 2.5;
  }
 
  &:hover:not(:disabled) {
    color: #111;
 
    transform: translateY(-2px);
 
    box-shadow:
      0 8px 18px rgba(131,22,20,.2);
 
    &::before {
      transform:
        translate(-50%, -50%) scale(8);
    }
  }
 
  &:active:not(:disabled) {
    transform: scale(.94);
  }
 
  &:disabled {
    opacity: .25;
 
    cursor: not-allowed;
 
    box-shadow: none;
  }
 
  &:focus-visible {
    outline: 2px solid ${COLORS.yellow};
    outline-offset: 3px;
  }
 
  @media (max-width: 700px) {
    width: 38px;
    height: 38px;
 
    border-radius: 10px;
 
    svg {
      width: 18px;
      height: 18px;
    }
  }
 
  @media (max-width: 430px) {
    width: 32px;
    height: 32px;
 
    border-radius: 8px;
 
    svg {
      width: 16px;
      height: 16px;
    }
  }
`;
 
export const YearCard = styled.button`
  position: relative;
 
  width: 100%;
  min-width: 0;
 
  height: 175px;
 
  padding: 20px;
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  gap: 13px;
 
  box-sizing: border-box;
 
  border:
    2px solid
    ${({ $active }) =>
      $active
        ? COLORS.primary
        : "#eee"};
 
  border-radius: 22px;
 
  background:
    ${({ $active }) =>
      $active
        ? COLORS.primary
        : "#fff"};
 
  color:
    ${({ $active }) =>
      $active
        ? "#fff"
        : "#111"};
 
  font-family: inherit;
 
  cursor: pointer;
 
  overflow: hidden;
  isolation: isolate;
 
  transition:
    transform .3s cubic-bezier(.22,1,.36,1),
    border-color .25s ease,
    background .25s ease,
    box-shadow .3s ease;
 
  &::before {
    content: "";
 
    position: absolute;
 
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
 
    width: 35px;
    height: 35px;
 
    border-radius: 50%;
 
    background: ${COLORS.yellow};
 
    transform:
      translate(-50%, -50%) scale(0);
 
    transition:
      transform .65s cubic-bezier(.16,1,.3,1);
 
    z-index: -1;
 
    pointer-events: none;
  }
 
  &:hover {
    transform: translateY(-8px);
 
    border-color: ${COLORS.primary};
 
    box-shadow:
      0 18px 35px rgba(131,22,20,.16);
 
    &::before {
      transform:
        translate(-50%, -50%) scale(11);
    }
  }
 
  &:active {
    transform:
      translateY(-3px) scale(.98);
  }
 
  &:focus-visible {
    outline: 3px solid ${COLORS.yellow};
    outline-offset: 4px;
  }
 
  @media (max-width: 900px) {
    height: 155px;
    padding: 17px;
    border-radius: 20px;
  }
 
  @media (max-width: 700px) {
    height: 135px;
    padding: 13px;
    border-radius: 17px;
 
    gap: 9px;
  }
 
  @media (max-width: 520px) {
    height: 115px;
    padding: 10px;
    border-radius: 15px;
 
    gap: 7px;
  }
 
  @media (max-width: 390px) {
    height: 105px;
    padding: 8px;
    border-radius: 13px;
  }
`;
 
export const YearIcon = styled.div`
  width: 52px;
  height: 52px;
 
  flex-shrink: 0;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  border-radius: 50%;
 
  background:
    ${({ $active }) =>
      $active
        ? COLORS.yellow
        : "rgba(255,219,83,.22)"};
 
  color: ${COLORS.primary};
 
  font-size: 23px;
 
  transition:
    transform .3s ease,
    background .25s ease;
 
  ${YearCard}:hover & {
    transform:
      scale(1.12) rotate(2deg);
  }
 
  @media (max-width: 900px) {
    width: 46px;
    height: 46px;
 
    font-size: 21px;
  }
 
  @media (max-width: 700px) {
    width: 40px;
    height: 40px;
 
    font-size: 18px;
  }
 
  @media (max-width: 520px) {
    width: 34px;
    height: 34px;
 
    font-size: 15px;
  }
 
  @media (max-width: 390px) {
    width: 30px;
    height: 30px;
 
    font-size: 13px;
  }
`;
 
export const YearNumber = styled.strong`
  position: relative;
 
  z-index: 2;
 
  color:
    ${({ $active }) =>
      $active
        ? "#fff"
        : COLORS.primary};
 
  font-size: 2.1rem;
 
  font-weight: 850;
 
  line-height: 1;
 
  transition:
    color .25s ease,
    transform .3s ease;
 
  ${YearCard}:hover & {
    color: #111;
 
    transform: scale(1.05);
  }
 
  @media (max-width: 900px) {
    font-size: 1.8rem;
  }
 
  @media (max-width: 700px) {
    font-size: 1.55rem;
  }
 
  @media (max-width: 520px) {
    font-size: 1.3rem;
  }
 
  @media (max-width: 390px) {
    font-size: 1.15rem;
  }
`;
 
export const YearDescription = styled.span`
  position: relative;
 
  z-index: 2;
 
  color:
    ${({ $active }) =>
      $active
        ? "rgba(255,255,255,.72)"
        : "#999"};
 
  font-size: 10px;
 
  font-weight: 500;
 
  line-height: 1.2;
 
  text-align: center;
 
  white-space: nowrap;
 
  transition:
    color .25s ease;
 
  ${YearCard}:hover & {
    color: #5e4900;
  }
 
  @media (max-width: 600px) {
    font-size: 9px;
 
    white-space: normal;
  }
 
  @media (max-width: 520px) {
    font-size: 8px;
  }
`;
 
/* =====================================================
   BLOCOS DA PÁGINA
   MESMA INTERFACE DA INSCRICOES
===================================================== */
export const Bloco = styled.section`
  width: 100%;
  margin-bottom: 28px;
  padding: 28px 30px 32px;
  box-sizing: border-box;
 
  background: #fff;
 
  border: 2px solid #d2d2d2;
  border-radius: 20px;
 
  box-shadow:
    0 18px 45px rgba(0,0,0,.10),
    0 3px 8px rgba(0,0,0,.045);
 
  @media (max-width: 900px) {
    padding: 24px 21px 28px;
  }
 
  @media (max-width: 600px) {
    margin-bottom: 20px;
    padding: 19px 14px 22px;
    border-radius: 16px;
  }
`;
 
export const BlocoHeader = styled.div`
  margin-bottom: 25px;
  padding-bottom: 19px;
 
  display: flex;
  align-items: center;
  gap: 15px;
 
  border-bottom: 2px solid #ddd;
 
  @media (max-width: 600px) {
    margin-bottom: 19px;
    padding-bottom: 14px;
    gap: 11px;
  }
`;
 
export const BlocoIcone = styled.div`
  width: 46px;
  height: 46px;
 
  flex-shrink: 0;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  border-radius: 12px;
 
  background: #fff5c9;
 
  border: 1px solid #e5ce73;
 
  color: #831614;
 
  font-size: 21px;
 
  @media (max-width: 600px) {
    width: 38px;
    height: 38px;
    font-size: 17px;
  }
`;
 
export const BlocoInfo = styled.div`
  min-width: 0;
 
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
 
export const BlocoTitulo = styled.h2`
  margin: 0;
 
  color: #252525;
 
  font-size: 24px;
  font-weight: 750;
 
  @media (max-width: 600px) {
    font-size: 19px;
  }
`;
 
export const BlocoDescricao = styled.p`
  margin: 0;
 
  color: #777;
 
  font-size: 16px;
  line-height: 1.45;
 
  @media (max-width: 600px) {
    font-size: 13px;
  }
`;
 
/* =====================================================
   EVENT BLOCK
===================================================== */
 
/*
  IMPORTANTE:
  O Cards NÃO é mais o bloco externo.
  O Bloco é responsável pela caixa externa,
  exatamente como na página de inscrições.
 
  Os EventCard continuam com o visual próprio.
*/
export const Cards = styled.section`
  width: 100%;
 
  display: grid;
 
  grid-template-columns:
    repeat(auto-fill, minmax(360px, 1fr));
 
  gap: 34px;
 
  box-sizing: border-box;
 
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 28px;
  }
 
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
    gap: 24px;
  }
 
  @media (max-width: 600px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;
 
/* =====================================================
   EVENT CARD
===================================================== */
export const EventCard = styled.article`
  position: relative;
 
  width: 100%;
  min-height: 500px;
 
  background: #fff;
 
  border: 1px solid #d8d8d8;
 
  border-radius: 20px;
 
  overflow: hidden;
 
  cursor: pointer;
 
  display: flex;
  flex-direction: column;
 
  box-shadow:
    0 12px 32px rgba(0,0,0,.09),
    0 3px 8px rgba(0,0,0,.04);
 
  transition:
    transform .3s cubic-bezier(.22,1,.36,1),
    box-shadow .3s ease,
    border-color .25s ease;
 
  &:hover {
    transform: translateY(-8px);
 
    border-color: #cfcfcf;
 
    box-shadow:
      0 22px 45px rgba(0,0,0,.14),
      0 5px 12px rgba(0,0,0,.05);
  }
 
  &:focus-visible {
    outline: 3px solid ${COLORS.yellow};
    outline-offset: 4px;
  }
 
  @media (max-width: 800px) {
    min-height: 480px;
  }
 
  @media (max-width: 600px) {
    min-height: 0;
    border-radius: 17px;
  }
`;
export const EventImage = styled.div`
  width: 100%;
 
  height: 220px;
 
  overflow: hidden;
 
  background: #eee;
 
  img {
    width: 100%;
    height: 100%;
 
    object-fit: cover;
 
    transition:
      transform .5s ease;
  }
 
  ${EventCard}:hover & img {
    transform: scale(1.06);
  }
 
  @media (max-width: 800px) {
    height: 200px;
  }
 
  @media (max-width: 600px) {
    height: 180px;
  }
`;
export const EventImagePlaceholder = styled.div`
  width: 100%;
 
  height: 220px;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  background: #f1f1f1;
 
  color: #aaa;
 
  font-size: 46px;
 
  @media (max-width: 800px) {
    height: 200px;
  }
 
  @media (max-width: 600px) {
    height: 180px;
  }
`;
export const EventContent = styled.div`
  padding: 25px;
 
  display: flex;
  flex-direction: column;
 
  flex: 1;
 
  @media (max-width: 600px) {
    padding: 20px;
  }
`;
 
export const EventTitle = styled.h2`
  margin: 0 0 10px;
 
  color: #252525;
 
  font-size: 24px;
 
  font-weight: 750;
 
  line-height: 1.3;
 
  @media (max-width: 600px) {
    font-size: 21px;
  }
`;
 
export const EventDescription = styled.p`
  margin: 0 0 18px;
 
  color: #777;
 
  font-size: 15px;
 
  line-height: 1.6;
 
  display: -webkit-box;
 
  -webkit-line-clamp: 3;
 
  -webkit-box-orient: vertical;
 
  overflow: hidden;
 
  @media (max-width: 600px) {
    font-size: 14px;
  }
`;
 
export const InfoList = styled.div`
  display: flex;
 
  flex-direction: column;
 
  gap: 12px;
`;
 
export const InfoItem = styled.div`
  display: flex;
 
  align-items: center;
 
  gap: 10px;
 
  color: #555;
 
  font-size: 14px;
 
  svg {
    flex-shrink: 0;
 
    color: ${COLORS.primary};
 
    font-size: 17px;
  }
 
  span {
    min-width: 0;
 
    overflow: hidden;
 
    text-overflow: ellipsis;
 
    white-space: nowrap;
  }
`;
 
/* =====================================================
   EVENT FOOTER
===================================================== */
 
export const EventFooter = styled.div`
  margin-top: auto;
 
  padding-top: 20px;
 
  display: flex;
  align-items: center;
 
  gap: 10px;
`;
 
export const AccessButton = styled.button`
  ${ButtonEffect}
 
  flex: 1;
 
  min-height: 47px;
 
  border: 2px solid ${COLORS.primary};
 
  border-radius: 9px;
 
  background: ${COLORS.primary};
 
  color: #fff;
 
  font-family: inherit;
 
  font-size: 14px;
 
  font-weight: 700;
 
  cursor: pointer;
 
  transition:
    color .25s ease,
    transform .25s cubic-bezier(.22,1,.36,1),
    box-shadow .25s ease;
 
  &::before {
    background: ${COLORS.yellow};
  }
 
  .buttonContent {
    position: relative;
 
    z-index: 2;
 
    width: 100%;
    height: 100%;
 
    display: flex;
 
    align-items: center;
    justify-content: center;
 
    gap: 8px;
  }
 
  &:hover {
    color: #111;
 
    transform: translateY(-2px);
 
    box-shadow:
      0 8px 18px rgba(131,22,20,.2);
  }
 
  &:hover svg {
    transform: translateX(5px);
  }
 
  svg {
    transition: .3s ease;
  }
 
  &:active {
    transform: scale(.97);
  }
 
  &:focus-visible {
    outline: 2px solid ${COLORS.yellow};
 
    outline-offset: 3px;
  }
`;
 
/* =====================================================
   ACTIONS
===================================================== */
export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
 
  button {
    position: relative;
 
    width: 40px;
    height: 40px;
 
    padding: 0;
 
    display: flex;
    align-items: center;
    justify-content: center;
 
    border: none;
    border-radius: 50%;
 
    background: transparent;
 
    color: #666;
 
    cursor: pointer;
 
    overflow: hidden;
    isolation: isolate;
 
    --mouse-x: 50%;
    --mouse-y: 50%;
 
    transition:
      color .25s ease,
      transform .25s cubic-bezier(.22,1,.36,1),
      box-shadow .25s ease;
 
    &::before {
      content: "";
 
      position: absolute;
 
      left: var(--mouse-x);
      top: var(--mouse-y);
 
      width: 12px;
      height: 12px;
 
      border-radius: 50%;
 
      background: ${COLORS.yellow};
 
      transform:
        translate(-50%, -50%)
        scale(0);
 
      transition:
        transform .55s cubic-bezier(.16,1,.3,1);
 
      z-index: -1;
 
      pointer-events: none;
    }
 
    svg {
      position: relative;
      z-index: 2;
 
      width: 18px;
      height: 18px;
 
      transition:
        transform .3s ease,
        color .25s ease;
    }
 
    &:hover {
      color: #111;
 
      transform: translateY(-2px);
 
      box-shadow:
        0 7px 16px rgba(0, 0, 0, .12);
 
      &::before {
        transform:
          translate(-50%, -50%)
          scale(4);
      }
 
      svg {
        transform: scale(1.12);
      }
    }
 
    &:active {
      transform: scale(.94);
    }
 
    &:focus-visible {
      outline: 2px solid ${COLORS.yellow};
      outline-offset: 3px;
    }
  }
 
  /* =====================================================
     EXCLUIR
  ===================================================== */
 
  button:last-child {
    &:hover {
      color: #fff;
 
      &::before {
        background: #000;
      }
 
      svg {
        transform: scale(1.12) rotate(-5deg);
      }
    }
  }
`;
 
/* =====================================================
   EMPTY STATE
===================================================== */
 
export const EmptyState = styled.div`
  grid-column: 1 / -1;
 
  min-height: 250px;
 
  display: flex;
  flex-direction: column;
 
  align-items: center;
  justify-content: center;
 
  padding: 35px 20px;
 
  text-align: center;
`;
 
export const EmptyIcon = styled.div`
  width: 62px;
  height: 62px;
 
  margin-bottom: 16px;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  border-radius: 50%;
 
  background: #fff5c9;
 
  border: 1px solid #e5ce73;
 
  color: #a27e00;
 
  font-size: 27px;
`;
 
export const EmptyTitle = styled.h2`
  margin: 0 0 6px;
 
  color: #333;
 
  font-size: 20px;
 
  font-weight: 750;
`;
 
export const EmptyText = styled.p`
  max-width: 400px;
 
  margin: 0;
 
  color: #777;
 
  font-size: 15px;
 
  line-height: 1.6;
`;
 
/* =====================================================
   FLOATING BUTTON
===================================================== */
 
export const FloatingButton = styled.button`
  ${ButtonEffect}
 
  position: fixed;
 
  right: 35px;
  bottom: 35px;
 
  width: 66px;
  height: 66px;
 
  border: none;
 
  border-radius: 50%;
 
  background: ${COLORS.yellow};
 
  color: #111;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  cursor: pointer;
 
  box-shadow:
    0 12px 28px rgba(0,0,0,.18);
 
  z-index: 100;
 
  transition:
    transform .25s ease,
    box-shadow .25s ease;
 
  &::before {
    background: ${COLORS.primary};
  }
 
  &:hover {
    color: ${COLORS.yellow};
 
    transform: translateY(-4px);
 
    box-shadow:
      0 18px 35px rgba(0,0,0,.22);
  }
 
  &:hover svg {
    transform: rotate(90deg);
  }
 
  svg {
    position: relative;
 
    z-index: 2;
 
    transition: .3s ease;
  }
 
  @media (max-width: 600px) {
    width: 58px;
    height: 58px;
 
    right: 20px;
    bottom: 20px;
  }
`;
 
/* =====================================================
   MODAL
===================================================== */
 
export const ModalOverlay = styled.div`
  position: fixed;
 
  inset: 0;
 
  z-index: 9999;
 
  padding: 20px;
 
  display: flex;
 
  align-items: center;
  justify-content: center;
 
  box-sizing: border-box;
 
  background: rgba(20,15,15,.58);
 
  backdrop-filter: blur(7px);
 
  overflow-y: auto;
`;
 
const modalAppear = keyframes`
  from {
    opacity: 0;
 
    transform:
      translateY(16px)
      scale(.97);
  }
 
  to {
    opacity: 1;
 
    transform:
      translateY(0)
      scale(1);
  }
`;
 
export const Modal = styled.div`
  width: 100%;
 
  max-width: 1100px;
 
  max-height: calc(100vh - 40px);
 
  overflow-y: auto;
 
  box-sizing: border-box;
 
  padding: 28px;
 
  background: #fff;
 
  border: 2px solid #d4d4d4;
 
  border-radius: 20px;
 
  box-shadow:
    0 30px 80px rgba(0,0,0,.28);
 
  animation:
    ${modalAppear}
    .25s cubic-bezier(.22,1,.36,1);
 
  @media (max-width: 600px) {
    padding: 20px 16px;
 
    border-radius: 17px;
 
    max-height: calc(100vh - 20px);
  }
`;
 
export const ModalHeader = styled.div`
  display: flex;
 
  align-items: flex-start;
  justify-content: space-between;
 
  gap: 15px;
 
  margin-bottom: 22px;
 
  padding-bottom: 19px;
 
  border-bottom: 2px solid #ddd;
`;
 
export const ModalTitle = styled.h2`
  margin: 0;
 
  color: ${COLORS.primary};
 
  font-size: 25px;
 
  font-weight: 750;
 
  line-height: 1.2;
 
  @media (max-width: 600px) {
    font-size: 20px;
  }
`;
 
export const CloseButton = styled.button`
  ${ButtonEffect}
 
  width: 34px;
  height: 34px;
 
  flex-shrink: 0;
 
  display: flex;
 
  align-items: center;
  justify-content: center;
 
  padding: 0;
 
  border: none;
 
  border-radius: 50%;
 
  background: transparent;
 
  color: #888;
 
  cursor: pointer;
 
  &::before {
    background: #eee;
 
    width: 10px;
    height: 10px;
  }
 
  svg {
    position: relative;
 
    z-index: 2;
 
    width: 19px;
    height: 19px;
 
    transition: .35s ease;
  }
 
  &:hover {
    color: #222;
 
    transform: translateY(-2px);
 
    box-shadow:
      0 6px 14px rgba(0,0,0,.12);
 
    &::before {
      transform:
        translate(-50%, -50%) scale(5);
    }
  }
 
  &:hover svg {
    transform: rotate(90deg);
  }
 
  &:focus-visible {
    outline: 2px solid ${COLORS.yellow};
 
    outline-offset: 2px;
  }
`;
 
/* =====================================================
   FORM
===================================================== */
 
export const Form = styled.form`
  display: flex;
 
  flex-direction: column;
 
  gap: 17px;
`;
 
export const FormSection = styled.section`
  width: 100%;
 
  margin-bottom: 18px;
 
  padding: 22px;
 
  box-sizing: border-box;
 
  background: #fff;
 
  border: 2px solid #d8d8d8;
 
  border-radius: 17px;
 
  @media (max-width: 600px) {
    padding: 17px 14px;
  }
`;
 
export const SectionTitle = styled.h3`
  margin: 0 0 18px;
 
  color: ${COLORS.primary};
 
  font-size: 17px;
 
  font-weight: 750;
`;
 
export const Label = styled.label`
  display: block;
 
  margin-bottom: 8px;
 
  color: #333;
 
  font-size: 15px;
 
  font-weight: 650;
`;
 
export const Input = styled.input`
  width: 100%;
 
  min-height: 50px;
 
  box-sizing: border-box;
 
  margin-bottom: 20px;
 
  padding: 0 14px;
 
  border: 1px solid #cfcfcf;
 
  border-radius: 10px;
 
  background: #f8f8f8;
 
  color: #222;
 
  font-family: inherit;
 
  font-size: 15px;
 
  outline: none;
 
  transition:
    border-color .2s ease,
    background .2s ease,
    box-shadow .2s ease;
 
  &::placeholder {
    color: #999;
  }
 
  &:focus {
    border-color: ${COLORS.yellowDark};
 
    background: #fff;
 
    box-shadow:
      0 0 0 3px rgba(255,219,83,.16);
  }
`;
 
export const TextArea = styled.textarea`
  width: 100%;
 
  min-height: 130px;
 
  margin-bottom: 20px;
 
  padding: 14px;
 
  resize: vertical;
 
  box-sizing: border-box;
 
  border: 1px solid #cfcfcf;
 
  border-radius: 10px;
 
  background: #f8f8f8;
 
  color: #222;
 
  font-family: inherit;
 
  font-size: 15px;
 
  outline: none;
 
  transition:
    border-color .2s ease,
    background .2s ease,
    box-shadow .2s ease;
 
  &:focus {
    border-color: ${COLORS.yellowDark};
 
    background: #fff;
 
    box-shadow:
      0 0 0 3px rgba(255,219,83,.16);
  }
`;
 
export const FormRow = styled.div`
  display: grid;
 
  grid-template-columns: 1fr 1fr;
 
  gap: 15px;
 
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
 
export const FormGroup = styled.div`
  display: flex;
 
  flex-direction: column;
 
  gap: 0;
`;
 
/* =====================================================
   IMAGE UPLOAD
===================================================== */
 
export const ImageUpload = styled.div`
  width: 100%;
`;
 
export const ImageUploadInput = styled.input`
  display: none;
`;
 
export const ImageUploadContent = styled.label`
  width: 100%;
 
  min-height: 190px;
 
  box-sizing: border-box;
 
  border: 2px dashed #d0d0d0;
 
  border-radius: 15px;
 
  background: #fafafa;
 
  display: flex;
 
  flex-direction: column;
 
  align-items: center;
  justify-content: center;
 
  gap: 12px;
 
  cursor: pointer;
 
  color: #aaa;
 
  position: relative;
 
  transition:
    border-color .25s ease,
    background .25s ease;
 
  &:hover {
    border-color: ${COLORS.yellowDark};
 
    background: #fffaf0;
  }
 
  & > svg {
    position: absolute;
 
    right: 18px;
    bottom: 18px;
 
    color: ${COLORS.yellowDark};
  }
`;
 
export const ImageUploadIcon = styled.div`
  width: 62px;
  height: 62px;
 
  border-radius: 50%;
 
  background: #fff5c9;
 
  display: flex;
 
  align-items: center;
  justify-content: center;
 
  color: #a27e00;
 
  font-size: 30px;
`;
 
export const ImageUploadText = styled.div`
  display: flex;
 
  flex-direction: column;
 
  align-items: center;
 
  gap: 4px;
 
  text-align: center;
 
  strong {
    color: #333;
 
    font-size: 15px;
  }
 
  span,
  small {
    color: #999;
 
    font-size: 12px;
  }
`;
 
export const ImagePreview = styled.div`
  position: relative;
 
  width: 100%;
 
  height: 230px;
 
  border-radius: 15px;
 
  overflow: hidden;
 
  background: #f5f5f5;
 
  img {
    width: 100%;
    height: 100%;
 
    object-fit: cover;
  }
`;
 
export const RemoveImageButton = styled.button`
  position: absolute;
 
  top: 12px;
  right: 12px;
 
  width: 40px;
  height: 40px;
 
  border: none;
 
  border-radius: 50%;
 
  background: rgba(0,0,0,.75);
 
  color: #fff;
 
  display: flex;
 
  align-items: center;
  justify-content: center;
 
  cursor: pointer;
 
  transition:
    background .2s ease,
    transform .2s ease;
 
  &:hover {
    background: ${COLORS.danger};
 
    transform: scale(1.08);
  }
`;
 
/* =====================================================
   PARTICIPANTS
===================================================== */
 
export const ParticipantsBox = styled.div`
  min-height: 75px;
 
  padding: 15px;
 
  border: 1px dashed #cfcfcf;
 
  border-radius: 11px;
 
  background: #fafafa;
 
  display: flex;
 
  flex-direction: column;
 
  gap: 8px;
`;
 
export const ParticipantsText = styled.div`
  display: flex;
 
  flex-direction: column;
 
  gap: 3px;
 
  strong {
    color: #333;
 
    font-size: 13px;
  }
 
  span {
    color: #999;
 
    font-size: 11px;
  }
`;
 
export const FormFooter = styled.div`
  display: flex;
 
  justify-content: flex-end;
 
  padding: 20px;
 
  background: #fff;
 
  border: 2px solid #d8d8d8;
 
  border-radius: 17px;
`;
 
/* =====================================================
   SAVE
===================================================== */
 
export const SaveButton = styled.button`
  ${ButtonEffect}
 
  min-height: 47px;
 
  padding: 0 21px;
 
  border: none;
 
  border-radius: 9px;
 
  background: ${COLORS.primary};
 
  color: #fff;
 
  font-family: inherit;
 
  font-size: 15px;
 
  font-weight: 700;
 
  cursor: pointer;
 
  transition:
    color .25s ease,
    transform .25s cubic-bezier(.22,1,.36,1),
    box-shadow .25s ease;
 
  &:hover {
    color: #111;
 
    transform: translateY(-2px);
 
    box-shadow:
      0 8px 18px rgba(131,22,20,.2);
  }
 
  &:active {
    transform: scale(.97);
  }
 
  &:focus-visible {
    outline: 2px solid ${COLORS.yellow};
 
    outline-offset: 2px;
  }
`;
 
/* =====================================================
   CARD DE AVISO
   MESMA INTERFACE DO MODAL "SAIR DA CONTA?" DO PERFIL
   (usado em: "Não é possível remover poetas que já
   possuem notas neste evento")
===================================================== */
 
const avisoOverlayAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(12px);
  }
 
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
 
const avisoModalAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(25px);
  }
 
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;
 
export const AvisoOverlay = styled.div`
  position: fixed;
 
  inset: 0;
 
  width: 100%;
  height: 100%;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  padding: 25px;
 
  box-sizing: border-box;
 
  background: rgba(87, 17, 17, 0.4);
 
  backdrop-filter: blur(7px);
 
  /* Acima de todos os outros modais da página */
  z-index: 10000;
 
  overflow-y: auto;
 
  animation: ${avisoOverlayAppear} 0.2s ease both;
`;
 
export const AvisoModal = styled.div`
  position: relative;
 
  width: 500px;
  max-width: 100%;
 
  padding: 40px;
 
  box-sizing: border-box;
 
  background: ${COLORS.white};
 
  border-radius: 28px;
 
  text-align: center;
 
  box-shadow:
    8px 8px 0 ${COLORS.primary},
    0 25px 65px rgba(0, 0, 0, 0.24);
 
  animation: ${avisoModalAppear} 0.25s ease both;
 
  overflow: hidden;
 
  &::before {
    content: "";
 
    position: absolute;
 
    width: 160px;
    height: 160px;
 
    top: -85px;
    right: -65px;
 
    border-radius: 50%;
 
    background: ${COLORS.yellow};
  }
 
  h3 {
    position: relative;
 
    margin: 20px 0 11px;
 
    color: ${COLORS.primary};
 
    font-size: 1.6rem;
 
    font-weight: 900;
  }
 
  p {
    position: relative;
 
    margin: 0 auto 30px;
 
    max-width: 380px;
 
    color: ${COLORS.gray};
 
    font-size: 0.95rem;
 
    line-height: 1.55;
 
    strong {
      display: block;
 
      margin-top: 8px;
 
      color: #252525;
 
      font-weight: 800;
 
      word-break: break-word;
    }
  }
 
  @media (max-width: 500px) {
    padding: 30px 20px;
 
    border-radius: 22px;
 
    h3 {
      font-size: 1.35rem;
    }
 
    p {
      font-size: 0.85rem;
    }
  }
`;
 
export const AvisoIcon = styled.div`
  position: relative;
 
  width: 70px;
  height: 70px;
 
  margin: 0 auto;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  border-radius: 50%;
 
  background: ${COLORS.cream};
 
  color: ${COLORS.primary};
 
  border: 2px solid ${COLORS.yellow};
 
  svg {
    font-size: 25px;
  }
`;
 
export const AvisoButton = styled.button`
  position: relative;
 
  width: 100%;
  height: 60px;
 
  border: 0;
 
  border-radius: 15px;
 
  background: ${COLORS.primary};
 
  color: ${COLORS.white};
 
  font-family: "Poppins", sans-serif;
 
  font-size: 0.98rem;
 
  font-weight: 700;
 
  cursor: pointer;
 
  overflow: hidden;
 
  isolation: isolate;
 
  transition:
    transform 0.25s ease,
    color 0.3s ease,
    box-shadow 0.3s ease;
 
  &::before {
    content: "";
 
    position: absolute;
 
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
 
    width: 30px;
    height: 30px;
 
    border-radius: 50%;
 
    background: ${COLORS.yellow};
 
    transform:
      translate(-50%, -50%)
      scale(0);
 
    z-index: 0;
 
    pointer-events: none;
 
    transition:
      transform 0.55s
      cubic-bezier(0.16, 1, 0.3, 1);
  }
 
  .buttonContent {
    position: relative;
 
    z-index: 2;
 
    display: flex;
    align-items: center;
    justify-content: center;
 
    gap: 9px;
  }
 
  &:hover {
    color: #010000;
 
    transform: translateY(-2px);
 
    box-shadow:
      0 9px 22px rgba(131, 22, 20, 0.2);
  }
 
  &:hover::before {
    transform:
      translate(-50%, -50%)
      scale(10);
  }
 
  &:active {
    transform: scale(0.97);
  }
 
  &:focus-visible {
    outline: 2px solid ${COLORS.yellow};
 
    outline-offset: 3px;
  }
`;
 
export const AvisoActions = styled.div`
  position: relative;
 
  display: grid;
 
  grid-template-columns: 1fr 1fr;
 
  gap: 14px;
 
  width: 100%;
 
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;
 
export const AvisoCancelButton = styled.button`
  position: relative;
 
  width: 100%;
  height: 60px;
 
  border: 2px solid ${COLORS.yellow};
 
  border-radius: 15px;
 
  background: ${COLORS.white};
 
  color: #010000;
 
  font-family: "Poppins", sans-serif;
 
  font-size: 0.98rem;
 
  font-weight: 700;
 
  cursor: pointer;
 
  overflow: hidden;
 
  isolation: isolate;
 
  transition:
    transform 0.25s ease,
    color 0.3s ease;
 
  &::before {
    content: "";
 
    position: absolute;
 
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
 
    width: 30px;
    height: 30px;
 
    border-radius: 50%;
 
    background: ${COLORS.yellow};
 
    transform:
      translate(-50%, -50%)
      scale(0);
 
    z-index: 0;
 
    pointer-events: none;
 
    transition:
      transform 0.55s
      cubic-bezier(0.16, 1, 0.3, 1);
  }
 
  .buttonContent {
    position: relative;
 
    z-index: 2;
 
    display: flex;
    align-items: center;
    justify-content: center;
 
    gap: 9px;
  }
 
  &:hover {
    transform: translateY(-2px);
  }
 
  &:hover::before {
    transform:
      translate(-50%, -50%)
      scale(10);
  }
 
  &:active {
    transform: scale(0.97);
  }
 
  &:focus-visible {
    outline: 2px solid ${COLORS.primary};
 
    outline-offset: 3px;
  }
`;
 
export const AvisoConfirmButton = styled(AvisoButton)``;
 
/* =====================================================
   RANKING
===================================================== */
 
export const RankingSection = styled.section`
  width: 100%;
 
  margin-top: 18px;
 
  padding: 25px;
 
  box-sizing: border-box;
 
  background: #fff;
 
  border: 2px solid #d8d8d8;
 
  border-radius: 17px;
 
  box-shadow:
    0 10px 28px rgba(0,0,0,.06);
 
  @media (max-width: 600px) {
    padding: 18px 14px;
  }
`;
 
export const RankingHeader = styled.div`
  margin-bottom: 20px;
 
  padding-bottom: 19px;
 
  border-bottom: 2px solid #ddd;
`;
 
export const RankingTitle = styled.h3`
  margin: 0;
 
  display: flex;
 
  align-items: center;
 
  gap: 9px;
 
  color: #252525;
 
  font-size: 21px;
 
  font-weight: 750;
 
  svg {
    color: #a27e00;
  }
`;
 
export const RankingDescription = styled.p`
  margin: 7px 0 0;
 
  color: #777;
 
  font-size: 13px;
 
  line-height: 1.5;
`;
 
export const RankingTableWrapper = styled.div`
  width: 100%;
 
  overflow-x: auto;
 
  border: 1px solid #d8d8d8;
 
  border-radius: 13px;
 
  scrollbar-width: thin;
 
  scrollbar-color:
    #ffdb53
    #e2e2e2;
 
  &::-webkit-scrollbar {
    height: 9px;
  }
 
  &::-webkit-scrollbar-track {
    background: #e8e8e8;
  }
 
  &::-webkit-scrollbar-thumb {
    background: #ffdb53;
 
    border-radius: 20px;
  }
`;
 
export const RankingTable = styled.table`
  width: 100%;
 
  min-width: 1150px;
 
  border-collapse: collapse;
 
  font-family: inherit;
 
  thead {
    background: ${COLORS.yellow};
  }
 
  th {
    height: 60px;
 
    padding: 0 20px;
 
    color: #111;
 
    font-size: 12px;
 
    font-weight: 750;
 
    text-align: center;
 
    text-transform: uppercase;
 
    letter-spacing: .5px;
 
    white-space: nowrap;
  }
 
  th:nth-child(2),
  td:nth-child(2) {
    text-align: left;
 
    min-width: 190px;
  }
 
  td {
    height: 72px;
 
    padding: 10px 20px;
 
    color: #444;
 
    font-size: 13px;
 
    text-align: center;
 
    white-space: nowrap;
 
    border-bottom: 1px solid #ddd;
 
    vertical-align: middle;
  }
 
  tbody tr {
    background: #fff;
 
    transition:
      background .2s ease;
  }
 
  tbody tr:nth-child(even) {
    background: #f8f8f8;
  }
 
  tbody tr:hover {
    background: #fff8dc;
  }
 
  tbody tr:last-child td {
    border-bottom: none;
  }
 
  @media (max-width: 900px) {
    th {
      height: 56px;
 
      padding: 0 15px;
 
      font-size: 11px;
    }
 
    td {
      height: 65px;
 
      padding: 9px 15px;
 
      font-size: 12px;
    }
  }
 
  @media (max-width: 600px) {
    min-width: 1050px;
 
    th {
      height: 52px;
 
      padding: 0 13px;
 
      font-size: 10px;
    }
 
    td {
      height: 60px;
 
      padding: 8px 13px;
 
      font-size: 11px;
    }
  }
`;
 
export const RankingRow = styled.tr`
  background:
    ${({ $primeiro }) =>
      $primeiro
        ? "rgba(255,219,83,.13)"
        : "#fff"};
 
  td {
    ${({ $primeiro }) =>
      $primeiro &&
      "font-weight: 600;"}
  }
`;
 
export const Position = styled.div`
  min-width: 50px;
 
  display: flex;
 
  align-items: center;
  justify-content: center;
 
  gap: 4px;
 
  color: #222;
 
  font-weight: 700;
 
  svg {
    color: #a27e00;
  }
`;
 
export const ParticipantName = styled.span`
  display: block;
 
  max-width: 210px;
 
  overflow: hidden;
 
  text-overflow: ellipsis;
 
  white-space: nowrap;
 
  color: #222;
 
  font-size: 13px;
 
  font-weight: 700;
`;
 
export const Score = styled.span`
  display: inline-flex;
 
  align-items: center;
  justify-content: center;
 
  min-width: 38px;
 
  height: 30px;
 
  padding: 0 6px;
 
  border-radius: 7px;
 
  background: #f0f0f0;
 
  color: #333;
 
  font-size: 11px;
 
  font-weight: 650;
`;
 
export const Average = styled.span`
  color: #222;
 
  font-weight: 700;
`;
 
export const Penalty = styled.span`
  color:
    ${({ $penalidade }) =>
      $penalidade
        ? COLORS.danger
        : "#3a9d5d"};
 
  font-weight: 700;
`;
 
export const Time = styled.span`
  display: inline-flex;
 
  align-items: center;
 
  gap: 5px;
 
  color: #555;
 
  font-weight: 600;
 
  svg {
    color: #777;
  }
`;
 
export const FinalScore = styled.span`
  display: inline-flex;
 
  align-items: center;
  justify-content: center;
 
  min-width: 60px;
 
  min-height: 32px;
 
  padding: 0 9px;
 
  border-radius: 7px;
 
  background: ${COLORS.primary};
 
  color: ${COLORS.yellow};
 
  font-weight: 700;
`;
 
export const RankingEmpty = styled.div`
  min-height: 180px;
 
  padding: 30px;
 
  box-sizing: border-box;
 
  border: 1px dashed #cfcfcf;
 
  border-radius: 14px;
 
  background: #fafafa;
 
  display: flex;
 
  flex-direction: column;
 
  align-items: center;
  justify-content: center;
 
  text-align: center;
 
  gap: 7px;
 
  color: #999;
 
  svg {
    color: #a27e00;
 
    font-size: 28px;
  }
 
  strong {
    color: #444;
 
    font-size: 14px;
  }
 
  span {
    max-width: 400px;
 
    color: #999;
 
    font-size: 12px;
 
    line-height: 1.5;
  }
`;

