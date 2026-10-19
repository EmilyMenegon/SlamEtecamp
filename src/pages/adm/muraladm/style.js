import styled, { keyframes } from "styled-components";
 
 
// =====================================================
// PAGE
// =====================================================
 
export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
 
  background: #ffffff;
 
  font-family: "Poppins", sans-serif;
 
  color: #000000;
 
  overflow-x: hidden;
`;
 
 
// =====================================================
// CONTENT
// =====================================================
 
export const Content = styled.main`
  width: 90%;
  max-width: 1400px;
 
  margin: 0 auto;
 
  padding: 35px 0 100px;
 
  box-sizing: border-box;
 
 
  @media (max-width: 768px) {
    width: 92%;
 
    padding: 25px 0 80px;
  }
 
 
  @media (max-width: 480px) {
    width: 90%;
 
    padding: 20px 0 70px;
  }
`;
 
 
// =====================================================
// HEADER
// =====================================================
 
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
 
  margin: 10px auto 0;
 
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
 
 
export const Mural = styled.section`
  width: 100%;
 
  display: grid;
 
  grid-template-columns: repeat(auto-fit, minmax(430px, 520px));
 
  justify-content: center;
 
  gap: 32px;
 
  align-items: stretch;
 
 
  @media (max-width: 1100px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
 
    gap: 28px;
  }
 
 
  @media (max-width: 700px) {
    grid-template-columns: 1fr;
 
    gap: 24px;
  }
`;
 
 
// =====================================================
// EMPTY STATE
// =====================================================
 
export const EmptyState = styled.div`
  grid-column: 1 / -1;
 
  min-height: 320px;
 
  padding: 50px 25px;
 
  box-sizing: border-box;
 
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
 
  text-align: center;
 
  border: 2px dashed #dddddd;
 
  border-radius: 18px;
 
  background: #fafafa;
`;
 
 
// =====================================================
// EMPTY ICON
// =====================================================
 
export const EmptyIcon = styled.div`
  width: 70px;
  height: 70px;
 
  margin-bottom: 18px;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  border-radius: 50%;
 
  background: rgba(249, 190, 6, 0.15);
 
  color: #f9be06;
 
  font-size: 30px;
`;
 
 
// =====================================================
// EMPTY TITLE
// =====================================================
 
export const EmptyTitle = styled.h2`
  margin: 0 0 8px;
 
  color: #333333;
 
  font-size: 22px;
 
  font-weight: 600;
`;
 
 
// =====================================================
// EMPTY TEXT
// =====================================================
 
export const EmptyText = styled.p`
  max-width: 450px;
 
  margin: 0;
 
  color: #888888;
 
  font-size: 14px;
 
  line-height: 1.6;
`;
 
 
// =====================================================
// CARD DO MURAL
// =====================================================
 
export const PostIt = styled.article`
  position: relative;
 
  width: 100%;
 
  min-width: 0;
 
  min-height: 380px;
 
  padding: 45px 50px 36px;
 
  box-sizing: border-box;
 
  background: ${({ $color }) => $color || "#ffcf70"};
 
  color: #222222;
 
  cursor: pointer;
 
  display: flex;
  flex-direction: column;
 
  border-radius: 26px;
 
  overflow: hidden;
 
  box-shadow: 0 12px 28px rgba(0, 0, 0, 0.12);
 
  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;
 
 
  &:hover {
    transform: translateY(-9px);
 
    box-shadow: 0 20px 40px rgba(0, 0, 0, 0.18);
  }
 
 
  &:focus-visible {
    outline: 4px solid #000000;
 
    outline-offset: 5px;
  }
 
 
  @media (max-width: 1100px) {
    padding: 40px 40px 32px;
  }
 
 
  @media (max-width: 700px) {
    padding: 36px 32px 30px;
  }
 
 
  @media (max-width: 500px) {
    min-height: 310px;
 
    padding: 34px 28px 28px;
  }
