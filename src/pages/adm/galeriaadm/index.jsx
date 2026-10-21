import { useEffect, useRef, useState } from "react";
import Layoutadm from "../../../components/Layoutadm";
import { getUsuarioLogado, getAuthHeaders } from "../../../utils/auth";
import { descobrirAno, ANO_MINIMO } from "../../../utils/ano";
import VideoThumb from "../../../components/VideoThumb";
import {
  FiPlus,
  FiX,
  FiTrash2,
  FiImage,
  FiChevronLeft,
  FiChevronRight,
  FiCalendar,
  FiStar,
  FiFolderPlus,
  FiAlertTriangle,
  FiCheck,
} from "react-icons/fi";
import {
  Page,
  Content,
  Header,
  Title,
  Subtitle,
  Bloco,
  BlocoHeader,
  BlocoIcone,
  BlocoInfo,
  BlocoTitulo,
  BlocoDescricao,
  BlocoContador,
  Gallery,
  FixedGallery,
  Card,
  ImageBox,
  PinBadge,
  SlotVazio,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  FloatingButton,
  AddMenuBackdrop,
  AddMenu,
  AddMenuItem,
  AddMenuIcon,
  AddMenuText,
  Modal,
  ModalContent,
  ModalImage,
  CloseButton,
  NavButton,
  DeleteButton,
  AvisoOverlay,
  AvisoModal,
  AvisoIcon,
  AvisoButton,
  AvisoActions,
  AvisoCancelButton,
  AvisoConfirmButton,
  YearsWrapper,
  YearsContainer,
  YearArrow,
  YearCard,
  YearIcon,
  YearNumber,
  YearDescription,
} from "./style";

const API_URL = "http://localhost:3001";
const LIMITE_FIXADAS = 5;

function ehVideo(arquivoBase64) {
  return (
    typeof arquivoBase64 === "string" &&
    arquivoBase64.startsWith("data:video")
  );
}

function ehFixada(foto) {
  return Boolean(foto?.fixada);
}

function arquivoParaBase64(arquivo) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(arquivo);
  });
}

const handleButtonMouseMove = (event) => {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  button.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
  button.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
};

function BlocoPagina({ icone, titulo, descricao, extra, children }) {
  return (
    <Bloco>
      <BlocoHeader>
        <BlocoIcone>{icone}</BlocoIcone>
        <BlocoInfo>
          <BlocoTitulo>{titulo}</BlocoTitulo>
          <BlocoDescricao>{descricao}</BlocoDescricao>
        </BlocoInfo>
        {extra}
      </BlocoHeader>
      {children}
    </Bloco>
  );
}

function MidiaThumb({ foto, alt }) {
  return ehVideo(foto.imagem) ? (
    <VideoThumb src={foto.imagem} />
  ) : (
    <img src={foto.imagem} alt={alt} loading="lazy" />
  );
}

