import styled from "styled-components";

const colors = {
  yellow: "#FFDB53",
  yellowStrong: "#F9BE06",
  cream: "#FFF7D0",
  input: "#FFFDF0",
  red: "#831614",
  wine: "#300404",
  black: "#010000",
  white: "#fff",
};

export const Page = styled.div`
  width: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: ${colors.white};
  color: #111;
  font-family: "Poppins", sans-serif;
  overflow-x: hidden;

  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }
`;

export const TitleArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 30px 20px 22px;

  @media (max-width: 768px) {
    padding: 27px 18px 20px;
  }

  @media (max-width: 480px) {
    padding: 23px 14px 17px;
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
  margin: 18px auto 0;
  color: #777;
  font-size: 1.55rem;
  line-height: 1.6;
  text-align: center;

  @media (max-width: 768px) {
    margin-top: 15px;
    font-size: 1.1rem;
  }

  @media (max-width: 480px) {
    margin-top: 13px;
    font-size: 1rem;
  }
`;

export const Container = styled.div`
  position: relative;
  width: min(1380px, 95%);
  min-height: 535px;
  display: flex;
  align-items: stretch;
  margin: 10px auto 40px;
  border-radius: 32px;
  background: ${colors.white};

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.18),
    0 10px 35px rgba(0, 0, 0, 0.1);

  @media (max-width: 1200px) {
    width: 95%;
  }

  @media (max-width: 900px) {
    width: 96%;
  }

  @media (max-width: 768px) {
    width: 94%;
    min-height: 0;
    flex-direction: column;
    margin: 8px auto 30px;
    border-radius: 26px;
  }

  @media (max-width: 480px) {
    width: 96%;
    border-radius: 22px;
  }