`;
 
 
// =====================================================
// CARD TITLE
// =====================================================
 
export const PostItTitle = styled.h2`
  margin: 0 0 24px;
 
  color: #222222;
 
  font-family: "Poppins", sans-serif;
 
  font-size: 29px;
 
  font-weight: 700;
 
  line-height: 1.3;
 
  word-break: break-word;
 
 
  @media (max-width: 1000px) {
    font-size: 27px;
  }
 
 
  @media (max-width: 750px) {
    font-size: 25px;
 
    margin-bottom: 21px;
  }
 
 
  @media (max-width: 500px) {
    font-size: 23px;
 
    margin-bottom: 19px;
  }
`;
 
 
// =====================================================
// CARD MESSAGE
// =====================================================
 
export const PostItMessage = styled.p`
  margin: 0;
 
  color: #292929;
 
  font-family: "Poppins", sans-serif;
 
  font-size: 18px;
 
  font-weight: 400;
 
  line-height: 1.65;
 
  word-break: break-word;
 
  white-space: pre-wrap;
 
  display: -webkit-box;
 
  -webkit-line-clamp: 6;
 
  -webkit-box-orient: vertical;
 
  overflow: hidden;
 
 
  @media (max-width: 1000px) {
    font-size: 17px;
  }
 
 
  @media (max-width: 750px) {
    font-size: 16px;
 
    line-height: 1.6;
  }
 
 
  @media (max-width: 500px) {
    font-size: 15px;
 
    line-height: 1.6;
 
    -webkit-line-clamp: 7;
  }
`;
 
 
// =====================================================
// CARD FOOTER
// =====================================================
 
export const PostItFooter = styled.div`
  margin-top: auto;
 
  padding-top: 30px;
 
  display: flex;
  flex-direction: column;
  align-items: center;
 
  gap: 10px;
 
 
  @media (max-width: 500px) {
    padding-top: 25px;
 
    gap: 9px;
  }
`;
 
 
// =====================================================
// "CLIQUE PARA VISUALIZAR"
// =====================================================
 
export const ReadMore = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
 
  width: fit-content;
 
  min-height: 45px;
 
  padding: 10px 25px;
 
  box-sizing: border-box;
 
  border-radius: 999px;
 
  background: rgba(255, 255, 255, 0.48);
 
  color: rgba(0, 0, 0, 0.65);
 
  font-family: "Poppins", sans-serif;
 
  font-size: 17px;
 
  font-weight: 600;
 
  line-height: 1.3;
 
  white-space: nowrap;
 
 
  @media (max-width: 500px) {
    min-height: 31px;
 
    padding: 5px 15px;
 
    font-size: 13px;
  }
`;
 
 
// =====================================================
// DATA DE PUBLICAÇÃO
// =====================================================
 
export const PostDate = styled.span`
  display: block;
 
  color: #555555;
 
  font-family: "Poppins", sans-serif;
 
  font-size: 14px;
 
  font-weight: 500;
 
  line-height: 1.4;
 
 
  @media (max-width: 500px) {
    font-size: 13px;
  }
`;
 
 
// =====================================================
// ANIMAÇÃO BASE DOS BOTÕES
// =====================================================
 
