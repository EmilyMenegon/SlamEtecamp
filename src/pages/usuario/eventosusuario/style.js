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
};

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
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
    pointer-events: none;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(15);
  }
`;

/* PAGE */

export const Page = styled.div`
  min-height: 100vh;
  width: 100%;
  background: #fff;
  color: ${COLORS.text};
  font-family: "Poppins", sans-serif;
  box-sizing: border-box;
  overflow-x: hidden;
`;

/* CONTENT */

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

/* HEADER */

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

/* YEARS */

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
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s ease,
    opacity 0.2s ease;

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
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
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
    box-shadow: 0 8px 18px rgba(131, 22, 20, 0.2);

    &::before {
      transform: translate(-50%, -50%) scale(8);
    }
  }

  &:active:not(:disabled) {
    transform: scale(0.94);
  }

  &:disabled {
    opacity: 0.25;
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
  border: 2px solid ${({ $active }) => ($active ? COLORS.primary : "#eee")};
  border-radius: 22px;
  background: ${({ $active }) => ($active ? COLORS.primary : "#fff")};
  color: ${({ $active }) => ($active ? "#fff" : "#111")};
  font-family: inherit;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.25s ease,
    background 0.25s ease,
    box-shadow 0.3s ease;

  &::before {
    content: "";
    position: absolute;
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
    width: 35px;
    height: 35px;
    border-radius: 50%;
    background: ${COLORS.yellow};
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.65s cubic-bezier(0.16, 1, 0.3, 1);
    z-index: -1;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-8px);
    border-color: ${COLORS.primary};
    box-shadow: 0 18px 35px rgba(131, 22, 20, 0.16);

    &::before {
      transform: translate(-50%, -50%) scale(11);
    }
  }

  &:active {
    transform: translateY(-3px) scale(0.98);
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
  background: ${({ $active }) =>
    $active ? COLORS.yellow : "rgba(255,219,83,.22)"};
  color: ${COLORS.primary};
  font-size: 23px;
  transition:
    transform 0.3s ease,
    background 0.25s ease;

  ${YearCard}:hover & {
    transform: scale(1.12) rotate(2deg);
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
  color: ${({ $active }) => ($active ? "#fff" : COLORS.primary)};
  font-size: 2.1rem;
  font-weight: 850;
  line-height: 1;
  transition:
    color 0.25s ease,
    transform 0.3s ease;

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
  color: ${({ $active }) => ($active ? "rgba(255,255,255,.72)" : "#999")};
  font-size: 10px;
  font-weight: 500;
  line-height: 1.2;
  text-align: center;
  white-space: nowrap;
  transition: color 0.25s ease;

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

/* BLOCOS DA PÁGINA */

export const Bloco = styled.section`
  width: 100%;
  margin-bottom: 28px;
  padding: 28px 30px 32px;
  box-sizing: border-box;
  background: #fff;
  border: 2px solid #d2d2d2;
  border-radius: 20px;
  box-shadow:
    0 18px 45px rgba(0, 0, 0, 0.1),
    0 3px 8px rgba(0, 0, 0, 0.045);

  @media (max-width: 900px) {
    padding: 24px 21px 28px;
  }

  @media (max-width: 600px) {
    margin-bottom: 20px;
    padding: 19px 14px 22px;
    border-radius: 16px;
  }