`;

export const LeftSide = styled.div`
  position: relative;
  width: 34%;
  min-height: 535px;
  padding: 48px 42px;

  display: flex;
  justify-content: center;
  align-items: center;

  background: ${colors.wine};
  color: ${colors.white};

  border-radius: 32px 0 0 32px;
  overflow: hidden;
  isolation: isolate;

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

  .left-content {
    position: relative;
    z-index: 2;
    width: 100%;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  @media (max-width: 1100px) {
    width: 36%;
    padding: 43px 30px;
  }

  @media (max-width: 900px) {
    padding: 40px 27px;
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: 0;
    padding: 35px 30px 32px;
    border-radius: 26px 26px 0 0;
  }

  @media (max-width: 480px) {
    padding: 29px 20px 26px;
    border-radius: 22px 22px 0 0;
  }
`;

/* Símbolo de aspas duplas acima do texto */
export const QuoteIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  margin: 0 0 16px;

  color: ${colors.yellow};

  svg {
    width: 46px;
    height: 46px;
    display: block;
  }

  @media (max-width: 768px) {
    margin-bottom: 12px;

    svg {
      width: 38px;
      height: 38px;
    }
  }

  @media (max-width: 480px) {
    margin-bottom: 10px;

    svg {
      width: 32px;
      height: 32px;
    }
  }
`;

export const SectionTitle = styled.h2`
  width: 100%;
  max-width: 390px;
  margin: 0 0 32px;

  color: #fff;
  font-size: clamp(1.8rem, 2.8vw, 2.4rem);
  font-weight: 700;
  line-height: 1.25;
  text-align: center;

  border: none;
  text-decoration: none;

  &::before,
  &::after {
    display: none !important;
    content: none !important;
  }

  @media (max-width: 768px) {
    margin-bottom: 26px;
    font-size: 1.9rem;
  }

  @media (max-width: 480px) {
    margin-bottom: 22px;
    font-size: 1.6rem;
  }
`;

/* ============================================================
   EQUALIZADOR (no lugar da imagem)
============================================================ */

export const EqualizerArea = styled.div`
  width: 100%;
  max-width: 390px;

  display: flex;
  align-items: flex-end;
  gap: 4px;

  pointer-events: none;
  user-select: none;

  @media (max-width: 1100px) {
    max-width: 320px;
    gap: 3px;
  }

  @media (max-width: 768px) {
    max-width: 350px;
  }

  @media (max-width: 480px) {
    max-width: 280px;
    gap: 3px;
  }
`;

export const EqualizerColumn = styled.div`
  flex: 1;
  min-width: 0;

  display: flex;
  flex-direction: column-reverse;
  align-items: center;

  gap: 4px;

  @media (max-width: 1100px) {
    gap: 3px;
  }

  @media (max-width: 480px) {
    gap: 3px;
  }
`;

export const EqualizerPixel = styled.div`
  width: 100%;
  aspect-ratio: 1;
  flex-shrink: 0;

  border-radius: 2px;

  background: ${colors.yellow};
  opacity: 0;
`;

export const RightSide = styled.div`
  width: 64%;
  min-width: 0;

  display: flex;
  align-items: flex-start;
  justify-content: center;

  padding: 68px 60px 55px;
  background: ${colors.white};
  border-radius: 0 32px 32px 0;

  .form-area {
    width: 100%;
    max-width: 700px;
  }

  .form-header {
    margin: 0 0 38px;

    h2 {
      margin: 0;
      color: ${colors.red};
      font-size: clamp(1.7rem, 2.5vw, 2.15rem);
      font-weight: 700;
      line-height: 1.2;
    }

    p {
      margin: 12px 0 0;
      color: #777;
      font-size: 1.5rem;
      line-height: 1.6;
    }
  }

  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
  }

  .loading {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;

    color: #777;
    min-height: 300px;

    p {
      margin: 0;
      font-size: 1.1rem;
    }
  }

  .loading-spinner {
    width: 34px;
    height: 34px;

    border: 3px solid ${colors.cream};
    border-top-color: ${colors.red};
    border-radius: 50%;

    animation: loadingSpin 0.75s linear infinite;
  }

  @keyframes loadingSpin {
    to {
      transform: rotate(360deg);
    }
  }

  @media (max-width: 1100px) {
    width: 64%;
    padding: 60px 45px 50px;

    .form-area {
      max-width: 680px;
    }

    .form-header {
      margin-bottom: 34px;

      p {
        font-size: 1.25rem;
      }
    }
  }

  @media (max-width: 900px) {
    padding: 55px 35px 45px;

    .form-header p {
      font-size: 1.15rem;
    }
  }

  @media (max-width: 768px) {
    width: 100%;
    padding: 52px 30px 40px;
    border-radius: 0 0 26px 26px;

    .form-area {
      max-width: 650px;
    }

    .form-header {
      margin-bottom: 32px;

      h2 {
        font-size: 1.8rem;
      }

      p {
        font-size: 1.1rem;
        line-height: 1.55;
      }
    }
  }

  @media (max-width: 600px) {
    padding: 45px 22px 35px;

    .form-row {
      grid-template-columns: 1fr;
      gap: 12px;
    }

    .form-header {
      margin-bottom: 28px;

      h2 {
        font-size: 1.65rem;
      }

      p {
        font-size: 1rem;
      }
    }
  }

  @media (max-width: 480px) {
    padding: 40px 17px 30px;
    border-radius: 0 0 22px 22px;

    .form-header {
      margin-bottom: 27px;

      h2 {
        font-size: 1.5rem;
      }

      p {
        font-size: 0.95rem;
      }
    }
  }
`;

export const Form = styled.form`
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 15px;

  .form-message {
    width: 100%;
    padding: 13px 15px;

    border-radius: 10px;

    text-align: center;
    font-size: 1rem;
    line-height: 1.5;

    animation: messageAppear 0.2s ease;
  }

  .form-message.error {
    color: #a51d1d;
    background: rgba(198, 40, 40, 0.07);
    border: 1px solid rgba(198, 40, 40, 0.12);
  }

  .form-message.success {
    color: #2e7d32;
    background: rgba(46, 125, 50, 0.07);
    border: 1px solid rgba(46, 125, 50, 0.12);
  }

  @keyframes messageAppear {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (max-width: 768px) {
    gap: 13px;
  }

  @media (max-width: 480px) {
    gap: 11px;
  }
`;

export const InputWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 76px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 68px;
  }

  @media (max-width: 480px) {
    height: 64px;
  }
`;

export const InputLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 25px;
  z-index: 2;

  color: #8f855c;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;

  pointer-events: none;
  transition: color 0.25s ease;

  @media (max-width: 768px) {
    top: 9px;
    left: 20px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    top: 8px;
    left: 18px;
    font-size: 0.85rem;
  }
`;