const ButtonEffect = `
  position: relative;
 
  overflow: hidden;
 
  isolation: isolate;
 
  --mouse-x: 50%;
 
  --mouse-y: 50%;
 
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    background-color 0.2s ease,
    color 0.2s ease;
 
 
  &::before {
    content: "";
 
    position: absolute;
 
    left: var(--mouse-x);
 
    top: var(--mouse-y);
 
    width: 30px;
    height: 30px;
 
    border-radius: 50%;
 
    transform: translate(-50%, -50%) scale(0);
 
    transition: transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
 
    z-index: 0;
 
    pointer-events: none;
  }
 
 
  &:hover::before {
    transform: translate(-50%, -50%) scale(18);
  }
 
 
  &:active {
    transform: translateY(1px) scale(0.97);
 
    transition: transform 0.06s ease;
  }
 
 
  .buttonContent {
    position: relative;
 
    z-index: 2;
 
    display: flex;
 
    align-items: center;
 
    justify-content: center;
 
    width: 100%;
    height: 100%;
  }
`;
 
 
// =====================================================
// FLOATING BUTTON
// =====================================================
 
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
 
  color: #111111;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  cursor: pointer;
 
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.20);
 
  z-index: 100;
 
 
  &::before {
    background: #831614;
  }
 
 
  &:hover {
    color: #ffdb53;
 
    transform: translateY(-4px);
 
    box-shadow: 0 15px 30px rgba(0, 0, 0, 0.28);
  }
 
 
  svg {
    width: 30px;
    height: 30px;
 
    transition: transform 0.3s ease;
  }
 
 
  &:hover svg {
    transform: rotate(90deg);
  }
 
 
  &:active {
    transform: translateY(1px) scale(0.96);
  }
 
 
  @media (max-width: 600px) {
    width: 60px;
    height: 60px;
 
    right: 20px;
    bottom: 20px;
  }
`;
 
 
// =====================================================
// CREATE OVERLAY
// =====================================================
 
export const CreateOverlay = styled.div`
  position: fixed;
 
  inset: 0;
 
  z-index: 9999;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  padding: 15px;
 
  box-sizing: border-box;
 
  background: rgba(0, 0, 0, 0.45);
 
  backdrop-filter: blur(3px);
`;
 
 
// =====================================================
// CREATE MODAL
// =====================================================
 
export const CreateModal = styled.div`
  width: 420px;
 
  max-width: 100%;
 
  box-sizing: border-box;
 
  padding: 22px 25px;
 
  background: #ffffff;
 
  border-radius: 20px;
 
  box-shadow: 0 20px 50px rgba(0, 0, 0, 0.25);
 
  animation: createAppear 0.2s ease;
 
 
  @keyframes createAppear {
    from {
      opacity: 0;
 
      transform: scale(0.94) translateY(10px);
    }
 
    to {
      opacity: 1;
 
      transform: scale(1) translateY(0);
    }
  }
 
 
  @media (max-width: 500px) {
    width: 100%;
 
    border-radius: 18px;
 
    padding: 18px;
  }
`;
 
 
// =====================================================
// CREATE HEADER
// =====================================================
 
export const CreateHeader = styled.div`
  width: 100%;
 
  display: flex;
  align-items: center;
  justify-content: space-between;
 
  margin-bottom: 16px;
`;
 
 
// =====================================================
// CREATE TITLE
// =====================================================
 
export const CreateTitle = styled.h2`
  margin: 0;
 
  color: #111111;
 
  font-size: 23px;
 
  font-weight: 700;
`;
 
 
// =====================================================
// CREATE CLOSE
// =====================================================
 
export const CreateCloseButton = styled.button`
  ${ButtonEffect}
 
  width: 38px;
  height: 38px;
 
  padding: 0;
 
  border: none;
 
  border-radius: 50%;
 
  background: #f1f1f1;
 
  color: #333333;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  cursor: pointer;
 
 
  &::before {
    background: #111111;
  }
 
 
  &:hover {
    color: #ffffff;
 
    transform: scale(1.05);
  }
 
 
  svg {
    width: 21px;
    height: 21px;
  }
`;
 
 
// =====================================================
// FORM
// =====================================================
 
export const CreateForm = styled.form`
  display: flex;
  flex-direction: column;
 
  gap: 13px;
`;
 
 
// =====================================================
// FIELD
// =====================================================
 
export const Field = styled.div`
  display: flex;
  flex-direction: column;
 
  gap: 6px;
