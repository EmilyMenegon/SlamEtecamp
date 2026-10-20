import styled, { createGlobalStyle, css, keyframes } from "styled-components";
 
import { Link } from "react-router-dom";
 
const colors = {
  yellow: "#FFDB53", yellowStrong: "#F9BE06", cream: "#FFF7D0", input: "#FFFDF0", red: "#831614", wine: "#571111",
  black: "#010000", white: "#FFFFFF", gray: "#666666", lightGray: "#F5F3E8", border: "#E8DFAF", green: "#2E7D32", error: "#C62828",
};
 
/* ============================================================
   ANIMAÇÃO PADRÃO DOS BOTÕES
   Igual à dos cards de ano (Inscrições, Eventos, Galeria, Mural):
   - borda 2px (#eee) que vira vinho no hover
   - botão sobe 8px com sombra
   - bolinha amarela cresce a partir do mouse
============================================================ */
 
const botaoBase = css`
  position: relative; overflow: hidden; isolation: isolate; cursor: pointer; font-family: inherit; box-sizing: border-box;
  border: 2px solid #eee;
  transition: transform .3s cubic-bezier(.22,1,.36,1), border-color .25s ease, background .25s ease, box-shadow .3s ease, color .25s ease, opacity .2s ease;
  &:disabled { opacity: .4; cursor: not-allowed; }
  .buttonContent { position: relative; z-index: 2; display: flex; align-items: center; justify-content: center; gap: 9px; color: inherit; }
`;
 
const botaoAnimado = (tamanho = 35, escala = 11) => css`
  &::before { content: ""; position: absolute; left: var(--mouse-x, 50%); top: var(--mouse-y, 50%); width: ${tamanho}px; height: ${tamanho}px; border-radius: 50%; background: ${colors.yellow}; transform: translate(-50%, -50%) scale(0); transition: transform .65s cubic-bezier(.16,1,.3,1); z-index: -1; pointer-events: none; }
  &:hover:not(:disabled) { transform: translateY(-8px); border-color: ${colors.red}; box-shadow: 0 18px 35px rgba(131,22,20,.16); }
  &:hover:not(:disabled)::before { transform: translate(-50%, -50%) scale(${escala}); }
  &:active:not(:disabled) { transform: translateY(-3px) scale(.98); }
  &:focus-visible { outline: 3px solid ${colors.yellow}; outline-offset: 4px; }
`;
 
const aparecer = keyframes`
  from { opacity: 0; transform: translateY(25px); }
  to { opacity: 1; transform: translateY(0); }
`;
 
const subir = keyframes`
  from { opacity: 0; transform: translateY(12px); }
  to { opacity: 1; transform: translateY(0); }
`;
 
const flutuar = keyframes`
  0%, 100% { transform: translateY(0) rotate(0deg); }
  50% { transform: translateY(-10px) rotate(3deg); }
`;
 
export const GlobalStyle = createGlobalStyle`
  * { margin: 0; padding: 0; box-sizing: border-box; }
  html, body, #root { width: 100%; min-height: 100%; }
  html { background: ${colors.cream}; }
  body { min-height: 100vh; background: ${colors.cream}; font-family: "Poppins", sans-serif; color: ${colors.black}; -webkit-font-smoothing: antialiased; -moz-osx-font-smoothing: grayscale; }
  button, input { font-family: inherit; }
  button { -webkit-tap-highlight-color: transparent; touch-action: manipulation; }
  input { -webkit-appearance: none; appearance: none; }
  ::selection { background: ${colors.yellow}; color: ${colors.black}; }
`;
 
/* PAGE */
 
export const Page = styled.main`
  position: relative; width: 100%; min-height: 100vh; min-height: 100dvh; display: flex; justify-content: center; align-items: flex-start; padding: 95px 35px 100px;
  background: radial-gradient(circle at 50% 5%, rgba(255, 219, 83, 0.28) 0, rgba(255, 219, 83, 0.08) 22%, transparent 45%), linear-gradient(180deg, #f9f2ce 0%, #fff7d0 35%, #ffffff 100%);
  overflow-x: hidden; isolation: isolate;
  @media (max-width: 700px) { padding: 88px 20px 55px; }
`;
 
/* PIXELS */
 
export const PixelArea = styled.div`
  position: absolute; inset: 0; pointer-events: none; z-index: 1;
`;
 
export const Pixel01 = styled.img`
  position: absolute; width: clamp(85px, 11vw, 175px); top: 80px; left: clamp(12px, 4vw, 70px); object-fit: contain; user-select: none; animation: ${flutuar} 4s ease-in-out infinite;
  filter: drop-shadow(6px 6px 0 #fff) drop-shadow(9px 9px 0 ${colors.yellow});
  @media (max-width: 700px) { width: 82px; top: 25px; left: 5px; }
`;
 
