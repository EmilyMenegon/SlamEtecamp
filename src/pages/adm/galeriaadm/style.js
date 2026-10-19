
import styled, { css, keyframes } from "styled-components";
 
const COLORS = {
  primary: "#831614",
  primaryDark: "#65100f",
  yellow: "#ffdb53",
  yellowDark: "#e3b900",
  danger: "#d62828",
  cream: "#fff7d0",
  gray: "#666666",
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
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: #831614;
    transform: translate(-50%, -50%) scale(0);
    transition: transform 0.5s cubic-bezier(.16, 1, .3, 1);
    z-index: 0;
    pointer-events: none;
  }
 
  &:hover::before {
    transform: translate(-50%, -50%) scale(18);
  }
 
  svg,
  span {
    position: relative;
    z-index: 2;
  }
`;
 
/* =====================================================
   PÁGINA
===================================================== */
 
export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  background: #fff;
  font-family: "Poppins", sans-serif;
  color: #1c1c1c;
  overflow-x: hidden;
  box-sizing: border-box;
`;
 
export const Content = styled.main`
  width: min(97%, 1650px);
  margin: 35px auto 120px;
  box-sizing: border-box;
 
  @media (max-width: 1100px) {
    width: 96%;
    margin-top: 30px;
  }
 
  @media (max-width: 700px) {
    width: 94%;
    margin: 22px auto 100px;
  }
`;
 
export const Header = styled.header`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin-bottom: 25px;
 
  @media (max-width: 600px) {
    margin-bottom: 20px;
  }
`;
 
export const Title = styled.h1`
  margin: 0 0 10px;
  color: #831614;
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
   BLOCOS (mesma interface da página de Inscrições)
===================================================== */
 
export const Bloco = styled.section`
  width: 100%;
  margin-bottom: 28px;
  padding: 28px 30px 32px;
  box-sizing: border-box;
  background: #fff;
  border: 2px solid #d2d2d2;
  border-radius: 20px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, .10), 0 3px 8px rgba(0, 0, 0, .045);
 
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
  color: ${COLORS.primary};
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
  background: ${({ $cheio }) => ($cheio ? "#fff0f0" : "#fff5c9")};
  border: 1px solid ${({ $cheio }) => ($cheio ? "#e7bcbc" : "#e5ce73")};
  color: ${({ $cheio }) => ($cheio ? COLORS.danger : "#735c00")};
  font-size: 14px;
  font-weight: 700;
  white-space: nowrap;
 
  @media (max-width: 600px) {
    min-height: 28px;
    padding: 0 10px;
    font-size: 12px;
  }
`;
 
/* =====================================================
   GRADES E CARDS
===================================================== */
 
export const Gallery = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 30px;
  align-items: stretch;
 
  @media (max-width: 1000px) {
    grid-template-columns: repeat(3, 1fr);
    gap: 24px;
  }
 
  @media (max-width: 750px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 20px;
  }
 
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
    gap: 20px;
  }
`;
 
export const FixedGallery = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 20px;
  align-items: stretch;
 
  @media (max-width: 1100px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
 
  @media (max-width: 750px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 14px;
  }
 
  @media (max-width: 500px) {
    grid-template-columns: 1fr;
  }
`;
 
export const Card = styled.article`
  position: relative;
  width: 100%;
  background: #fff;
  border-radius: 18px;
  overflow: hidden;
  cursor: pointer;
  box-shadow: 0 7px 25px rgba(0, 0, 0, .08);
  transition: transform .3s ease, box-shadow .3s ease;
  aspect-ratio: 4 / 3;
 
  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 18px 40px rgba(0, 0, 0, .15);
  }
 
  &:active {
    transform: translateY(-3px);
  }
`;
 
export const ImageBox = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background: #eee;
 
  img,
  video {
    width: 100%;
    height: 100%;
    display: block;
    object-fit: cover;
    transition: transform .5s ease;
  }
 
  video {
    background: #000;
  }
 
  &:hover img,
  &:hover video {
    transform: scale(1.07);
  }
`;
 