export const Input = styled.input`
  display: block;
  width: 100%;
  height: 76px;

  padding: 30px 25px 8px;

  border: 2px solid ${colors.yellow};
  border-radius: 16px;
  outline: none;

  background: ${colors.input};
  color: #111;

  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 500;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &::placeholder {
    color: transparent;
  }

  &:hover {
    background: #fffaf0;
    border-color: ${colors.yellowStrong};
  }

  &:focus {
    border-color: ${colors.yellowStrong};
    background: #fffbe6;

    box-shadow:
      0 7px 22px rgba(249, 190, 6, 0.11);
  }

  @media (max-width: 768px) {
    height: 68px;
    padding: 27px 20px 7px;
    border-radius: 14px;
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    height: 64px;
    padding: 25px 18px 6px;
    border-radius: 12px;
    font-size: 1rem;
  }
`;

/* ============================================================
   SELECT CUSTOMIZADO (lista no estilo do NotaForm)
============================================================ */

export const SelectWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 76px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    height: 68px;
  }

  @media (max-width: 480px) {
    height: 64px;
  }
`;

/* a lista precisa ficar por cima dos campos seguintes */
export const CustomSelectWrapper = styled(SelectWrapper)`
  z-index: ${({ $open }) => ($open ? 30 : 1)};
`;

export const SelectLabel = styled.label`
  position: absolute;
  top: 10px;
  left: 25px;
  z-index: 2;

  color: #8f855c;
  font-size: 1rem;
  font-weight: 500;
  line-height: 1;

  pointer-events: none;

  @media (max-width: 768px) {
    top: 9px;
    left: 20px;
    font-size: 0.9rem;
  }

  @media (max-width: 480px) {
    top: 8px;
    left: 18px;
    font-size: 0.85rem;
  }
`;

export const SelectTrigger = styled.button`
  display: block;
  width: 100%;
  height: 76px;

  padding: 30px 48px 8px 25px;

  border: 2px solid ${colors.yellow};
  border-radius: 16px;
  outline: none;

  background: ${colors.input};
  color: #111;

  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 500;
  text-align: left;

  cursor: pointer;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;

  transition:
    background 0.25s ease,
    border-color 0.25s ease,
    box-shadow 0.25s ease;

  &:hover {
    background: #fffaf0;
    border-color: ${colors.yellowStrong};
  }

  &:focus-visible,
  &[aria-expanded="true"] {
    border-color: ${colors.yellowStrong};
    background: #fffbe6;

    box-shadow:
      0 7px 22px rgba(249, 190, 6, 0.11);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    height: 68px;
    padding: 27px 42px 7px 20px;
    border-radius: 14px;
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    height: 64px;
    padding: 25px 40px 6px 18px;
    border-radius: 12px;
    font-size: 1rem;
  }
`;

export const SelectPlaceholder = styled.span`
  color: #a89768;
  font-weight: 400;
`;

export const SelectChevron = styled.span`
  position: absolute;
  right: 24px;
  top: 34px;

  width: 9px;
  height: 9px;

  border-right: 2px solid ${colors.red};
  border-bottom: 2px solid ${colors.red};

  transform: ${({ $open }) =>
    $open ? "rotate(-135deg) translate(-2px, -2px)" : "rotate(45deg)"};
  transition: transform 0.25s ease;
  pointer-events: none;

  @media (max-width: 768px) {
    right: 20px;
    top: 30px;
  }

  @media (max-width: 480px) {
    right: 18px;
    top: 28px;
  }
`;

export const OptionsList = styled.div`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  z-index: 20;

  max-height: 220px;
  overflow-y: auto;

  margin: 0;
  padding: 6px;

  background: #fff;
  border: 2px solid ${colors.yellow};
  border-radius: 16px;
  box-shadow: 0 14px 32px rgba(87, 17, 17, 0.18);

  animation: optionsAppear 0.18s ease;

  @keyframes optionsAppear {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }

    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const OptionItem = styled.button`
  position: relative;
  display: block;
  width: 100%;
  padding: 12px 14px;

  border: none;
  border-radius: 11px;

  background: ${({ $selected }) => ($selected ? "#fffbe6" : "transparent")};
  color: ${({ $selected }) => ($selected ? "#571111" : "#010000")};

  font-family: inherit;
  font-size: 14px;
  font-weight: ${({ $selected }) => ($selected ? 700 : 500)};
  text-align: left;

  cursor: pointer;
  overflow: hidden;
  isolation: isolate;
  transform: translateZ(0);
  transition: color 0.2s ease, background 0.15s ease;

  /* círculo que se espalha no hover, igual ao do NotaForm */
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
    transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1);
  }

  span {
    position: relative;
    z-index: 2;
  }

  &:hover,
  &[data-active="true"] {
    background: #fff3c4;
    color: #571111;
  }

  &:hover::before {
    transform: translate(-50%, -50%) scale(7);
  }
`;