`;

export const BlocoInterno = styled(Bloco)`
  margin-bottom: 20px;
  padding: 22px 24px 26px;
  box-shadow: 0 8px 22px rgba(0, 0, 0, 0.06);

  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 600px) {
    padding: 16px 13px 18px;
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

export const BlocoContador = styled.span`
  margin-left: auto;
  flex-shrink: 0;
  min-height: 34px;
  padding: 0 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #fff5c9;
  border: 1px solid #e5ce73;
  color: #735c00;
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;

  @media (max-width: 600px) {
    min-height: 28px;
    padding: 0 10px;
    font-size: 12px;
  }
`;

export const ErrorText = styled.div`
  width: 100%;
  max-width: 700px;
  margin: 0 auto 20px;
  padding: 15px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: #fff0f0;
  border: 1px solid #e7bcbc;
  border-radius: 10px;
  color: ${COLORS.danger};
  font-size: 15px;
  text-align: center;
`;

/* EVENTOS */

export const Cards = styled.section`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
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
    0 12px 32px rgba(0, 0, 0, 0.09),
    0 3px 8px rgba(0, 0, 0, 0.04);
  transition:
    transform 0.3s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.3s ease,
    border-color 0.25s ease;

  &:hover {
    transform: translateY(-8px);
    border-color: #cfcfcf;
    box-shadow:
      0 22px 45px rgba(0, 0, 0, 0.14),
      0 5px 12px rgba(0, 0, 0, 0.05);
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
  flex-shrink: 0;
  overflow: hidden;
  background: #eee;

  img {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform 0.5s ease;
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
  margin-bottom: ${({ $grande }) => ($grande ? "22px" : "0")};
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ $grande }) => ($grande ? "14px" : "0")};
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
  box-sizing: border-box;

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
  word-break: break-word;

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

/* EVENT FOOTER */

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
    color 0.25s ease,
    transform 0.25s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.25s ease;

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
    box-shadow: 0 8px 18px rgba(131, 22, 20, 0.2);
  }

  &:hover svg {
    transform: translateX(5px);
  }

  svg {
    transition: 0.3s ease;
  }

  &:active {
    transform: scale(0.97);
  }

  &:focus-visible {
    outline: 2px solid ${COLORS.yellow};
    outline-offset: 3px;
  }
`;

/* EMPTY STATE */

export const EmptyState = styled.div`
  grid-column: 1 / -1;
  min-height: 250px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 35px 20px;
  box-sizing: border-box;
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

/* MODAL */

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  padding: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: rgba(20, 15, 15, 0.58);
  backdrop-filter: blur(7px);
  overflow-y: auto;
`;

const modalAppear = keyframes`
  from {
    opacity: 0;
    transform: translateY(16px) scale(.97);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
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
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.28);
  animation: ${modalAppear} 0.25s cubic-bezier(0.22, 1, 0.36, 1);

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
    transition: 0.35s ease;
  }

  &:hover {
    color: #222;
    transform: translateY(-2px);
    box-shadow: 0 6px 14px rgba(0, 0, 0, 0.12);

    &::before {
      transform: translate(-50%, -50%) scale(5);
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

export const ModalImage = styled.div`
  width: 100%;
  height: 280px;
  margin-bottom: 22px;
  border-radius: 14px;
  overflow: hidden;
  background: #eee;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }

  @media (max-width: 500px) {
    height: 210px;
  }
`;

export const ModalEventTitle = styled.h3`
  margin: 0 0 12px;
  color: #252525;
  font-size: clamp(1.6rem, 4vw, 2.2rem);
  line-height: 1.2;
  font-weight: 800;
  word-break: break-word;
`;

export const ModalDescription = styled.p`
  margin: 0 0 20px;
  color: #666;
  font-size: 15px;
  line-height: 1.6;
  white-space: pre-wrap;
  word-break: break-word;
`;

export const ModalInfoList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
`;

export const ModalInfoItem = styled.div`
  min-width: 0;
  padding: 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  border-radius: 12px;
  background: #f8f8f8;
  border: 1px solid #d8d8d8;

  & > svg {
    flex-shrink: 0;
    width: 20px;
    height: 20px;
    color: ${COLORS.primary};
  }

  div {
    min-width: 0;
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  strong {
    color: #333;
    font-size: 13px;
    font-weight: 650;
  }

  span {
    color: #666;
    font-size: 14px;
    word-break: break-word;
  }
`;

/* RANKING */

export const RankingTableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
  border: 1px solid #d8d8d8;
  border-radius: 13px;
  scrollbar-width: thin;
  scrollbar-color: #ffdb53 #e2e2e2;

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
    letter-spacing: 0.5px;
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
    transition: background 0.2s ease;
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
  background: ${({ $primeiro }) =>
    $primeiro ? "rgba(255,219,83,.13)" : "#fff"};

  td {
    ${({ $primeiro }) => $primeiro && "font-weight: 600;"}
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
  color: ${({ $penalidade }) => ($penalidade ? COLORS.danger : "#3a9d5d")};
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

/* CRITÉRIOS DE AVALIAÇÃO */

export const CriteriaBox = styled.section`
  width: 100%;
  margin-top: 24px;
  padding: 24px;
  box-sizing: border-box;
  border: 1px solid #e5ce73;
  border-radius: 15px;
  background: #fffdf4;

  @media (max-width: 600px) {
    padding: 17px 14px;
    margin-top: 19px;
  }
`;

export const CriteriaHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 13px;
  margin-bottom: 20px;

  ${BlocoIcone} {
    flex-shrink: 0;
  }

  @media (max-width: 600px) {
    align-items: flex-start;
    gap: 10px;
    margin-bottom: 16px;
  }
`;

export const CriteriaTitle = styled.h3`
  margin: 0 0 4px;
  color: #831614;
  font-size: 20px;
  font-weight: 800;

  @media (max-width: 600px) {
    font-size: 17px;
  }
`;

export const CriteriaDescription = styled.p`
  margin: 0;
  color: #777;
  font-size: 13px;
  line-height: 1.5;

  @media (max-width: 600px) {
    font-size: 12px;
  }
`;

export const CriteriaGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px;

  @media (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

export const CriteriaItem = styled.article`
  min-width: 0;
  padding: 15px 16px;
  border: 1px solid #eadfae;
  border-radius: 11px;
  background: #fff;

  @media (max-width: 600px) {
    padding: 13px;
  }
`;

export const CriteriaItemTitle = styled.h4`
  margin: 0 0 6px;
  color: #333;
  font-size: 14px;
  font-weight: 750;
`;

export const CriteriaItemText = styled.p`
  margin: 0;
  color: #666;
  font-size: 13px;
  line-height: 1.6;
`;

export const CriteriaHighlight = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  margin-top: 15px;
  padding: 13px 15px;
  border-radius: 10px;
  background: #fff3c2;
  color: #5f4b00;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.55;

  svg {
    flex-shrink: 0;
    margin-top: 2px;
    color: #831614;
    font-size: 17px;
  }

  @media (max-width: 600px) {
    padding: 12px;
    font-size: 12px;
  }
`;