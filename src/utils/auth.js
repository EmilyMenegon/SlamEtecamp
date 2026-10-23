const CHAVE_STORAGE = "usuario_logado";

function lerPayload(token) {
  try {
    const base64 = token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/");
    return JSON.parse(atob(base64));
  } catch {
    return null;
  }
}

function tokenExpirado(token) {
  const payload = lerPayload(token);
  if (!payload?.exp) return true;
  return payload.exp * 1000 < Date.now();
}

export function salvarUsuarioLogado(usuario) {
  localStorage.setItem(CHAVE_STORAGE, JSON.stringify(usuario));
}

export function logout() {
  localStorage.removeItem(CHAVE_STORAGE);
  localStorage.removeItem("token"); // sobra do login antigo
}

export function getUsuarioLogado() {
  const dados = localStorage.getItem(CHAVE_STORAGE);

  if (!dados) return null;

  try {
    const usuario = JSON.parse(dados);

    if (!usuario?.token || tokenExpirado(usuario.token)) {
      logout();
      return null;
    }

    return usuario;
  } catch (err) {
    logout();
    return null;
  }
}

export function getToken() {
  const usuario = getUsuarioLogado();
  return usuario?.token || null;
}

export function getAuthHeaders() {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// fetch que já manda o token e derruba a sessão se o servidor responder 401
export async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    ...options,
    headers: { ...getAuthHeaders(), ...(options.headers || {}) },
  });

  if (res.status === 401) {
    logout();
    window.location.replace("/login");
  }

  return res;
}