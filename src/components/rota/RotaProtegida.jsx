import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { getUsuarioLogado } from "../../utils/auth";

export default function RotaProtegida({ children, tiposPermitidos }) {
  const usuario = getUsuarioLogado();
  const logado = !!usuario;

  /*
    A seta "voltar" do navegador não sai da área logada.

    O Chrome/Edge ignoram entradas de histórico criadas por uma página
    que o usuário ainda não tocou. Por isso o bloqueio é "armado" na
    primeira interação (clique, toque ou tecla), criando duas entradas.
    A cada "voltar", uma entrada é recriada para sempre sobrar uma.
  */
  useEffect(() => {
    if (!logado) return;

    let armado = false;

    const armar = () => {
      if (armado) return;
      armado = true;

      window.history.pushState(null, "", window.location.href);
      window.history.pushState(null, "", window.location.href);

      window.removeEventListener("pointerdown", armar);
      window.removeEventListener("keydown", armar);
    };

    if (navigator.userActivation?.hasBeenActive) {
      armar();
    } else {
      window.addEventListener("pointerdown", armar);
      window.addEventListener("keydown", armar);
    }

    const onPop = () => {
      if (!armado) return;

      window.history.pushState(null, "", window.location.href);
      window.dispatchEvent(new Event("voltar-bloqueado"));
    };

    window.addEventListener("popstate", onPop);

    return () => {
      window.removeEventListener("popstate", onPop);
      window.removeEventListener("pointerdown", armar);
      window.removeEventListener("keydown", armar);
    };
  }, [logado]);

  // bfcache: o navegador restaura a página sem rodar o React de novo
  useEffect(() => {
    const onShow = (e) => {
      if (e.persisted && !getUsuarioLogado()) {
        window.location.replace("/login");
      }
    };

    window.addEventListener("pageshow", onShow);
    return () => window.removeEventListener("pageshow", onShow);
  }, []);

  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  if (tiposPermitidos && !tiposPermitidos.includes(usuario.tipo)) {
    // não mande para /login: como o login redireciona quem já está logado, viraria loop
    return <Navigate to="/" replace />;
  }

  return children;
}