export const Pixel02 = styled.img`
  position: absolute; width: clamp(90px, 12vw, 185px); top: 90px; right: clamp(12px, 4vw, 70px); object-fit: contain; user-select: none; animation: ${flutuar} 4.6s ease-in-out infinite reverse;
  filter: drop-shadow(-6px 6px 0 #fff) drop-shadow(-9px 9px 0 ${colors.yellow});
  @media (max-width: 700px) { width: 86px; top: 28px; right: 4px; }
`;
 
export const Pixel03 = styled.img`
  position: absolute; width: clamp(80px, 10vw, 160px); bottom: 75px; left: clamp(12px, 3vw, 55px); object-fit: contain; user-select: none; animation: ${flutuar} 5s ease-in-out infinite;
  filter: drop-shadow(6px 6px 0 #fff) drop-shadow(9px 9px 0 ${colors.yellow});
  @media (max-width: 700px) { width: 76px; bottom: 22px; left: 0; }
`;
 
/* VOLTAR */
 
export const BackButton = styled(Link)`
  ${botaoBase}
  position: fixed; top: 28px; left: 28px; width: 64px; height: 64px; display: flex; align-items: center; justify-content: center; border-color: ${colors.yellow}; border-radius: 50%; background: ${colors.yellow}; color: ${colors.black}; text-decoration: none;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15); z-index: 1000;
  ${botaoAnimado(20, 9)}
  &::before { background: ${colors.red}; }
  svg { font-size: 26px; position: relative; z-index: 2; transition: transform 0.25s ease; }
  &:hover { color: ${colors.white}; }
  &:hover svg { transform: translateX(-3px); }
  @media (max-width: 600px) { top: 15px; left: 15px; width: 54px; height: 54px; svg { font-size: 21px; } }
`;
 
/* CONTAINER */
 
export const Container = styled.div`
  position: relative; z-index: 5; width: min(900px, 100%); display: flex; flex-direction: column; gap: 30px; animation: ${aparecer} 0.65s ease both;
`;
 
/* FORM */
 
export const Form = styled.form`
  width: 100%; display: flex; flex-direction: column; gap: 30px;
`;
 
/* HEADER */
 
export const Header = styled.header`
  padding: 8px 6px 12px; animation: ${subir} 0.55s ease both;
`;
 
export const HeaderTitle = styled.h1`
  color: ${colors.red}; font-size: clamp(2.7rem, 6vw, 4rem); line-height: 1; font-weight: 900; letter-spacing: -1.8px;
`;
 
export const HeaderSubtitle = styled.p`
  margin-top: 13px; color: #766c48; font-size: 1.08rem; line-height: 1.5; max-width: 650px;
`;
 
/* PROFILE CARD */
 
export const ProfileCard = styled.div`
  position: relative; display: flex; align-items: center; gap: 42px; padding: 38px 40px; background: ${colors.white}; border: 1px solid rgba(131, 22, 20, 0.07); border-radius: 28px; box-shadow: 0 16px 45px rgba(0, 0, 0, 0.1); overflow: hidden; animation: ${subir} 0.65s 0.08s ease both;
  &::before { content: ""; position: absolute; width: 230px; height: 230px; right: -105px; top: -115px; border-radius: 50%; background: ${colors.yellow}; opacity: 0.45; }
  &::after { content: ""; position: absolute; left: 0; bottom: 0; width: 120px; height: 6px; background: ${colors.red}; border-radius: 0 6px 0 0; }
  @media (max-width: 600px) { flex-direction: column; text-align: center; gap: 24px; padding: 32px 24px; }
`;
 
/* AVATAR */
 
export const AvatarArea = styled.div`
  position: relative; z-index: 2; flex: 0 0 auto;
`;
 
export const AvatarWrapper = styled.div`
  position: relative; width: 160px; height: 160px; padding: 6px; border-radius: 50%; background: linear-gradient(135deg, ${colors.yellow}, ${colors.yellowStrong}); box-shadow: 0 8px 22px rgba(131, 22, 20, 0.14);
  @media (max-width: 600px) { width: 145px; height: 145px; }
`;
 
export const Avatar = styled.img`
  width: 100%; height: 100%; display: block; border-radius: 50%; object-fit: cover; background: ${colors.cream}; border: 5px solid ${colors.white};
`;
 
/* BOTÃO DA FOTO
   O anel branco que separava o botão do avatar agora é um box-shadow,
   para a borda de 2px seguir o padrão dos outros botões. */
 
