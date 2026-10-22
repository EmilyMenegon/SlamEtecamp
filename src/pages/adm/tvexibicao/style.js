import styled, { keyframes } from "styled-components";

const aparecer = keyframes`
  from {
    opacity: 0;
    transform: translateY(25px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const aparecerPoeta = keyframes`
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
`;

const flutuar = keyframes`
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  50% {
    transform: translateY(-10px) rotate(3deg);
  }
`;

export const Tela = styled.main`
  position: fixed;
  inset: 0;
  width: 100%;
  height: 100vh;
  height: 100dvh;
  min-width: 0;
  min-height: 0;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background: #fff7d0;
  color: #010000;
  font-family: "Poppins", Arial, sans-serif;
  display: flex;
  align-items: center;
  justify-content: center;
  isolation: isolate;
  box-sizing: border-box;

  &::before {
    content: "";
    position: absolute;
    width: 55vw;
    height: 55vw;
    max-width: 800px;
    max-height: 800px;
    min-width: 280px;
    min-height: 280px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    background: #ffdb53;
    border-radius: 50%;
    opacity: 0.55;
    z-index: -2;
  }

  &::after {
    content: "";
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    height: clamp(5px, 0.6vh, 10px);
    background: #831614;
    z-index: 20;
  }

  @media (max-width: 700px) {
    &::before {
      width: 90vw;
      height: 90vw;
    }
  }
`;

export const ControlesTela = styled.div`
  position: absolute;
  top: clamp(12px, 2vh, 24px);
  left: clamp(12px, 2vw, 28px);
  right: clamp(12px, 2vw, 28px);
  display: flex;
  align-items: center;
  justify-content: space-between;
  z-index: 50;
  pointer-events: none;
`;

export const BotaoControle = styled.button`
  pointer-events: auto;
  width: clamp(40px, 3vw, 50px);
  height: clamp(40px, 3vw, 50px);
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #010000;
  background: #fff;
  color: #010000;
  padding: 0;
  border-radius: 50%;
  font-family: "Poppins", Arial, sans-serif;
  font-size: clamp(18px, 1.4vw, 24px);
  font-weight: 900;
  cursor: pointer;
  box-shadow: 4px 4px 0 #831614;
  transition:
    transform 0.15s ease,
    box-shadow 0.15s ease,
    background 0.15s ease;

  &:hover {
    background: #ffdb53;
    transform: translate(-1px, -1px);
    box-shadow: 5px 5px 0 #831614;
  }

  &:active {
    transform: translate(2px, 2px);
    box-shadow: 2px 2px 0 #831614;
  }

  @media (max-width: 700px) {
    width: 36px;
    height: 36px;
    font-size: 17px;
    box-shadow: 3px 3px 0 #831614;
  }
`;

export const IconeCasa = styled.svg`
  width: clamp(18px, 1.5vw, 23px);
  height: clamp(18px, 1.5vw, 23px);
  display: block;
  fill: #010000;
  stroke: none;
  pointer-events: none;