export const OptionEmpty = styled.div`
  padding: 11px 12px;
  color: #383131;
  font-size: 13px;
`;

export const Button = styled.button`
  --mouse-x: 50%;
  --mouse-y: 50%;

  position: relative;

  width: 100%;
  height: 66px;

  margin-top: 5px;
  padding: 0 25px;

  border: 0;
  border-radius: 17px;

  background: ${colors.yellow};
  color: ${colors.black};

  font-family: inherit;
  font-size: 1.15rem;
  font-weight: 700;

  cursor: pointer;

  overflow: hidden;
  isolation: isolate;

  transition:
    color 0.3s ease,
    transform 0.25s ease,
    box-shadow 0.3s ease;

  &::before {
    content: "";

    position: absolute;

    left: var(--mouse-x);
    top: var(--mouse-y);

    width: 55px;
    height: 55px;

    border-radius: 50%;

    background: ${colors.red};

    pointer-events: none;
    z-index: 0;

    transform:
      translate(-50%, -50%)
      scale(0);

    transition:
      transform 0.6s
      cubic-bezier(0.16, 1, 0.3, 1);
  }

  &.button-hovering::before {
    transform:
      translate(-50%, -50%)
      scale(20);
  }

  &.button-leaving::before {
    transform:
      translate(-50%, -50%)
      scale(0);
  }

  .button-content {
    position: relative;
    z-index: 2;

    display: flex;
    align-items: center;
    justify-content: center;

    color: inherit;
    pointer-events: none;
  }

  &:hover {
    color: ${colors.white};

    transform: translateY(-3px);

    box-shadow:
      0 12px 28px rgba(0, 0, 0, 0.16);
  }

  &:active {
    transform:
      translateY(1px)
      scale(0.98);
  }

  @media (max-width: 768px) {
    height: 60px;
    border-radius: 14px;
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    height: 56px;
    border-radius: 13px;
    font-size: 1rem;
  }
`;

export const AlreadyBox = styled.div`
  width: 100%;
  max-width: 700px;

  display: flex;
  flex-direction: column;
  align-items: center;

  padding: 38px 45px;

  border: 1px solid rgba(255, 219, 83, 0.8);
  border-radius: 22px;

  background: #fff;

  box-shadow:
    0 15px 45px rgba(0, 0, 0, 0.06);

  .success-icon {
    width: 68px;
    height: 68px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin-bottom: 15px;

    border-radius: 50%;
    background: ${colors.cream};

    svg {
      width: 40px;
      height: 40px;
      color: ${colors.yellowStrong};
    }
  }

  @media (max-width: 768px) {
    padding: 32px 28px;
    border-radius: 19px;
  }

  @media (max-width: 480px) {
    padding: 28px 18px;

    .success-icon {
      width: 58px;
      height: 58px;

      svg {
        width: 34px;
        height: 34px;
      }
    }
  }
`;

export const AlreadyTitle = styled.h3`
  margin: 0;

  color: ${colors.red};

  font-size: clamp(1.5rem, 2.5vw, 2rem);
  font-weight: 700;

  text-align: center;
`;

export const AlreadyText = styled.p`
  max-width: 600px;

  margin: 10px 0 25px;

  color: #6d6d6d;

  font-size: 1.15rem;
  line-height: 1.65;

  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.05rem;
  }

  @media (max-width: 480px) {
    font-size: 1rem;
  }
`;

