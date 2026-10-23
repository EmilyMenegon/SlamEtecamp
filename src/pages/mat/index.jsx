import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaPlus, FaCheckCircle, FaPaperPlane } from "react-icons/fa";
import { logout, apiFetch } from "../../utils/auth";
import NotaCard from "../../components/notacard";
import NotaForm from "../../components/notaform";
import EmptyState from "../../components/EmptyState";
import {
  GlobalStyle,
  Container,
  Header,
  LogoText,
  Title,
  Content,
  BackButton,
  Overlay,
  Modal,
  ModalTitle,
  ModalText,
  Buttons,
  CancelButton,
  DeleteButton,
  List,
  Fab,
  EventoGroup,
  EventoGroupHeader,
  EventoGroupTitle,
  PublishButton,
  PublishedBadge,
  Pixel01,
  Pixel02,
  Pixel03
} from "./style";

const API_URL = "http://localhost:3001";

function handleMouseMove(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();

  button.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  button.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
}

export default function Mat() {
  const navigate = useNavigate();
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [notas, setNotas] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [editingNota, setEditingNota] = useState(null);
  const [deleteModal, setDeleteModal] = useState(false);
  const [idDelete, setIdDelete] = useState(null);
  const [publicando, setPublicando] = useState(null);

  /*
    A seta "voltar" do navegador não sai da tela (o bloqueio fica na
    RotaProtegida): ela só abre o modal de confirmação de saída.
  */
  useEffect(() => {
    const abrir = () => setShowLogoutModal(true);

    window.addEventListener("voltar-bloqueado", abrir);
    return () => window.removeEventListener("voltar-bloqueado", abrir);
  }, []);

  const loadNotas = useCallback(async () => {
    try {
      const res = await apiFetch(`${API_URL}/notas`);

      const data = await res.json();
      setNotas(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    loadNotas();
  }, [loadNotas]);

  const gruposPorEvento = useMemo(() => {
    const grupos = new Map();

    notas.forEach((nota) => {
      const chave = nota.eventoId ?? "sem-evento";

      if (!grupos.has(chave)) {
        grupos.set(chave, {
          eventoId: nota.eventoId,
          eventoNome: nota.eventoNome || "Sem evento",
          notas: []
        });
      }

      grupos.get(chave).notas.push(nota);
    });

    return Array.from(grupos.values());
  }, [notas]);

  async function handleLogout() {
    await logout();
    navigate("/login", { replace: true });
  }

  async function handleSave(payload) {
    try {
      const url = editingNota
        ? `${API_URL}/notas/${editingNota.id}`
        : `${API_URL}/notas`;

      const method = editingNota ? "PUT" : "POST";

      const res = await apiFetch(url, {
        method,
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.erro || "Erro ao salvar a nota.");
        return false;
      }

      setEditingNota(null);
      setFormVisible(false);
      await loadNotas();

      return true;
    } catch (err) {
      console.error(err);
      alert("Não foi possível salvar a nota.");
      return false;
    }
  }

  function handleEdit(nota) {
    setEditingNota(nota);
    setFormVisible(true);
  }

  function closeForm() {
    setFormVisible(false);
    setEditingNota(null);
  }

  function handleDelete(id) {
    setIdDelete(id);
    setDeleteModal(true);
  }

  async function confirmDelete() {
    if (idDelete) {
      try {
        await apiFetch(`${API_URL}/notas/${idDelete}`, {
          method: "DELETE"
        });

        await loadNotas();
      } catch (err) {
        console.error(err);
      }
    }

    setDeleteModal(false);
    setIdDelete(null);
  }

  async function handlePublicar(eventoId) {
    if (!eventoId) return;

    setPublicando(eventoId);

    try {
      const res = await apiFetch(
        `${API_URL}/eventos/${eventoId}/notas/publicar`,
        {
          method: "PUT"
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.erro || "Erro ao publicar os resultados.");
        return;
      }

      await loadNotas();
    } catch (err) {
      console.error(err);
      alert("Não foi possível publicar os resultados.");
    } finally {
      setPublicando(null);
    }
  }

  return (
    <>
      <GlobalStyle />

      <Container>
        <Pixel01 src="/pixel01.png" alt="" />
        <Pixel02 src="/pixel02.png" alt="" />
        <Pixel03 src="/pixel03.png" alt="" />

        <Header>
          <BackButton
            onClick={() => setShowLogoutModal(true)}
            onMouseMove={handleMouseMove}
            aria-label="Sair da conta"
            title="Sair da conta"
          >
            <FaHome />
          </BackButton>

          <LogoText>
            <Title>Notas</Title>
          </LogoText>
        </Header>

        <Content>
          {notas.length === 0 ? (
            <EmptyState message="Nenhuma nota cadastrada" />
          ) : (
            gruposPorEvento.map((grupo) => {
              const todasPublicadas = grupo.notas.every(
                (nota) => nota.publicado
              );

              return (
                <EventoGroup
                  key={grupo.eventoId ?? "sem-evento"}
                >
                  <EventoGroupHeader>
                    <EventoGroupTitle>
                      {grupo.eventoNome}
                    </EventoGroupTitle>

                    {grupo.eventoId &&
                      (todasPublicadas ? (
                        <PublishedBadge>
                          <FaCheckCircle />
                          Publicado
                        </PublishedBadge>
                      ) : (
                        <PublishButton
                          onClick={() => handlePublicar(grupo.eventoId)}
                          onMouseMove={handleMouseMove}
                          disabled={publicando === grupo.eventoId}
                        >
                          <FaPaperPlane />
                          <span>
                            {publicando === grupo.eventoId
                              ? "Publicando..."
                              : `Publicar resultados (${grupo.notas.length})`}
                          </span>
                        </PublishButton>
                      ))}
                  </EventoGroupHeader>

                  <List>
                    {grupo.notas.map((nota) => (
                      <NotaCard
                        key={nota.id}
                        nota={nota}
                        onEdit={handleEdit}
                        onDelete={handleDelete}
                      />
                    ))}
                  </List>
                </EventoGroup>
              );
            })
          )}
        </Content>

        <Fab
          onClick={() => setFormVisible(true)}
          onMouseMove={handleMouseMove}
        >
          <FaPlus />
        </Fab>

        <NotaForm
          visible={formVisible}
          nota={editingNota}
          onClose={closeForm}
          onSave={handleSave}
        />
      </Container>

      {showLogoutModal && (
        <Overlay>
          <Modal>
            <ModalTitle>Sair da conta</ModalTitle>

            <ModalText>
              Tem certeza que deseja sair da sua conta?
            </ModalText>

            <Buttons>
              <CancelButton
                onClick={() => setShowLogoutModal(false)}
                onMouseMove={handleMouseMove}
              >
                <span>Cancelar</span>
              </CancelButton>

              <DeleteButton
                onClick={handleLogout}
                onMouseMove={handleMouseMove}
              >
                <span>Sim, sair</span>
              </DeleteButton>
            </Buttons>
          </Modal>
        </Overlay>
      )}

      {deleteModal && (
        <Overlay>
          <Modal>
            <ModalTitle>Confirmar Exclusão</ModalTitle>

            <ModalText>
              Tem certeza que deseja excluir esta nota?
            </ModalText>

            <Buttons>
              <CancelButton
                onClick={() => setDeleteModal(false)}
                onMouseMove={handleMouseMove}
              >
                <span>Cancelar</span>
              </CancelButton>

              <DeleteButton
                onClick={confirmDelete}
                onMouseMove={handleMouseMove}
              >
                <span>Excluir</span>
              </DeleteButton>
            </Buttons>
          </Modal>
        </Overlay>
      )}
    </>
  );
}