export const CameraButton = styled.label`
  ${botaoBase}
  position: absolute; right: -13px; bottom: -7px; width: 72px; height: 72px; display: flex; align-items: center; justify-content: center; border-color: ${colors.red}; border-radius: 50%; background: ${colors.red}; color: ${colors.white};
  box-shadow: 0 0 0 5px ${colors.white}, 0 7px 18px rgba(0, 0, 0, 0.22);
  ${botaoAnimado(20, 9)}
  svg { position: relative; z-index: 2; font-size: 28px; transition: transform 0.25s ease; }
  input { display: none; }
  &:hover { color: ${colors.black}; box-shadow: 0 0 0 5px ${colors.white}, 0 18px 35px rgba(131, 22, 20, 0.16); }
  &:hover svg { transform: scale(1.08); }
  @media (max-width: 600px) { right: -10px; bottom: -5px; width: 64px; height: 64px; svg { font-size: 24px; } }
`;
 
/* PROFILE INFO */
 
export const ProfileInfo = styled.div`
  position: relative; z-index: 2; min-width: 0; flex: 1; display: flex; flex-direction: column; justify-content: center; align-items: flex-start; text-align: left;
  @media (max-width: 600px) { align-items: center; text-align: center; width: 100%; }
`;
 
export const UserName = styled.h2`
  color: ${colors.red}; font-size: clamp(1.8rem, 4vw, 2.4rem); line-height: 1.2; font-weight: 900; word-break: break-word;
`;
 
export const UserEmail = styled.p`
  margin-top: 8px; color: ${colors.gray}; font-size: 1.05rem; word-break: break-word; overflow-wrap: anywhere;
`;
 
/* SECTIONS */
 
export const Section = styled.section`
  display: flex; flex-direction: column; gap: 27px; padding: 35px 36px; background: ${colors.white}; border: 1px solid rgba(0, 0, 0, 0.055); border-radius: 26px; box-shadow: 0 12px 35px rgba(0, 0, 0, 0.07); animation: ${subir} 0.65s ease both;
  @media (max-width: 600px) { padding: 28px 22px; border-radius: 21px; }
`;
 
export const SectionHeader = styled.div`
  display: flex; align-items: center; gap: 17px;
`;
 
export const SectionIcon = styled.div`
  flex: 0 0 auto; width: 54px; height: 54px; display: flex; align-items: center; justify-content: center; border-radius: 15px; background: ${colors.cream}; color: ${colors.red};
  svg { font-size: 22px; }
`;
 
export const SectionTitle = styled.h3`
  color: ${colors.black}; font-size: 1.35rem; font-weight: 800;
`;
 
export const SectionDescription = styled.p`
  margin-top: 5px; color: #88806a; font-size: 0.92rem; line-height: 1.4;
`;
 
/* FIELDS */
 
export const FieldsGrid = styled.div`
  display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 25px;
  @media (max-width: 620px) { grid-template-columns: 1fr; }
`;
 
export const Field = styled.div`
  display: flex; flex-direction: column; gap: 9px; width: 100%;
  small { padding-left: 4px; color: #948c75; font-size: 0.78rem; line-height: 1.4; }
`;
 
export const Label = styled.label`
  padding-left: 4px; color: #6f6545; font-size: 0.95rem; font-weight: 700;
`;
 
export const InputWrapper = styled.div`
  position: relative; width: 100%;
  &::after { content: ""; position: absolute; inset: 0; border-radius: 15px; pointer-events: none; border: 2px solid transparent; transition: border-color 0.25s ease, box-shadow 0.25s ease; }
  &:focus-within::after { border-color: ${colors.yellowStrong}; box-shadow: 0 0 0 3px rgba(255, 219, 83, 0.16); }
  &:hover::after { border-color: rgba(249, 190, 6, 0.4); }
  &[disabled] { opacity: 0.7; }
`;
 
export const InputIcon = styled.div`
  position: absolute; left: 19px; top: 50%; transform: translateY(-50%); width: 24px; display: flex; align-items: center; justify-content: center; color: #9d9064; pointer-events: none; z-index: 3;
  svg { font-size: 17px; }
`;
 
export const Input = styled.input`
  display: block; width: 100%; height: 66px; padding: 0 18px 0 54px; border: 2px solid ${colors.border}; border-radius: 15px; outline: none; background: ${colors.input}; color: #171717; font-size: 1rem;
  transition: background 0.25s ease, border-color 0.25s ease, box-shadow 0.25s ease, transform 0.2s ease;
  &:hover { background: #fffaf0; border-color: ${colors.yellowStrong}; }
  &:focus { background: #fffef3; border-color: ${colors.yellowStrong}; box-shadow: 0 0 0 3px rgba(255, 219, 83, 0.14); }
  &::placeholder { color: #aaa183; opacity: 0.8; }
  &:disabled { cursor: not-allowed; background: #f2f0e4; color: #817d70; border-color: #dedac9; }
  @media (max-width: 600px) { height: 62px; font-size: 0.95rem; }
`;
 