export default function Galeriaadm() {
  const [fotos, setFotos] = useState([]);
  // Card de aviso: { titulo, texto } ou null
  const [aviso, setAviso] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [carregando, setCarregando] = useState(true);

  // { lista: "fixadas" | "album", indice: number } ou null
  const [visualizando, setVisualizando] = useState(null);
  const [imagemParaExcluir, setImagemParaExcluir] = useState(null);
  const [menuAberto, setMenuAberto] = useState(false);

  const [anoInicial, setAnoInicial] = useState(ANO_MINIMO);
  const [anoSelecionado, setAnoSelecionado] = useState(ANO_MINIMO);

  const fileInputRef = useRef(null);
  const tipoUploadRef = useRef("album");

  const anosVisiveis = Array.from({ length: 3 }, (_, i) => anoInicial + i);

  function mostrarAviso(titulo, texto) {
    setAviso({ titulo, texto });
  }

  /* ---------- Listas derivadas ---------- */

  const fotosFixadas = fotos.filter(ehFixada);
  const fotosAlbum = fotos.filter((foto) => !ehFixada(foto));
  const fotosDoAno = fotosAlbum.filter(
    (foto) => descobrirAno(foto) === anoSelecionado
  );

  const vagasFixadas = Math.max(0, LIMITE_FIXADAS - fotosFixadas.length);
  const slotsVazios = Array.from({ length: vagasFixadas });

  const listaAberta =
    visualizando?.lista === "fixadas" ? fotosFixadas : fotosDoAno;

  const imagemSelecionada =
    visualizando && listaAberta[visualizando.indice]
      ? listaAberta[visualizando.indice]
      : null;

  function quantidadePorAno(ano) {
    return fotosAlbum.filter((foto) => descobrirAno(foto) === ano).length;
  }

  /* ---------- Carregamento ---------- */

  useEffect(() => {
    carregarFotos();
  }, []);

  function carregarFotos() {
    setCarregando(true);

    fetch(`${API_URL}/galeria`, { headers: getAuthHeaders() })
      .then((res) => res.json())
      .then((data) => {
        setFotos(Array.isArray(data) ? data : []);
      })
      .catch(() => {
        mostrarAviso(
          "Não foi possível carregar",
          "Não foi possível carregar a galeria."
        );
      })
      .finally(() => {
        setCarregando(false);
      });
  }

  /* ---------- Anos ---------- */

  function avancarAnos() {
    const novoAno = anoInicial + 3;
    setAnoInicial(novoAno);
    setAnoSelecionado(novoAno);
    setVisualizando(null);
  }

  function voltarAnos() {
    const novoAno = Math.max(ANO_MINIMO, anoInicial - 3);
    setAnoInicial(novoAno);
    setAnoSelecionado(novoAno);
    setVisualizando(null);
  }

  function selecionarAno(ano) {
    setAnoSelecionado(ano);
    setVisualizando(null);
  }

  /* ---------- Adicionar ---------- */

  function alternarMenu() {
    setMenuAberto((aberto) => !aberto);
  }

  function escolherTipo(tipo) {
    if (tipo === "fixada" && vagasFixadas === 0) return;

    tipoUploadRef.current = tipo;
    setMenuAberto(false);
    fileInputRef.current?.click();
  }

  const adicionarImagem = async (e) => {
    let arquivos = Array.from(e.target.files);
    const fixada = tipoUploadRef.current === "fixada";

    if (!arquivos.length) return;

    let avisoExcedente = "";

    if (fixada) {
      if (vagasFixadas === 0) {
        mostrarAviso(
          "Limite atingido",
          `O limite de ${LIMITE_FIXADAS} imagens fixadas já foi atingido.`
        );
        e.target.value = "";
        return;
      }

      if (arquivos.length > vagasFixadas) {
        arquivos = arquivos.slice(0, vagasFixadas);
        avisoExcedente = `Só havia ${vagasFixadas} ${
          vagasFixadas === 1 ? "vaga" : "vagas"
        } para imagens fixadas. Os arquivos excedentes foram ignorados.`;
      }
    }

    setEnviando(true);

    try {
      const usuarioLogado = getUsuarioLogado();

      const base64s = await Promise.all(
        arquivos.map((arquivo) => arquivoParaBase64(arquivo))
      );

      const res = await fetch(`${API_URL}/galeria`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          ...getAuthHeaders(),
        },
        body: JSON.stringify({
          email: usuarioLogado.email,
          fotos: base64s,
          fixada,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        mostrarAviso(
          "Não foi possível enviar",
          data.erro || "Erro ao enviar os arquivos."
        );
        return;
      }

      const novas = (Array.isArray(data) ? data : []).map((foto) => ({
        ...foto,
        fixada: fixada ? 1 : 0,
      }));

      setFotos((prev) => [...novas, ...prev]);

      if (avisoExcedente) {
        mostrarAviso("Alguns arquivos foram ignorados", avisoExcedente);
      }
    } catch (err) {
      console.error(err);
      mostrarAviso(
        "Não foi possível enviar",
        "Não foi possível enviar os arquivos. Se for um vídeo grande, tente um arquivo menor."
      );
    } finally {
      setEnviando(false);
      e.target.value = "";
    }
  };

  /* ---------- Visualização ---------- */

  function abrirImagem(lista, foto) {
    const origem = lista === "fixadas" ? fotosFixadas : fotosDoAno;
    const indice = origem.findIndex((item) => item.id === foto.id);
    if (indice >= 0) setVisualizando({ lista, indice });
  }

  function fecharImagem() {
    setVisualizando(null);
  }

  function irParaAnterior() {
    if (!visualizando || listaAberta.length === 0) return;

    setVisualizando((atual) => ({
      ...atual,
      indice: atual.indice === 0 ? listaAberta.length - 1 : atual.indice - 1,
    }));
  }

  function irParaProxima() {
    if (!visualizando || listaAberta.length === 0) return;

    setVisualizando((atual) => ({
      ...atual,
      indice: atual.indice === listaAberta.length - 1 ? 0 : atual.indice + 1,
    }));
  }

  /* ---------- Exclusão ---------- */

  const pedirExclusao = (foto) => {
    setImagemParaExcluir(foto);
  };

  const cancelarExclusao = () => {
    setImagemParaExcluir(null);
  };

  const confirmarExclusao = async () => {
    if (!imagemParaExcluir) return;

    try {
      const res = await fetch(`${API_URL}/galeria/${imagemParaExcluir.id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error();

      setFotos((prev) =>
        prev.filter((foto) => foto.id !== imagemParaExcluir.id)
      );

      if (imagemSelecionada?.id === imagemParaExcluir.id) {
        setVisualizando(null);
      }
    } catch {
      mostrarAviso(
        "Não foi possível excluir",
        "Não foi possível excluir o arquivo."
      );
    } finally {
      setImagemParaExcluir(null);
    }
  };

  /* ---------- Teclado ---------- */

  useEffect(() => {
    function handleKeyDown(event) {
      // O aviso tem prioridade sobre todo o resto.
      if (aviso) {
        if (event.key === "Escape") setAviso(null);
        return;
      }

      if (imagemParaExcluir) {
        if (event.key === "Escape") cancelarExclusao();
        return;
      }

      if (imagemSelecionada) {
        if (event.key === "Escape") fecharImagem();
        if (event.key === "ArrowLeft") irParaAnterior();
        if (event.key === "ArrowRight") irParaProxima();
        return;
      }

      if (menuAberto && event.key === "Escape") setMenuAberto(false);
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [aviso, imagemSelecionada, imagemParaExcluir, visualizando, listaAberta, menuAberto]);

  /* ---------- Render ---------- */

  function renderCard(foto, lista, fixada = false) {
    return (
      <Card key={foto.id}>
        <ImageBox onClick={() => abrirImagem(lista, foto)}>
          <MidiaThumb foto={foto} alt="Imagem da galeria" />
        </ImageBox>

        {fixada && (
          <PinBadge>
            <FiStar />
            Fixada
          </PinBadge>
        )}

        <DeleteButton
          type="button"
          onMouseMove={handleButtonMouseMove}
          onClick={(event) => {
            event.stopPropagation();
            pedirExclusao(foto);
          }}
          aria-label="Excluir arquivo"
          title="Excluir arquivo"
        >
          <FiTrash2 />
        </DeleteButton>
      </Card>
    );
  }

  return (
    <Page>
      <Layoutadm />

      <Content>
        <Header>
          <Title>Galeria</Title>
          <Subtitle>
            Confira os melhores momentos registrados durante o evento.
          </Subtitle>
        </Header>

        <BlocoPagina
          icone={<FiStar />}
          titulo="Imagens fixadas"
          descricao="Estas imagens também aparecem na tela inicial, antes do login."
          extra={
            <BlocoContador $cheio={vagasFixadas === 0}>
              {fotosFixadas.length}/{LIMITE_FIXADAS}
            </BlocoContador>
          }
        >
          {carregando ? (
            <EmptyState>
              <EmptyIcon>
                <FiImage />
              </EmptyIcon>
              <EmptyTitle>Carregando imagens...</EmptyTitle>
            </EmptyState>
          ) : (
            <FixedGallery>
              {fotosFixadas.map((foto) => renderCard(foto, "fixadas", true))}

              {slotsVazios.map((_, index) => (
                <SlotVazio
                  key={`vaga-${index}`}
                  type="button"
                  onMouseMove={handleButtonMouseMove}
                  onClick={() => escolherTipo("fixada")}
                  aria-label="Adicionar imagem fixada"
                >
                  <FiPlus />
                  <span>Vaga livre</span>
                </SlotVazio>
              ))}
            </FixedGallery>
          )}
        </BlocoPagina>

        <BlocoPagina
          icone={<FiCalendar />}
          titulo="Ano do álbum"
          descricao="Escolha o ano que deseja visualizar."
        >
          <YearsWrapper>
            <YearArrow
              type="button"
              onClick={voltarAnos}
              onMouseMove={handleButtonMouseMove}
              disabled={anoInicial === ANO_MINIMO}
              aria-label="Anos anteriores"
            >
              <span className="buttonContent">
                <FiChevronLeft />
              </span>
            </YearArrow>

            <YearsContainer>
              {anosVisiveis.map((ano) => {
                const quantidade = quantidadePorAno(ano);
                const ativo = anoSelecionado === ano;

                return (
                  <YearCard
                    key={ano}
                    type="button"
                    $active={ativo}
                    onClick={() => selecionarAno(ano)}
                    onMouseMove={handleButtonMouseMove}
                  >
                    <YearIcon $active={ativo}>
                      <FiCalendar />
                    </YearIcon>

                    <YearNumber $active={ativo}>{ano}</YearNumber>

                    <YearDescription $active={ativo}>
                      {quantidade === 0
                        ? "Nenhum arquivo"
                        : quantidade === 1
                        ? "1 arquivo"
                        : `${quantidade} arquivos`}
                    </YearDescription>
                  </YearCard>
                );
              })}
            </YearsContainer>

            <YearArrow
              type="button"
              onClick={avancarAnos}
              onMouseMove={handleButtonMouseMove}
              aria-label="Próximos anos"
            >
              <span className="buttonContent">
                <FiChevronRight />
              </span>
            </YearArrow>
          </YearsWrapper>
        </BlocoPagina>

        <BlocoPagina
          icone={<FiImage />}
          titulo={`Álbum de ${anoSelecionado}`}
          descricao="Fotos e vídeos publicados na galeria do ano selecionado."
          extra={
            <BlocoContador>
              {fotosDoAno.length}{" "}
              {fotosDoAno.length === 1 ? "arquivo" : "arquivos"}
            </BlocoContador>
          }
        >
          <Gallery>
            {carregando ? (
              <EmptyState>
                <EmptyIcon>
                  <FiImage />
                </EmptyIcon>
                <EmptyTitle>Carregando galeria...</EmptyTitle>
              </EmptyState>
            ) : fotosDoAno.length === 0 ? (
              <EmptyState>
                <EmptyIcon>
                  <FiImage />
                </EmptyIcon>
                <EmptyTitle>Nenhuma foto ou vídeo disponível</EmptyTitle>
                <EmptyText>
                  Não existem arquivos publicados no álbum de {anoSelecionado}.
                </EmptyText>
              </EmptyState>
            ) : (
              fotosDoAno.map((foto) => renderCard(foto, "album"))
            )}
          </Gallery>
        </BlocoPagina>
      </Content>

      {menuAberto && <AddMenuBackdrop onClick={() => setMenuAberto(false)} />}

      {menuAberto && (
        <AddMenu role="menu">
          <AddMenuItem
            type="button"
            role="menuitem"
            onMouseMove={handleButtonMouseMove}
            onClick={() => escolherTipo("album")}
          >
            <AddMenuIcon>
              <FiFolderPlus />
            </AddMenuIcon>
            <AddMenuText>
              <strong>Adicionar ao álbum do ano</strong>
              <small>Foto ou vídeo entra na galeria de um ano.</small>
            </AddMenuText>
          </AddMenuItem>

          <AddMenuItem
            type="button"
            role="menuitem"
            onMouseMove={handleButtonMouseMove}
            onClick={() => escolherTipo("fixada")}
            disabled={vagasFixadas === 0}
          >
            <AddMenuIcon>
              <FiStar />
            </AddMenuIcon>
            <AddMenuText>
              <strong>Adicionar imagem fixada</strong>
              <small>
                {vagasFixadas === 0
                  ? `Limite de ${LIMITE_FIXADAS} imagens atingido.`
                  : `Aparece na tela inicial. ${vagasFixadas} ${
                      vagasFixadas === 1 ? "vaga livre" : "vagas livres"
                    }.`}
              </small>
            </AddMenuText>
          </AddMenuItem>
        </AddMenu>
      )}

      <FloatingButton
        type="button"
        $open={menuAberto}
        onMouseMove={handleButtonMouseMove}
        onClick={alternarMenu}
        aria-label="Adicionar imagens ou vídeos"
        aria-expanded={menuAberto}
        title="Adicionar imagens ou vídeos"
        disabled={enviando}
      >
        <span className="buttonContent">
          <FiPlus />
        </span>
      </FloatingButton>

      <input
        type="file"
        accept="image/*,video/*"
        multiple
        ref={fileInputRef}
        hidden
        onChange={adicionarImagem}
      />

      {imagemSelecionada && (
        <Modal
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              fecharImagem();
            }
          }}
        >
          <ModalContent>
            <CloseButton
              type="button"
              onMouseMove={handleButtonMouseMove}
              onClick={fecharImagem}
              aria-label="Fechar visualização"
              title="Fechar"
            >
              <FiX />
            </CloseButton>

            {listaAberta.length > 1 && (
              <NavButton
                type="button"
                $direction="left"
                onMouseMove={handleButtonMouseMove}
                onClick={(event) => {
                  event.stopPropagation();
                  irParaAnterior();
                }}
                aria-label="Anterior"
                title="Anterior"
              >
                <FiChevronLeft />
              </NavButton>
            )}

            {ehVideo(imagemSelecionada.imagem) ? (
              <video
                src={imagemSelecionada.imagem}
                controls
                autoPlay
                playsInline
                onClick={(event) => event.stopPropagation()}
                style={{
                  maxWidth: "90vw",
                  maxHeight: "88vh",
                  borderRadius: "15px",
                  boxShadow: "0 20px 60px rgba(0,0,0,.4)",
                }}
              />
            ) : (
              <ModalImage
                src={imagemSelecionada.imagem}
                alt="Imagem ampliada"
                onClick={(event) => event.stopPropagation()}
              />
            )}

            {listaAberta.length > 1 && (
              <NavButton
                type="button"
                $direction="right"
                onMouseMove={handleButtonMouseMove}
                onClick={(event) => {
                  event.stopPropagation();
                  irParaProxima();
                }}
                aria-label="Próximo"
                title="Próximo"
              >
                <FiChevronRight />
              </NavButton>
            )}
          </ModalContent>
        </Modal>
      )}

      {/* EXCLUIR ARQUIVO - mesma interface do modal "Sair da conta?" */}
      {imagemParaExcluir && (
        <AvisoOverlay
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              cancelarExclusao();
            }
          }}
        >
          <AvisoModal
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="excluir-arquivo-titulo"
            aria-describedby="excluir-arquivo-texto"
          >
            <AvisoIcon>
              <FiTrash2 />
            </AvisoIcon>

            <h3 id="excluir-arquivo-titulo">Excluir arquivo</h3>

            <p id="excluir-arquivo-texto">
              {ehFixada(imagemParaExcluir)
                ? "Tem certeza que deseja excluir esta imagem fixada? Ela também deixará de aparecer na tela inicial."
                : "Tem certeza que deseja excluir este arquivo? Essa ação não pode ser desfeita."}
            </p>

            <AvisoActions>
              <AvisoCancelButton
                type="button"
                onMouseMove={handleButtonMouseMove}
                onClick={cancelarExclusao}
              >
                <span className="buttonContent">
                  <FiX />
                  Cancelar
                </span>
              </AvisoCancelButton>

              <AvisoConfirmButton
                type="button"
                onMouseMove={handleButtonMouseMove}
                onClick={confirmarExclusao}
                autoFocus
              >
                <span className="buttonContent">
                  <FiTrash2 />
                  Sim, excluir
                </span>
              </AvisoConfirmButton>
            </AvisoActions>
          </AvisoModal>
        </AvisoOverlay>
      )}

      {/* AVISOS (erros e limites) - mesma interface do modal "Sair da conta?" */}
      {aviso && (
        <AvisoOverlay
          $alto
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              setAviso(null);
            }
          }}
        >
          <AvisoModal
            role="alertdialog"
            aria-modal="true"
            aria-labelledby="aviso-titulo"
            aria-describedby="aviso-texto"
          >
            <AvisoIcon>
              <FiAlertTriangle />
            </AvisoIcon>

            <h3 id="aviso-titulo">{aviso.titulo}</h3>

            <p id="aviso-texto">{aviso.texto}</p>

            <AvisoButton
              type="button"
              onMouseMove={handleButtonMouseMove}
              onClick={() => setAviso(null)}
              autoFocus
            >
              <span className="buttonContent">
                <FiCheck />
                Entendi
              </span>
            </AvisoButton>
          </AvisoModal>
        </AvisoOverlay>
      )}
    </Page>
  );
}