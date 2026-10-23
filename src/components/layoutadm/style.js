import styled from "styled-components";
import { NavLink, Link } from "react-router-dom";

/* =====================================================
   HEADER
===================================================== */

export const Header = styled.header`
  width: 100%;

  display: flex;

  align-items: center;

  justify-content: center;

  padding: 28px 4% 0;

  box-sizing: border-box;

  position: relative;

  z-index: 100;

  @media (max-width: 1000px) {
    padding: 24px 3%;
  }

  @media (max-width: 700px) {
    padding: 20px 4%;
  }
`;

/* =====================================================
   NAVBAR
   (grid de 3 colunas: logo | menu | perfil
    -> o menu fica sempre no centro exato da navbar)
===================================================== */

export const Navbar = styled.nav`
  width: min(1450px, 94vw);

  min-height: 96px;

  display: grid;

  grid-template-columns: 1fr auto 1fr;

  align-items: center;

  position: relative;

  background: #ffdb53;

  border: 1px solid rgba(255, 255, 255, 0.5);

  border-radius: 48px;

  padding: 10px 22px;

  box-sizing: border-box;

  box-shadow:
    0 16px 40px rgba(0, 0, 0, 0.09),
    0 5px 14px rgba(0, 0, 0, 0.06);

  backdrop-filter: blur(12px);

  -webkit-backdrop-filter: blur(12px);

  gap: 20px;

  @media (max-width: 1200px) {
    width: 94vw;

    min-height: 90px;

    border-radius: 40px;

    padding: 9px 18px;

    gap: 14px;
  }

  @media (max-width: 1000px) {
    min-height: 82px;

    border-radius: 34px;

    padding: 8px 15px;

    gap: 10px;
  }

  @media (max-width: 700px) {
    width: 100%;

    min-height: 64px;

    height: 64px;

    border-radius: 22px;

    padding: 6px 8px;

    gap: 8px;

    display: flex;

    justify-content: flex-start;
  }

  @media (max-width: 500px) {
    min-height: 60px;

    height: 60px;

    border-radius: 20px;

    padding: 5px 7px;
  }
`;

export const Logo = styled(Link)`
  width: 190px;

  height: 82px;

  flex-shrink: 0;

  justify-self: start;

  display: flex;

  align-items: center;

  justify-content: center;

  text-decoration: none;

  box-sizing: border-box;

  overflow: hidden;

  z-index: 5;

  padding: 5px;

  img {
    width: 100%;

    height: 100%;

    display: block;

    object-fit: contain;

    object-position: center;

    transform: none;

    max-width: 100%;

    max-height: 100%;

    user-select: none;

    pointer-events: none;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.35);

    outline-offset: 4px;

    border-radius: 15px;
  }

  @media (max-width: 1200px) {
    width: 165px;

    height: 74px;

    padding: 4px;
  }

  @media (max-width: 1000px) {
    width: 140px;

    height: 66px;

    padding: 4px;
  }

  /* =================================================
     MOBILE
  ================================================= */

  @media (max-width: 700px) {
    display: none;
  }
`;

/* =====================================================
   NAV CENTER
===================================================== */

export const NavCenter = styled.div`
  justify-self: center;

  min-width: 0;

  height: 76px;

  display: flex;

  align-items: center;

  justify-content: center;

  gap: 6px;

  padding: 0 8px;

  box-sizing: border-box;

  position: relative;

  isolation: isolate;

  & > span {
    position: absolute;

    top: 0;

    left: 0;

    width: 0;

    height: 0;

    display: block;

    background-color: #111;

    opacity: 1;

    border-radius: 58px;

    z-index: 0;

    pointer-events: none;

    will-change:
      transform,
      width,
      height;

    transition: none;

    box-shadow:
      0 8px 20px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: 1200px) {
    gap: 4px;

    padding: 0 5px;
  }

  @media (max-width: 1000px) {
    height: 66px;

    gap: 3px;

    padding: 0 3px;
  }

  @media (max-width: 700px) {
    position: absolute;

    top: calc(100% + 12px);

    right: 0;

    width: 250px;

    height: auto;

    padding: 12px;

    display: flex;

    flex-direction: column;

    align-items: stretch;

    justify-content: flex-start;

    gap: 5px;

    background: #ffdb53;

    border-radius: 22px;

    box-shadow:
      0 18px 40px rgba(0, 0, 0, 0.14);

    z-index: 1000;

    opacity: ${({ $open }) =>
      $open ? 1 : 0};

    visibility: ${({ $open }) =>
      $open ? "visible" : "hidden"};

    pointer-events: ${({ $open }) =>
      $open ? "auto" : "none"};

    transform: ${({ $open }) =>
      $open
        ? "translateY(0)"
        : "translateY(-10px)"};

    transition:
      opacity 0.25s ease,
      transform 0.25s ease,
      visibility 0.25s ease;

    & > span {
      display: none;
    }
  }
`;