/* AVISOS */
 
export const Aviso = styled.div`
  width: 100%; padding: 12px 15px; border-radius: 12px; background: rgba(198, 40, 40, 0.07); border: 1px solid rgba(198, 40, 40, 0.12); color: ${colors.error}; font-size: 0.78rem; line-height: 1.4; text-align: center; animation: ${subir} 0.25s ease both;
`;
 
export const AvisoSucesso = styled.div`
  width: 100%; padding: 12px 15px; border-radius: 12px; background: rgba(46, 125, 50, 0.08); border: 1px solid rgba(46, 125, 50, 0.12); color: ${colors.green}; font-size: 0.78rem; line-height: 1.4; text-align: center; animation: ${subir} 0.25s ease both;
`;
 
/* SALVAR */
 
export const SaveButton = styled.button`
  ${botaoBase}
  width: 100%; height: 68px; border-color: ${colors.yellow}; border-radius: 16px; background: ${colors.yellow}; color: ${colors.black}; font-size: 1.08rem; font-weight: 800;
  ${botaoAnimado(48, 22)}
  &::before { background: ${colors.red}; }
  .buttonContent { gap: 11px; }
  svg { font-size: 17px; }
  &:hover:not(:disabled) { color: ${colors.white}; }
  &:disabled { opacity: 0.55; }
`;
 
/* CANCELAR */
 
export const CancelButton = styled.button`
  ${botaoBase}
  width: 100%; height: 60px; border-radius: 15px; background: ${colors.white}; color: ${colors.black}; font-size: 0.98rem; font-weight: 700;
  ${botaoAnimado(35, 14)}
`;
 
/* CONFIRMAR */
 
export const ConfirmButton = styled.button`
  ${botaoBase}
  width: 100%; height: 60px; border-color: ${colors.red}; border-radius: 15px; background: ${colors.red}; color: ${colors.white}; font-size: 0.98rem; font-weight: 700;
  ${botaoAnimado(35, 14)}
  &:hover:not(:disabled) { color: ${colors.black}; }
`;
 
/* SAIR */
 
export const LogoutLink = styled.button`
  width: 100%; display: flex; align-items: center; justify-content: center; gap: 10px; margin-top: 3px; padding: 15px; border: 0; background: transparent; color: ${colors.red}; font-size: 0.98rem; font-weight: 700; cursor: pointer;
  transition: color 0.2s ease, transform 0.2s ease;
  svg { font-size: 16px; }
  &:hover { color: ${colors.black}; transform: translateY(-1px); }
`;
 
/* MODAL */
 
export const ModalOverlay = styled.div`
  position: fixed; inset: 0; width: 100%; height: 100%; display: flex; align-items: center; justify-content: center; padding: 25px; background: rgba(87, 17, 17, 0.4); backdrop-filter: blur(7px); z-index: 9999; animation: ${subir} 0.2s ease both;
`;
 
export const Modal = styled.div`
  position: relative; width: 500px; max-width: 100%; padding: 40px; background: ${colors.white}; border-radius: 28px; text-align: center;
  box-shadow: 8px 8px 0 ${colors.red}, 0 25px 65px rgba(0, 0, 0, 0.24); animation: ${aparecer} 0.25s ease both; overflow: hidden;
  &::before { content: ""; position: absolute; width: 160px; height: 160px; top: -85px; right: -65px; border-radius: 50%; background: ${colors.yellow}; }
  h3 { position: relative; margin: 20px 0 11px; color: ${colors.red}; font-size: 1.6rem; font-weight: 900; }
  p { position: relative; margin: 0 auto 30px; max-width: 380px; color: ${colors.gray}; font-size: 0.95rem; line-height: 1.55; }
  @media (max-width: 500px) { padding: 30px 20px; border-radius: 22px; h3 { font-size: 1.35rem; } p { font-size: 0.85rem; } }
`;
 
export const ModalIcon = styled.div`
  position: relative; width: 70px; height: 70px; margin: 0 auto; display: flex; align-items: center; justify-content: center; border-radius: 50%; background: ${colors.cream}; color: ${colors.red}; border: 2px solid ${colors.yellow};
  svg { font-size: 25px; }
`;
 
export const ModalButtons = styled.div`
  position: relative; display: grid; grid-template-columns: 1fr 1fr; gap: 14px; width: 100%;
  @media (max-width: 420px) { grid-template-columns: 1fr; }
`;