`;
 
 
// =====================================================
// LABEL
// =====================================================
 
export const Label = styled.label`
  color: #333333;
 
  font-size: 13px;
 
  font-weight: 600;
`;
 
 
// =====================================================
// TITLE INPUT
// =====================================================
 
export const TitleInput = styled.input`
  width: 100%;
 
  height: 43px;
 
  box-sizing: border-box;
 
  padding: 0 13px;
 
  border: none;
 
  border-radius: 10px;
 
  outline: none;
 
  background: #f3f3f3;
 
  color: #111111;
 
  font-family: "Poppins", sans-serif;
 
  font-size: 14px;
 
 
  &:focus {
    box-shadow: 0 0 0 2px rgba(249, 190, 6, 0.4);
  }
`;
 
 
// =====================================================
// DESCRIPTION INPUT
// =====================================================
 
export const DescriptionInput = styled.textarea`
  width: 100%;
 
  height: 80px;
 
  min-height: 80px;
 
  max-height: 100px;
 
  resize: none;
 
  box-sizing: border-box;
 
  padding: 11px 13px;
 
  border: none;
 
  border-radius: 10px;
 
  outline: none;
 
  background: #f3f3f3;
 
  color: #111111;
 
  font-family: "Poppins", sans-serif;
 
  font-size: 14px;
 
  line-height: 1.4;
 
 
  &:focus {
    box-shadow: 0 0 0 2px rgba(249, 190, 6, 0.4);
  }
`;
 
 
// =====================================================
// COLOR LABEL
// =====================================================
 
export const ColorLabel = styled.span`
  color: #333333;
 
  font-size: 13px;
 
  font-weight: 600;
`;
 
 
// =====================================================
// COLOR OPTIONS
// =====================================================
 
export const ColorOptions = styled.div`
  display: flex;
  align-items: center;
 
  gap: 9px;
 
  flex-wrap: wrap;
`;
 
 
// =====================================================
// COLOR OPTION
// =====================================================
 
export const ColorOption = styled.button`
  width: 30px;
  height: 30px;
 
  flex-shrink: 0;
 
  padding: 0;
 
  border-radius: 50%;
 
  border: 3px solid ${({ $selected }) => ($selected ? "#111111" : "#ffffff")};
 
  outline: 1px solid ${({ $selected }) => ($selected ? "#111111" : "#dddddd")};
 
  background: ${({ $color }) => $color};
 
  cursor: pointer;
 
  transition: transform 0.2s ease;
 
 
  &:hover {
    transform: scale(1.12);
  }
`;
 
 
// =====================================================
// CREATE BUTTON
// =====================================================
 
export const CreateButton = styled.button`
  ${ButtonEffect}
 
  width: 100%;
 
  height: 45px;
 
  margin-top: 2px;
 
  padding: 0;
 
  border: none;
 
  border-radius: 11px;
 
  background: #f9be06;
 
  color: #111111;
 
  font-size: 14px;
 
  font-weight: 700;
 
  cursor: pointer;
 
 
  &::before {
    background: #831614;
  }
 
 
  &:hover:not(:disabled) {
    color: #ffffff;
 
    transform: translateY(-2px);
  }
 
 
  &:disabled {
    opacity: 0.45;
 
    cursor: not-allowed;
  }
`;
 
 
// =====================================================
// VIEW OVERLAY
// =====================================================
 
export const ViewOverlay = styled.div`
  position: fixed;
 
  inset: 0;
 
  z-index: 9998;
 
  padding: 20px;
 
  box-sizing: border-box;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  background: rgba(0, 0, 0, 0.70);
 
  backdrop-filter: blur(4px);
 
  animation: fadeIn 0.2s ease;
 
 
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
 
    to {
      opacity: 1;
    }
  }
 
 
  @media (max-width: 600px) {
    padding: 12px;
  }