/* =====================================================
   NAV ITEM
===================================================== */

export const NavItem = styled(NavLink)`
  position: relative;

  z-index: 1;

  min-height: 58px;

  padding: 0 22px;

  display: flex;

  align-items: center;

  justify-content: center;

  text-align: center;

  box-sizing: border-box;

  border-radius: 18px;

  color: #111;

  text-decoration: none;

  font-size: 18px;

  font-weight: 600;

  letter-spacing: 0.1px;

  white-space: nowrap;

  transition: none;

  &:hover {
    color: #fff;
  }

  &.active {
    color: #fff;
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.35);

    outline-offset: 3px;
  }

  @media (max-width: 1200px) {
    min-height: 54px;

    padding: 0 17px;

    font-size: 17px;

    border-radius: 16px;
  }

  @media (max-width: 1000px) {
    min-height: 50px;

    padding: 0 12px;

    font-size: 15px;

    border-radius: 15px;
  }

  @media (max-width: 700px) {
    width: 100%;

    min-height: 46px;

    padding: 0 17px;

    justify-content: flex-start;

    text-align: left;

    font-size: 16px;

    border-radius: 13px;

    color: #111;

    &:hover {
      color: #111;

      transform: none;
    }

    &.active {
      color: #fff;

      background: #111;
    }
  }
`;

/* =====================================================
   PERFIL - LADO DIREITO
===================================================== */

export const ProfileIcon = styled(Link)`
  width: 68px;

  height: 68px;

  flex-shrink: 0;

  justify-self: end;

  display: flex;

  align-items: center;

  justify-content: center;

  border-radius: 50%;

  box-sizing: border-box;

  overflow: hidden;

  text-decoration: none;

  background: ${({ $comFoto }) =>
    $comFoto
      ? "#fff"
      : "#111"};

  border: 3px solid #111;

  box-shadow:
    0 8px 22px rgba(0, 0, 0, 0.14);

  transition:
    transform 0.25s ease,
    box-shadow 0.25s ease;

  z-index: 5;

  svg {
    color: #fff;

    font-size: 25px;
  }

  &:hover {
    transform: scale(1.08);

    box-shadow:
      0 12px 28px rgba(0, 0, 0, 0.18);
  }

  &:focus-visible {
    outline: 3px solid #ffdb53;

    outline-offset: 4px;
  }

  @media (max-width: 1000px) {
    width: 62px;

    height: 62px;

    svg {
      font-size: 22px;
    }
  }

  /* =================================================
     MOBILE
  ================================================= */

  @media (max-width: 700px) {
    width: 52px;

    height: 52px;

    margin-right: auto;

    order: -1;

    svg {
      font-size: 19px;
    }
  }

  @media (max-width: 500px) {
    width: 48px;

    height: 48px;

    svg {
      font-size: 17px;
    }
  }
`;

/* =====================================================
   FOTO DE PERFIL
===================================================== */

export const ProfilePhoto = styled.img`
  width: 100%;

  height: 100%;

  display: block;

  object-fit: cover;

  border-radius: 50%;

  user-select: none;

  pointer-events: none;
`;

/* =====================================================
   BOTÃO MOBILE
===================================================== */

export const MenuButton = styled.button`
  display: none;

  width: 52px;

  height: 52px;

  flex-shrink: 0;

  padding: 0;

  border: none;

  border-radius: 15px;

  background: rgba(255, 255, 255, 0.35);

  cursor: pointer;

  align-items: center;

  justify-content: center;

  flex-direction: column;

  gap: 6px;

  box-sizing: border-box;

  span {
    width: 25px;

    height: 3px;

    display: block;

    border-radius: 10px;

    background: #111;

    transition:
      transform 0.25s ease,
      opacity 0.2s ease,
      background 0.2s ease;
  }

  ${({ $open }) =>
    $open &&
    `
      span:nth-child(1) {
        transform:
          translateY(9px)
          rotate(45deg);
      }

      span:nth-child(2) {
        opacity: 0;
      }

      span:nth-child(3) {
        transform:
          translateY(-9px)
          rotate(-45deg);
      }
    `}

  &:hover {
    background: #111;

    span {
      background: #fff;
    }
  }

  &:focus-visible {
    outline: 3px solid rgba(0, 0, 0, 0.35);

    outline-offset: 3px;
  }

  @media (max-width: 700px) {
    display: flex;
  }

  @media (max-width: 500px) {
    width: 46px;

    height: 46px;

    span {
      width: 23px;
    }
  }
`;