export const PinBadge = styled.span`
  position: absolute;
  top: 12px;
  left: 12px;
  min-height: 28px;
  padding: 0 11px 0 9px;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  border-radius: 999px;
  background: rgba(255, 219, 83, .96);
  color: #5e4900;
  font-size: 12px;
  font-weight: 700;
  box-shadow: 0 4px 12px rgba(0, 0, 0, .18);
  pointer-events: none;
  z-index: 5;
 
  svg {
    width: 13px;
    height: 13px;
  }
`;
 
export const SlotVazio = styled.button`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  padding: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  box-sizing: border-box;
  border: 2px dashed #d5d5d5;
  border-radius: 18px;
  background: #fafafa;
  color: #999;
  font-family: inherit;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition: transform .3s cubic-bezier(.22, 1, .36, 1), border-color .25s ease, color .25s ease, box-shadow .3s ease;
 
  &::before {
    content: "";
    position: absolute;
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: ${COLORS.yellow};
    transform: translate(-50%, -50%) scale(0);
    transition: transform .65s cubic-bezier(.16, 1, .3, 1);
    z-index: -1;
    pointer-events: none;
  }
 
  svg {
    width: 26px;
    height: 26px;
  }
 
  &:hover {
    transform: translateY(-6px);
    border-color: ${COLORS.yellowDark};
    color: #111;
    box-shadow: 0 14px 28px rgba(131, 22, 20, .14);
 
    &::before {
      transform: translate(-50%, -50%) scale(12);
    }
  }
 
  &:active {
    transform: translateY(-2px) scale(.98);
  }
 
  &:focus-visible {
    outline: 3px solid ${COLORS.yellow};
    outline-offset: 3px;
  }
`;
 
export const DeleteButton = styled.button`
  ${ButtonEffect}
  position: absolute;
  top: 14px;
  right: 14px;
  width: 42px;
  height: 42px;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(214, 40, 40, .95);
  color: #fff;
  cursor: pointer;
  opacity: 0;
  transform: scale(.85);
  box-shadow: 0 6px 15px rgba(0, 0, 0, .2);
  transition: opacity .2s ease, transform .2s ease, box-shadow .2s ease;
  z-index: 5;
 
  svg {
    width: 20px;
    height: 20px;
  }
 
  ${Card}:hover & {
    opacity: 1;
    transform: scale(1);
  }
 
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 10px 25px rgba(0, 0, 0, .3);
  }
 
  &:active {
    transform: scale(.95);
  }
 
  @media (max-width: 700px) {
    opacity: 1;
    transform: scale(1);
  }
`;
 
export const EmptyState = styled.div`
  grid-column: 1 / -1;
  min-height: 250px;
  padding: 35px 20px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  border: 2px dashed #ddd;
  border-radius: 15px;
  background: #fafafa;
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
 
export const EmptyTitle = styled.h3`
  margin: 0 0 6px;
  color: #333;
  font-size: 20px;
  font-weight: 750;
`;
 
export const EmptyText = styled.p`
  max-width: 450px;
  margin: 0;
  color: #777;
  font-size: 15px;
  line-height: 1.6;
`;
 
/* =====================================================
   BOTÃO FLUTUANTE + MENU DE ADICIONAR
===================================================== */
 
export const FloatingButton = styled.button`
  ${ButtonEffect}
  position: fixed;
  right: 35px;
  bottom: 35px;
  width: 70px;
  height: 70px;
  padding: 0;
  border: none;
  border-radius: 50%;
  background: #ffdb53;
  color: #111;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 10px 25px rgba(0, 0, 0, .20);
  transition: transform .25s ease, box-shadow .25s ease, color .25s ease, background .25s ease;
  z-index: 100;
 
  .buttonContent {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
 
  svg {
    width: 30px;
    height: 30px;
    transform: rotate(${({ $open }) => ($open ? "45deg" : "0deg")});
    transition: transform .3s ease;
  }
 
  &:hover {
    color: #ffdb53;
    background: #831614;
    transform: translateY(-4px);
    box-shadow: 0 15px 30px rgba(0, 0, 0, .28);
  }
 
  &:hover svg {
    transform: rotate(${({ $open }) => ($open ? "135deg" : "90deg")});
  }
 
  &:active {
    transform: translateY(1px) scale(.96);
  }
 
  &:disabled {
    cursor: not-allowed;
    opacity: .6;
    transform: none;
  }
 
  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
    right: 20px;
    bottom: 20px;
 
    svg {
      width: 27px;
      height: 27px;
    }
  }