`;
 
 
// =====================================================
// VIEW CARD
// =====================================================
 
export const ViewPostIt = styled.div`
  position: relative;
 
  width: min(850px, 100%);
 
  min-height: 500px;
 
  max-height: calc(100vh - 60px);
 
  padding: 85px clamp(30px, 8vw, 90px) 50px;
 
  box-sizing: border-box;
 
  background: ${({ $color }) => $color || "#ffcf70"};
 
  border-radius: 20px;
 
  box-shadow: 10px 22px 50px rgba(0, 0, 0, 0.30);
 
  overflow-y: auto;
 
  animation: postOpen 0.25s ease;
 
 
  @keyframes postOpen {
    from {
      opacity: 0;
 
      transform: scale(0.93) translateY(15px);
    }
 
    to {
      opacity: 1;
 
      transform: scale(1) translateY(0);
    }
  }
 
 
  @media (max-width: 600px) {
    width: 100%;
 
    min-height: 400px;
 
    max-height: calc(100vh - 24px);
 
    padding: 75px 25px 35px;
  }
`;
 
 
// =====================================================
// VIEW BUTTONS
// =====================================================
 
export const ViewTopButtons = styled.div`
  position: absolute;
 
  top: 18px;
 
  right: 20px;
 
  display: flex;
  align-items: center;
  justify-content: flex-end;
 
  gap: 10px;
 
  z-index: 20;
`;
 
 
// =====================================================
// VIEW EDIT
// =====================================================
 
export const ViewEditButton = styled.button`
  ${ButtonEffect}
 
  width: 42px;
  height: 42px;
 
  padding: 0;
 
  border: none;
 
  border-radius: 50%;
 
  background: rgba(255, 255, 255, 0.75);
 
  color: #222222;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  cursor: pointer;
 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
 
 
  &::before {
    background: #000000;
  }
 
 
  &:hover {
    color: #ffffff;
 
    transform: scale(1.08);
  }
 
 
  svg {
    width: 20px;
    height: 20px;
  }
`;
 
 
// =====================================================
// VIEW CLOSE
// =====================================================
 
export const ViewCloseButton = styled.button`
  ${ButtonEffect}
 
  width: 42px;
  height: 42px;
 
  padding: 0;
 
  border: none;
 
  border-radius: 50%;
 
  background: rgba(255, 255, 255, 0.75);
 
  color: #222222;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  cursor: pointer;
 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.12);
 
 
  &::before {
    background: #000000;
  }
 
 
  &:hover {
    color: #ffffff;
 
    transform: rotate(90deg);
  }
 
 
  svg {
    width: 22px;
    height: 22px;
  }
`;
 
 
// =====================================================
// VIEW DELETE
// =====================================================
 
export const ViewDeleteButton = styled.button`
  ${ButtonEffect}
 
  width: 42px;
  height: 42px;
 
  padding: 0;
 
  border: none;
 
  border-radius: 50%;
 
  background: #d62828;
 
  color: #ffffff;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  cursor: pointer;
 
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
 
 
  &::before {
    background: #111111;
  }
 
 
  &:hover {
    color: #ffffff;
 
    transform: scale(1.08);
  }
 
 
  svg {
    width: 20px;
    height: 20px;
  }
`;
 
 
// =====================================================
// VIEW CONTENT
// =====================================================
 
export const ViewContent = styled.div`
  width: min(700px, 100%);
 
  min-height: 100%;
 
  margin: 0 auto;
 
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;
 
 
// =====================================================
// VIEW TITLE
// =====================================================
 
export const ViewTitle = styled.h2`
  margin: 0 0 35px;
 
  color: #222222;
 
  font-family: "Poppins", sans-serif;
 
  font-size: clamp(2rem, 6vw, 4rem);
 
  line-height: 1.05;
 
  font-weight: 700;
 
  letter-spacing: -1px;
 
  word-break: break-word;
 
 
  @media (max-width: 600px) {
    margin-bottom: 25px;
 
    font-size: 32px;
  }
`;
 
 
// =====================================================
// VIEW DESCRIPTION
// =====================================================
 