export const AlreadyDetails = styled.div`
  width: 100%;
  max-width: 500px;

  padding: 19px 23px;

  border: 1px solid rgba(255, 219, 83, 0.65);
  border-radius: 15px;

  background: ${colors.cream};

  .detail-header {
    display: flex;
    align-items: center;
    gap: 10px;

    margin-bottom: 14px;

    span {
      flex: 1;
      height: 1px;
      background: rgba(131, 22, 20, 0.14);
    }

    strong {
      color: ${colors.red};
      font-size: 0.9rem;

      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
  }

  .detail-row {
    display: flex;
    align-items: center;
    justify-content: space-between;

    gap: 20px;
    padding: 9px 0;

    border-bottom: 1px solid rgba(131, 22, 20, 0.07);

    &:last-child {
      border-bottom: 0;
      padding-bottom: 0;
    }

    span {
      color: #8c8c8c;
      font-size: 0.95rem;
    }

    strong {
      max-width: 65%;

      color: #222;

      font-size: 1rem;
      font-weight: 600;

      text-align: right;

      overflow-wrap: anywhere;
    }
  }

  @media (max-width: 480px) {
    padding: 15px 16px;

    .detail-header strong {
      font-size: 0.78rem;
    }

    .detail-row {
      span {
        font-size: 0.85rem;
      }

      strong {
        font-size: 0.9rem;
      }
    }
  }
`;

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;

  width: 100%;
  height: 100%;

  z-index: 9999;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 20px;

  background: rgba(17, 17, 17, 0.55);

  backdrop-filter: blur(6px);
  -webkit-backdrop-filter: blur(6px);

  animation: overlayAppear 0.2s ease;

  @keyframes overlayAppear {
    from {
      opacity: 0;
    }

    to {
      opacity: 1;
    }
  }
`;

export const Modal = styled.div`
  width: 500px;
  max-width: 100%;

  padding: 36px;

  border-radius: 22px;

  background: #fff;

  text-align: center;

  box-shadow:
    0 30px 80px rgba(0, 0, 0, 0.25);

  animation:
    modalAppear
    0.3s
    cubic-bezier(0.16, 1, 0.3, 1);

  .modal-icon {
    width: 58px;
    height: 58px;

    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0 auto 16px;

    border-radius: 50%;
    background: ${colors.cream};

    span {
      width: 31px;
      height: 31px;

      display: flex;
      align-items: center;
      justify-content: center;

      border-radius: 50%;

      background: ${colors.yellow};
      color: ${colors.red};

      font-size: 1.1rem;
      font-weight: 800;
    }
  }

  h3 {
    margin: 0 0 9px;

    color: ${colors.red};

    font-size: 1.7rem;
    font-weight: 700;
  }

  > p {
    margin: 0 0 22px;

    color: #777;

    font-size: 1.05rem;
    line-height: 1.6;
  }

  .modal-summary {
    width: 100%;

    margin-bottom: 25px;
    padding: 15px 17px;

    display: flex;
    flex-direction: column;
    gap: 9px;

    border-radius: 13px;

    background: #f8f8f8;

    text-align: left;

    > div {
      display: flex;
      justify-content: space-between;
      align-items: center;

      gap: 15px;

      span {
        color: #888;
        font-size: 0.9rem;
      }

      strong {
        max-width: 65%;

        color: #222;

        font-size: 0.95rem;

        text-align: right;

        overflow-wrap: anywhere;
      }
    }
  }

  @keyframes modalAppear {
    from {
      opacity: 0;

      transform:
        translateY(18px)
        scale(0.96);
    }

    to {
      opacity: 1;

      transform:
        translateY(0)
        scale(1);
    }
  }

  @media (max-width: 600px) {
    padding: 29px 21px;
    border-radius: 19px;

    h3 {
      font-size: 1.45rem;
    }

    > p {
      font-size: 1rem;
    }
  }
`;

export const ModalButtons = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 11px;

  @media (max-width: 400px) {
    grid-template-columns: 1fr;
  }
`;

export const CancelButton = styled.button`
  height: 50px;

  padding: 0 20px;

  border: 1px solid #ddd;
  border-radius: 12px;

  background: #fff;
  color: #333;

  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    border-color 0.2s ease,
    transform 0.2s ease;

  &:hover {
    border-color: #ccc;
    background: #f5f5f5;

    transform: translateY(-2px);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;

export const ConfirmButton = styled.button`
  height: 50px;

  padding: 0 20px;

  border: 0;
  border-radius: 12px;

  background: ${colors.red};
  color: #fff;

  font-family: inherit;
  font-size: 1rem;
  font-weight: 600;

  cursor: pointer;

  transition:
    background 0.2s ease,
    transform 0.2s ease,
    box-shadow 0.2s ease;

  &:hover {
    background: ${colors.wine};

    transform: translateY(-2px);

    box-shadow:
      0 9px 20px rgba(131, 22, 20, 0.2);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 400px) {
    width: 100%;
  }
`;