`;

export const Pixel01 = styled.img`
  position: absolute;
  width: clamp(60px, 10vw, 160px);
  max-height: 20vh;
  top: clamp(12px, 5vh, 55px);
  left: clamp(10px, 5vw, 70px);
  object-fit: contain;
  z-index: 3;
  animation: ${flutuar} 4s ease-in-out infinite;
  filter:
    drop-shadow(7px 7px 0 #fff)
    drop-shadow(10px 10px 0 #ffdb53);

  @media (max-width: 700px) {
    width: clamp(50px, 18vw, 100px);
    top: 2%;
    left: 3%;
  }

  @media (max-height: 650px) {
    width: clamp(55px, 8vw, 110px);
    top: 3%;
  }
`;

export const Pixel02 = styled.img`
  position: absolute;
  width: clamp(65px, 11vw, 180px);
  max-height: 20vh;
  top: clamp(15px, 7vh, 70px);
  right: clamp(10px, 5vw, 70px);
  object-fit: contain;
  z-index: 3;
  animation: ${flutuar} 4.5s ease-in-out infinite reverse;
  filter:
    drop-shadow(-7px 7px 0 #fff)
    drop-shadow(-10px 10px 0 #ffdb53);

  @media (max-width: 700px) {
    width: clamp(55px, 20vw, 105px);
    top: 3%;
    right: 3%;
  }

  @media (max-height: 650px) {
    width: clamp(60px, 9vw, 120px);
    top: 4%;
  }
`;

export const Pixel03 = styled.img`
  position: absolute;
  width: clamp(60px, 10vw, 160px);
  max-height: 20vh;
  bottom: clamp(80px, 28vh, 240px);
  left: clamp(10px, 3vw, 45px);
  object-fit: contain;
  z-index: 3;
  animation: ${flutuar} 5s ease-in-out infinite;
  filter:
    drop-shadow(7px 7px 0 #fff)
    drop-shadow(10px 10px 0 #ffdb53);

  @media (max-width: 700px) {
    width: clamp(50px, 17vw, 95px);
    bottom: 18%;
    left: 2%;
  }

  @media (max-height: 650px) {
    width: clamp(50px, 8vw, 105px);
    bottom: 20%;
  }
`;

export const Pixel01Extra = styled.img`
  position: absolute;
  width: clamp(40px, 6vw, 100px);
  max-height: 15vh;
  top: 27%;
  left: 1.5%;
  object-fit: contain;
  z-index: 1;
  opacity: 0.95;
  animation: ${flutuar} 5.5s ease-in-out infinite 0.5s;
  filter: drop-shadow(4px 5px 0 #ffdb53);

  @media (max-width: 700px) {
    width: clamp(35px, 11vw, 65px);
    top: 25%;
  }

  @media (max-height: 650px) {
    display: none;
  }
`;

export const Pixel02Extra = styled.img`
  position: absolute;
  width: clamp(45px, 7vw, 115px);
  max-height: 15vh;
  bottom: 25%;
  right: 2%;
  object-fit: contain;
  z-index: 3;
  opacity: 0.95;
  animation: ${flutuar} 4.8s ease-in-out infinite 0.8s;
  filter: drop-shadow(-5px 5px 0 #ffdb53);

  @media (max-width: 700px) {
    width: clamp(35px, 12vw, 70px);
    bottom: 18%;
  }

  @media (max-height: 650px) {
    width: clamp(40px, 6vw, 80px);
    bottom: 17%;
  }
`;

export const Pixel03Extra = styled.img`
  position: absolute;
  width: clamp(35px, 5vw, 85px);
  max-height: 12vh;
  top: 22%;
  right: 17%;
  object-fit: contain;
  z-index: 1;
  opacity: 0.9;
  animation: ${flutuar} 6s ease-in-out infinite 1s;
  filter: drop-shadow(4px 4px 0 #ffdb53);

  @media (max-width: 700px) {
    display: none;
  }

  @media (max-height: 650px) {
    display: none;
  }
`;

export const Conteudo = styled.div`
  width: min(92vw, 1550px);
  height: 90vh;
  max-height: 920px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: clamp(18px, 4vh, 56px);
  /* reserva o espaço do título no topo: nome e notas nunca encostam nele */
  padding-top: clamp(80px, 14vh, 150px);
  z-index: 5;
  animation: ${aparecer} 0.7s ease;
  box-sizing: border-box;

  @media (max-width: 700px) {
    width: 92vw;
    height: 91vh;
  }

  @media (max-height: 650px) {
    width: 90vw;
    height: 90vh;
  }
`;

export const Cabecalho = styled.header`
  /* fixo no topo do conteúdo, separado do nome do poeta e das notas */
  position: absolute;
  top: 3vh; /* altura do título: maior = mais baixo, menor ou negativo = mais alto */
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

export const Titulo = styled.h1`
  margin: 0;
  padding:
    clamp(8px, 1.2vh, 14px)
    clamp(18px, 2.5vw, 32px);
  background: #010000;
  color: #fff;
  border-radius: clamp(8px, 1vw, 12px);
  font-size: clamp(18px, 3vw, 44px);
  line-height: 1;
  font-weight: 900;
  letter-spacing: clamp(1px, 0.2vw, 2px);
  text-transform: uppercase;
  box-shadow:
    clamp(5px, 0.6vw, 9px)
    clamp(5px, 0.6vw, 9px)
    0
    #831614;
  transform: rotate(-1deg);
  white-space: nowrap;

  span {
    color: #ffdb53;
  }

  @media (max-width: 700px) {
    font-size: clamp(15px, 5vw, 28px);
    padding: 8px 14px;
  }

  @media (max-height: 650px) {
    font-size: clamp(16px, 2.8vw, 30px);
    padding: 7px 18px;
  }
`;

export const AreaPoeta = styled.section`
  width: 100%;
  flex: 0 0 auto;
  min-height: clamp(130px, 19vh, 220px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  position: relative;
  padding: 0;
  margin-bottom: clamp(24px, 6vh, 80px);
  box-sizing: border-box;
`;

export const LabelPoeta = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding:
    clamp(5px, 0.7vh, 8px)
    clamp(15px, 2vw, 24px);
  margin-bottom: clamp(7px, 1vh, 12px);
  background: #831614;
  color: #fff;
  border-radius: 30px;
  font-size: clamp(10px, 1vw, 17px);
  font-weight: 900;
  letter-spacing: clamp(1.5px, 0.2vw, 3px);
  text-transform: uppercase;
  box-shadow:
    clamp(3px, 0.4vw, 5px)
    clamp(3px, 0.4vw, 5px)
    0
    #010000;
`;

export const NomePoeta = styled.div`
  position: relative;
  width: fit-content;
  max-width: 84vw;
  max-height: 26vh;
  padding:
    clamp(8px, 1.2vh, 14px)
    clamp(18px, 2.8vw, 34px);
  background: #fff;
  color: #831614;
  border:
    clamp(3px, 0.35vw, 5px)
    solid
    #010000;
  border-radius: clamp(10px, 1vw, 16px);
  font-size: clamp(54px, calc(2.5vw + 3.2vh), 88px);
  line-height: 0.95;
  font-weight: 900;
  letter-spacing: clamp(-3px, -0.25vw, -1px);
  text-transform: uppercase;
  box-shadow:
    clamp(6px, 0.6vw, 10px)
    clamp(6px, 0.6vw, 10px)
    0
    #ffdb53,
    clamp(12px, 1.2vw, 20px)
    clamp(12px, 1.2vw, 20px)
    0
    #010000;
  word-break: break-word;
  overflow-wrap: anywhere;
  animation: ${aparecerPoeta} 0.55s ease forwards;

  @media (max-width: 700px) {
    max-width: 82vw;
    max-height: 22vh;
    font-size: clamp(44px, 10vw, 64px);
    padding: 8px 15px;
    box-shadow: 6px 6px 0 #ffdb53, 12px 12px 0 #010000;
  }

  @media (max-height: 650px) {
    max-height: 22vh;
    font-size: clamp(50px, 4.6vw, 72px);
    padding: 6px 16px;
  }

  @media (max-height: 500px) {
    font-size: clamp(44px, 4vw, 58px);
  }
`;

export const PoetaAguardando = styled.div`
  max-width: 80vw;
  padding:
    clamp(12px, 2vh, 20px)
    clamp(20px, 3vw, 35px);
  background: #fff;
  color: #831614;
  border:
    clamp(2px, 0.3vw, 4px)
    solid
    #ffdb53;
  border-radius: 15px;
  font-size: clamp(22px, 4vw, 55px);
  font-weight: 900;
  text-transform: uppercase;
  text-align: center;
  box-shadow:
    clamp(5px, 0.6vw, 8px)
    clamp(5px, 0.6vw, 8px)
    0
    #831614;
`;

/* =========================================================
   NOTAS DOS JURADOS (ampliadas; sem rodapé, então sem deslocamento)
   ========================================================= */

export const AreaNotas = styled.section`
  width: min(92vw, 1300px);
  flex: 0 0 auto;
  display: grid;
  grid-template-columns: repeat(5, minmax(0, 1fr));
  align-items: stretch;
  justify-items: stretch;
  gap: clamp(10px, 1.1vw, 20px);
  padding: clamp(5px, 0.8vh, 9px);
  box-sizing: border-box;
  position: relative;
  animation: ${aparecer} 0.5s ease both;

  @media (max-width: 1100px) {
    width: min(92vw, 950px);
    gap: 9px;
  }

  @media (max-width: 850px) {
    width: min(88vw, 660px);
    display: flex;
    flex-wrap: wrap;
    align-items: stretch;
    justify-content: center;
    gap: 9px;
  }

  @media (max-width: 600px) {
    width: min(86vw, 440px);
    gap: 9px;
  }
`;

export const CardJurado = styled.div`
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: clamp(180px, 22vh, 250px);
  padding:
    clamp(14px, 1.8vh, 24px)
    clamp(7px, 0.9vw, 14px)
    clamp(14px, 2vh, 24px);
  background: rgba(255, 255, 255, 0.92);
  border:
    clamp(2px, 0.25vw, 3px)
    solid
    #010000;
  border-radius: clamp(10px, 1vw, 16px);
  box-shadow:
    clamp(3px, 0.45vw, 6px)
    clamp(3px, 0.45vw, 6px)
    0
    #831614;
  box-sizing: border-box;
  text-align: center;
  overflow: hidden;
  animation: ${aparecerPoeta} 0.45s ease both;

  @media (min-width: 851px) {
    flex: 1 1 0;
    max-width: 260px;
  }

  @media (max-width: 850px) {
    width: calc((100% - 18px) / 3);
    flex: 0 0 calc((100% - 18px) / 3);
    min-height: 160px;
  }

  @media (max-width: 600px) {
    width: calc((100% - 9px) / 2);
    flex: 0 0 calc((100% - 9px) / 2);
    min-height: 140px;
    border-radius: 10px;
    padding: 9px 5px 12px;
    box-shadow: 3px 3px 0 #831614;
  }

  @media (max-height: 650px) {
    min-height: 140px;
  }
`;

export const NumeroJurado = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  padding:
    clamp(6px, 0.8vh, 9px)
    clamp(11px, 1.1vw, 17px);
  margin-bottom: clamp(4px, 0.7vh, 8px);
  background: #831614;
  color: #fff7d0;
  border-radius: 999px;
  font-size: clamp(11px, 1vw, 16px);
  font-weight: 900;
  letter-spacing: clamp(0.5px, 0.08vw, 1.2px);
  line-height: 1;
  text-transform: uppercase;
  white-space: nowrap;

  &::before {
    content: "";
    width: clamp(5px, 0.4vw, 6px);
    height: clamp(5px, 0.4vw, 6px);
    margin-right: clamp(3px, 0.35vw, 5px);
    background: #ffdb53;
    border-radius: 50%;
    flex-shrink: 0;
  }

  @media (max-width: 850px) {
    font-size: clamp(9px, 1.6vw, 13px);
    padding: 5px 8px;
  }

  @media (max-width: 600px) {
    font-size: clamp(8px, 2.1vw, 11px);
    padding: 5px 7px;
  }
`;

export const Nota = styled.div`
  color: #010000;
  font-size: clamp(54px, 6vw, 96px);
  line-height: 0.9;
  font-weight: 900;
  letter-spacing: -0.04em;
  text-align: center;
  text-shadow: none;
  transform: none;
  white-space: nowrap;
  animation: ${aparecerPoeta} 0.4s ease both;

  @media (max-width: 1100px) {
    font-size: clamp(50px, 6.4vw, 80px);
  }

  @media (max-width: 850px) {
    font-size: clamp(50px, 9.5vw, 78px);
  }

  @media (max-width: 600px) {
    font-size: clamp(44px, 15vw, 62px);
  }

  @media (max-height: 650px) and (min-width: 851px) {
    font-size: clamp(50px, 5.8vw, 80px);
  }

  @media (max-height: 500px) and (min-width: 851px) {
    font-size: clamp(42px, 5vw, 64px);
  }
`;

export const NotaVazia = styled.div`
  color: #831614;
  font-size: clamp(54px, 6vw, 96px);
  line-height: 0.9;
  font-weight: 900;
  opacity: 0.3;

  @media (max-width: 1100px) {
    font-size: clamp(50px, 6.4vw, 80px);
  }

  @media (max-width: 850px) {
    font-size: clamp(50px, 9.5vw, 78px);
  }

  @media (max-width: 600px) {
    font-size: clamp(44px, 15vw, 62px);
  }

  @media (max-height: 650px) and (min-width: 851px) {
    font-size: clamp(50px, 5.8vw, 80px);
  }

  @media (max-height: 500px) and (min-width: 851px) {
    font-size: clamp(42px, 5vw, 64px);
  }
`;