`;
 
export const AddMenuBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 98;
  background: transparent;
`;
 
export const AddMenu = styled.div`
  position: fixed;
  right: 35px;
  bottom: 120px;
  width: 340px;
  max-width: calc(100vw - 40px);
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 6px;
  box-sizing: border-box;
  background: #fff;
  border: 2px solid #d2d2d2;
  border-radius: 18px;
  box-shadow: 0 18px 45px rgba(0, 0, 0, .18), 0 3px 8px rgba(0, 0, 0, .06);
  transform-origin: bottom right;
  animation: menuAparecer .22s cubic-bezier(.22, 1, .36, 1);
  z-index: 99;
 
  @keyframes menuAparecer {
    from {
      opacity: 0;
      transform: translateY(10px) scale(.96);
    }
 
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }
 
  @media (max-width: 600px) {
    right: 20px;
    bottom: 100px;
  }
`;
 
export const AddMenuIcon = styled.div`
  width: 42px;
  height: 42px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 11px;
  background: #fff5c9;
  border: 1px solid #e5ce73;
  color: ${COLORS.primary};
  font-size: 19px;
  transition: background .25s ease;
`;
 
export const AddMenuText = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 3px;
  text-align: left;
 
  strong {
    color: #252525;
    font-size: 15px;
    font-weight: 700;
    line-height: 1.25;
  }
 
  small {
    color: #777;
    font-size: 12.5px;
    line-height: 1.4;
  }
`;
 
export const AddMenuItem = styled.button`
  position: relative;
  width: 100%;
  padding: 11px 12px;
  display: flex;
  align-items: center;
  gap: 12px;
  box-sizing: border-box;
  border: none;
  border-radius: 12px;
  background: #fff;
  font-family: inherit;
  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transition: transform .25s cubic-bezier(.22, 1, .36, 1), box-shadow .25s ease;
 
  &::before {
    content: "";
    position: absolute;
    left: var(--mouse-x, 50%);
    top: var(--mouse-y, 50%);
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: ${COLORS.yellow};
    transform: translate(-50%, -50%) scale(0);
    transition: transform .6s cubic-bezier(.16, 1, .3, 1);
    z-index: -1;
    pointer-events: none;
  }
 
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(131, 22, 20, .14);
 
    &::before {
      transform: translate(-50%, -50%) scale(18);
    }
 
    ${AddMenuIcon} {
      background: #fff;
    }
  }
 
  &:active:not(:disabled) {
    transform: scale(.98);
  }
 
  &:focus-visible {
    outline: 2px solid ${COLORS.yellowDark};
    outline-offset: 2px;
  }
 
  &:disabled {
    opacity: .45;
    cursor: not-allowed;
  }
`;
 
/* =====================================================
   VISUALIZADOR
===================================================== */
 
export const Modal = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  padding: 20px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, .88);
  backdrop-filter: blur(5px);
  animation: fadeIn .2s ease;
 
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
 
  @media (max-width: 600px) {
    padding: 12px;
  }
`;
 
export const ModalContent = styled.div`
  position: relative;
  max-width: 95vw;
  max-height: 95vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  animation: zoomIn .25s ease;
 
  @keyframes zoomIn {
    from {
      opacity: 0;
      transform: scale(.9);
    }
 
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`;
 
export const ModalImage = styled.img`
  display: block;
  max-width: 90vw;
  max-height: 88vh;
  width: auto;
  height: auto;
  object-fit: contain;
  border-radius: 15px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, .4);
 
  @media (max-width: 600px) {
    max-width: 94vw;
    max-height: 84vh;
    border-radius: 10px;
  }
`;
 
export const CloseButton = styled.button`
  ${ButtonEffect}
  position: fixed;
  top: 25px;
  right: 30px;
  width: 50px;
  height: 50px;
  padding: 0;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, .12);
  color: #fff;
  cursor: pointer;
  transition: .2s;
  z-index: 10000;
 
  svg {
    width: 28px;
    height: 28px;
  }
 
  &:hover {
    background: #ffdb53;
    color: #000;
    transform: rotate(90deg);
  }
 
  @media (max-width: 600px) {
    top: 15px;
    right: 15px;
    width: 42px;
    height: 42px;
 
    svg {
      width: 24px;
      height: 24px;
    }
  }
`;
 
