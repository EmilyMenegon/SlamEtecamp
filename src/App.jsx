import { Routes, Route } from "react-router-dom";

import TelaInicial from "./pages/inicio/telainicial";
import Login from "./pages/login";
import RotaProtegida from "./components/rota/RotaProtegida";

import Home from "./pages/usuario/home";
import Inscricao from "./pages/usuario/inscricao";
import Mural from "./pages/usuario/mural";
import Galeria from "./pages/usuario/galeria";
import Profile from "./pages/usuario/profile";
import EventosUsuario from "./pages/usuario/eventosusuario";
import Notes from "./pages/usuario/notes";

import Inscricaoadm from "./pages/adm/inscricaoadm";
import Inicioadm from "./pages/adm/inicioadm";
import Profileadm from "./pages/adm/profileadm";
import Galeriaadm from "./pages/adm/galeriaadm";
import Eventos from "./pages/adm/eventos";
import Muraladm from "./pages/adm/muraladm";
import TvExibicao from "./pages/adm/tvexibicao";

import Mat from "./pages/mat";

export default function App() {
  return (
    <Routes>
      {/* Páginas públicas */}
      <Route path="/" element={<TelaInicial />} />
      <Route path="/login" element={<Login />} />

      {/* Usuário: aluno e poeta */}
      <Route
        path="/usuario/home"
        element={
          <RotaProtegida tiposPermitidos={["aluno", "poeta"]}>
            <Home />
          </RotaProtegida>
        }
      />

      <Route
        path="/usuario/profile"
        element={
          <RotaProtegida tiposPermitidos={["aluno", "poeta"]}>
            <Profile />
          </RotaProtegida>
        }
      />

      <Route
        path="/usuario/inscricao"
        element={
          <RotaProtegida tiposPermitidos={["aluno", "poeta"]}>
            <Inscricao />
          </RotaProtegida>
        }
      />

      <Route
        path="/usuario/galeria"
        element={
          <RotaProtegida tiposPermitidos={["aluno", "poeta"]}>
            <Galeria />
          </RotaProtegida>
        }
      />

      <Route
        path="/usuario/mural"
        element={
          <RotaProtegida tiposPermitidos={["aluno", "poeta"]}>
            <Mural />
          </RotaProtegida>
        }
      />

      <Route
        path="/usuario/eventosusuario"
        element={
          <RotaProtegida tiposPermitidos={["aluno", "poeta"]}>
            <EventosUsuario />
          </RotaProtegida>
        }
      />

      <Route
        path="/usuario/notes"
        element={
          <RotaProtegida tiposPermitidos={["aluno", "poeta"]}>
            <Notes />
          </RotaProtegida>
        }
      />

      {/* Administrador: organizador */}
      <Route
        path="/adm/inscricaoadm"
        element={
          <RotaProtegida tiposPermitidos={["organizador"]}>
            <Inscricaoadm />
          </RotaProtegida>
        }
      />

      <Route
        path="/adm/inicioadm"
        element={
          <RotaProtegida tiposPermitidos={["organizador"]}>
            <Inicioadm />
          </RotaProtegida>
        }
      />

      <Route
        path="/adm/profileadm"
        element={
          <RotaProtegida tiposPermitidos={["organizador"]}>
            <Profileadm />
          </RotaProtegida>
        }
      />

      <Route
        path="/adm/galeriaadm"
        element={
          <RotaProtegida tiposPermitidos={["organizador"]}>
            <Galeriaadm />
          </RotaProtegida>
        }
      />

      <Route
        path="/adm/eventos"
        element={
          <RotaProtegida tiposPermitidos={["organizador"]}>
            <Eventos />
          </RotaProtegida>
        }
      />

      <Route
        path="/adm/tvexibicao"
        element={
          <RotaProtegida tiposPermitidos={["organizador"]}>
            <TvExibicao />
          </RotaProtegida>
        }
      />

      <Route
        path="/adm/muraladm"
        element={
          <RotaProtegida tiposPermitidos={["organizador"]}>
            <Muraladm />
          </RotaProtegida>
        }
      />

      {/* Sistema MAT: matemático */}
      <Route
        path="/mat"
        element={
          <RotaProtegida tiposPermitidos={["matematico"]}>
            <Mat />
          </RotaProtegida>
        }
      />
    </Routes>
  );
}