export const ViewDescription = styled.p`
  margin: 0 0 30px;
 
  color: #292929;
 
  font-family: "Poppins", sans-serif;
 
  font-size: clamp(1.1rem, 3vw, 1.8rem);
 
  line-height: 1.75;
 
  white-space: pre-wrap;
 
  word-break: break-word;
 
 
  @media (max-width: 600px) {
    font-size: 18px;
 
    line-height: 1.65;
  }
`;
 
 
// =====================================================
// AVISO DE EXCLUSÃO
// MESMA INTERFACE DO MODAL "SAIR DA CONTA?" DO PERFIL
// =====================================================
 
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
 
 
// =====================================================
// DELETE OVERLAY
// =====================================================
 
export const DeleteOverlay = styled.div`
  position: fixed;
 
  inset: 0;
 
  width: 100%;
  height: 100%;
 
  z-index: 10001;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  padding: 25px;
 
  box-sizing: border-box;
 
  background: rgba(87, 17, 17, 0.4);
 
  backdrop-filter: blur(7px);
 
  overflow-y: auto;
 
  animation: ${avisoOverlayAppear} 0.2s ease both;
`;
 
 
// =====================================================
// DELETE MODAL
// =====================================================
 
export const DeleteModal = styled.div`
  position: relative;
 
  width: 500px;
 
  max-width: 100%;
 
  padding: 40px;
 
  box-sizing: border-box;
 
  background: #ffffff;
 
  border-radius: 28px;
 
  text-align: center;
 
  box-shadow:
    8px 8px 0 #831614,
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
 
    background: #ffdb53;
  }
 
 
  h3 {
    position: relative;
 
    margin: 20px 0 11px;
 
    color: #831614;
 
    font-size: 1.6rem;
 
    font-weight: 900;
  }
 
 
  p {
    position: relative;
 
    margin: 0 auto 30px;
 
    max-width: 380px;
 
    color: #666666;
 
    font-size: 0.95rem;
 
    line-height: 1.55;
 
    word-break: break-word;
  }
 
 
  p strong {
    display: block;
 
    margin-top: 8px;
 
    color: #252525;
 
    font-weight: 800;
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
 
 
// =====================================================
// DELETE ICON
// =====================================================
 
export const DeleteIcon = styled.div`
  position: relative;
 
  width: 70px;
  height: 70px;
 
  margin: 0 auto;
 
  display: flex;
  align-items: center;
  justify-content: center;
 
  border-radius: 50%;
 
  background: #fff7d0;
 
  color: #831614;
 
  border: 2px solid #ffdb53;
 
 
  svg {
    font-size: 25px;
  }
`;
 
 
// =====================================================
// MODAL BUTTONS
// =====================================================
 
export const ModalButtons = styled.div`
  position: relative;
 
  display: grid;
 
  grid-template-columns: 1fr 1fr;
 
  gap: 14px;
 
  width: 100%;
 
 
  @media (max-width: 420px) {
    grid-template-columns: 1fr;
  }
`;
 
 
// =====================================================
// CANCEL BUTTON
// =====================================================
 
export const CancelButton = styled.button`
  position: relative;
 
  width: 100%;
  height: 60px;
 
  border: 2px solid #ffdb53;
 
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
 
    background: #ffdb53;
 
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
    outline: 2px solid #831614;
 
    outline-offset: 3px;
  }
`;
 
 
// =====================================================
// CONFIRM BUTTON
// =====================================================
 
export const ConfirmButton = styled.button`
  position: relative;
 
  width: 100%;
  height: 60px;
 
  border: 0;
 
  border-radius: 15px;
 
  background: #831614;
 
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
 
    background: #ffdb53;
 
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
    outline: 2px solid #ffdb53;
 
    outline-offset: 3px;
  }
`;
 