export const NavButton = styled.button`
  ${ButtonEffect}
  position: fixed;
  top: 50%;
  ${({ $direction }) =>
    $direction === "left" ? "left: 30px;" : "right: 30px;"}
  transform: translateY(-50%);
  width: 55px;
  height: 55px;
  padding: 0;
  border: none;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, .12);
  color: #fff;
  cursor: pointer;
  transition: background .2s ease, color .2s ease, transform .2s ease;
  z-index: 10000;
 
  svg {
    width: 26px;
    height: 26px;
  }
 
  &:hover {
    background: #ffdb53;
    color: #000;
    transform: translateY(-50%) scale(1.08);
  }
 
  @media (max-width: 600px) {
    width: 44px;
    height: 44px;
 
    ${({ $direction }) =>
      $direction === "left" ? "left: 12px;" : "right: 12px;"}
 
    svg {
      width: 20px;
      height: 20px;
    }
  }
`;
 
/* =====================================================
   CARD DE AVISO
   MESMA INTERFACE DO MODAL "SAIR DA CONTA?" DO PERFIL
   (usado na exclusão e nos avisos de erro/limite)
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
  /* $alto: avisos de erro ficam acima do card de exclusão */
  z-index: ${({ $alto }) => ($alto ? 10002 : 10001)};
  overflow-y: auto;
  animation: ${avisoOverlayAppear} 0.2s ease both;
`;
 
export const AvisoModal = styled.div`
  position: relative;
  width: 500px;
  max-width: 100%;
  padding: 40px;
  box-sizing: border-box;
  background: #ffffff;
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
    word-break: break-word;
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
 
export const AvisoButton = styled.button`
  position: relative;
  width: 100%;
  height: 60px;
  border: 0;
  border-radius: 15px;
  background: ${COLORS.primary};
  color: #ffffff;
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
    transform: translate(-50%, -50%) scale(0);
    z-index: 0;
    pointer-events: none;
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
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
    box-shadow: 0 9px 22px rgba(131, 22, 20, 0.2);
  }
 
  &:hover::before {
    transform: translate(-50%, -50%) scale(10);
  }
 
  &:active {
    transform: scale(0.97);
  }
 
  &:focus-visible {
    outline: 2px solid ${COLORS.yellow};
    outline-offset: 3px;
  }
`;
 
export const AvisoConfirmButton = styled(AvisoButton)``;
 
export const AvisoCancelButton = styled.button`
  position: relative;
  width: 100%;
  height: 60px;
  border: 2px solid ${COLORS.yellow};
  border-radius: 15px;
  background: #ffffff;
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
    transform: translate(-50%, -50%) scale(0);
    z-index: 0;
    pointer-events: none;
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
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
    transform: translate(-50%, -50%) scale(10);
  }
 
  &:active {
    transform: scale(0.97);
  }
 
  &:focus-visible {
    outline: 2px solid ${COLORS.primary};
    outline-offset: 3px;
  }
`;
 
/* =====================================================
   ANOS
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
  color: #ffffff;
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
    color: #111111;
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
  border: 2px solid
    ${({ $active }) => ($active ? COLORS.primary : "#eeeeee")};
  border-radius: 22px;
  background: ${({ $active }) => ($active ? COLORS.primary : "#ffffff")};
  color: ${({ $active }) => ($active ? "#ffffff" : "#111111")};
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
    $active ? COLORS.yellow : "rgba(255, 219, 83, 0.22)"};
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
  color: ${({ $active }) => ($active ? "#ffffff" : COLORS.primary)};
  font-size: 2.1rem;
  font-weight: 850;
  line-height: 1;
  transition:
    color 0.25s ease,
    transform 0.3s ease;
 
  ${YearCard}:hover & {
    color: #111111;
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
  color: ${({ $active }) =>
    $active ? "rgba(255,255,255,0.72)" : "#999999"};
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
 
