import { useEffect, useState } from "react";

import Layoutadm from "../../../components/Layoutadm";

import {
  FiPlus,
  FiX,
  FiTrash2,
  FiMessageSquare,
  FiEdit3,
} from "react-icons/fi";

import {
  Page,
  Content,
  Header,
  Title,
  Subtitle,
  Mural,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  PostIt,
  PostItTitle,
  PostItMessage,
  PostItFooter,
  ReadMore,
  PostDate,
  FloatingButton,
  CreateOverlay,
  CreateModal,
  CreateHeader,
  CreateTitle,
  CreateCloseButton,
  CreateForm,
  Field,
  Label,
  TitleInput,
  DescriptionInput,
  ColorLabel,
  ColorOptions,
  ColorOption,
  CreateButton,
  ViewOverlay,
  ViewPostIt,
  ViewTopButtons,
  ViewEditButton,
  ViewCloseButton,
  ViewDeleteButton,
  ViewContent,
  ViewTitle,
  ViewDescription,
  DeleteOverlay,
  DeleteModal,
  DeleteIcon,
  ModalButtons,
  CancelButton,
  ConfirmButton,
} from "./style";


// =====================================================
// CONFIG DA API
// =====================================================

const API_URL = "http://localhost:3001";


// =====================================================
// COMPONENTE
// =====================================================

export default function Muraladm() {
  const [posts, setPosts] = useState([]);

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [postSelecionado, setPostSelecionado] =
    useState(null);

  const [postEditando, setPostEditando] =
    useState(null);

  const [postParaExcluir, setPostParaExcluir] =
    useState(null);

  const [titulo, setTitulo] =
    useState("");

  const [descricao, setDescricao] =
    useState("");

  const [corSelecionada, setCorSelecionada] =
    useState("#ffcf70");


  // ===================================================
  // CORES DOS CARDS
  // ===================================================

  const cores = [
    "#ffcf70",
    "#ff9875",
    "#e4ef87",
    "#b18bea",
    "#d7eb85",
    "#19c5df",
    "#9dc9ff",
    "#f29bc3",
  ];


  // ===================================================
  // FORMATA DATA
  // ===================================================

  const formatarData = (data) => {
    if (!data) {
      return "";
    }

    const dataObj = new Date(data);

    if (Number.isNaN(dataObj.getTime())) {
      return "";
    }

    return dataObj.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };


  // ===================================================
  // CABEÇALHOS PADRÃO
  // ===================================================

  function headersPadrao() {
    return {
      "Content-Type": "application/json",

      Authorization:
        `Bearer ${localStorage.getItem("token")}`,
    };
  }


  // ===================================================
  // CARREGAR POSTS
  // ===================================================

  const carregarPosts = () => {
    fetch(`${API_URL}/mural`, {
      headers: {
        Authorization:
          `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error(
            "Erro ao buscar o mural"
          );
        }

        return resposta.json();
      })

      .then((postsSalvos) => {
        if (Array.isArray(postsSalvos)) {
          setPosts(postsSalvos);
        } else {
          setPosts([]);
        }
      })

      .catch((error) => {
        console.error(
          "Erro ao carregar o mural:",
          error
        );

        setPosts([]);
      });
  };


  // ===================================================
  // CARREGAMENTO INICIAL
  // ===================================================

  useEffect(() => {
    carregarPosts();
  }, []);


  // ===================================================
  // ATUALIZAÇÃO PERIÓDICA
  // ===================================================

  useEffect(() => {
    const intervalo = setInterval(
      carregarPosts,
      3000
    );

    return () => {
      clearInterval(intervalo);
    };
  }, []);


  // ===================================================
  // EFEITO DO MOUSE NOS BOTÕES
  // ===================================================

  const handleButtonMouseMove = (event) => {
    const button =
      event.currentTarget;

    const rect =
      button.getBoundingClientRect();

    const x =
      event.clientX - rect.left;

    const y =
      event.clientY - rect.top;

    button.style.setProperty(
      "--mouse-x",
      `${x}px`
    );

    button.style.setProperty(
      "--mouse-y",
      `${y}px`
    );
  };


  // ===================================================
  // ABRIR CRIAÇÃO
  // ===================================================

  const abrirCriacao = () => {
    setPostEditando(null);

    setTitulo("");

    setDescricao("");

    setCorSelecionada("#ffcf70");

    setShowCreateModal(true);
  };


  // ===================================================
  // FECHAR CRIAÇÃO / EDIÇÃO
  // ===================================================

  const fecharCriacao = () => {
    setShowCreateModal(false);

    setPostEditando(null);

    setTitulo("");

    setDescricao("");

    setCorSelecionada("#ffcf70");
  };


  // ===================================================
  // CRIAR POST
  // ===================================================

  const criarPost = (event) => {
    event.preventDefault();

    const tituloLimpo =
      titulo.trim();

    const descricaoLimpa =
      descricao.trim();

    if (!tituloLimpo) {
      return;
    }

    fetch(`${API_URL}/mural`, {
      method: "POST",

      headers:
        headersPadrao(),

      body: JSON.stringify({
        titulo:
          tituloLimpo,

        descricao:
          descricaoLimpa,

        cor:
          corSelecionada,
      }),
    })
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error(
            "Erro ao criar post"
          );
        }

        return resposta.json();
      })

      .then(() => {
        carregarPosts();

        fecharCriacao();
      })

      .catch((error) => {
        console.error(
          "Erro ao criar post:",
          error
        );
      });
  };


  // ===================================================
  // ABRIR POST
  // ===================================================

  const abrirPost = (post) => {
    setPostSelecionado(post);
  };


  // ===================================================
  // FECHAR POST
  // ===================================================

  const fecharPost = () => {
    setPostSelecionado(null);
  };


  // ===================================================
  // INICIAR EDIÇÃO
  // ===================================================

  const iniciarEdicao = (post) => {
    setPostEditando(post);

    setTitulo(
      post.titulo || ""
    );

    setDescricao(
      post.mensagem ||
      post.descricao ||
      ""
    );

    setCorSelecionada(
      post.cor ||
      "#ffcf70"
    );

    setPostSelecionado(null);

    setShowCreateModal(true);
  };


  // ===================================================
  // ATUALIZAR POST
  // ===================================================

  const atualizarPost = (event) => {
    event.preventDefault();

    if (!postEditando) {
      return;
    }

    const tituloLimpo =
      titulo.trim();

    const descricaoLimpa =
      descricao.trim();

    if (!tituloLimpo) {
      return;
    }

    fetch(
      `${API_URL}/mural/${postEditando.id}`,
      {
        method: "PUT",

        headers:
          headersPadrao(),

        body: JSON.stringify({
          titulo:
            tituloLimpo,

          descricao:
            descricaoLimpa,

          cor:
            corSelecionada,
        }),
      }
    )
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error(
            "Erro ao atualizar post"
          );
        }

        return resposta.json();
      })

      .then(() => {
        carregarPosts();

        fecharCriacao();
      })

      .catch((error) => {
        console.error(
          "Erro ao atualizar post:",
          error
        );
      });
  };


  // ===================================================
  // PEDIR EXCLUSÃO
  // ===================================================

  const pedirExclusao = (post) => {
    setPostParaExcluir(post);
  };


  // ===================================================
  // CANCELAR EXCLUSÃO
  // ===================================================

  const cancelarExclusao = () => {
    setPostParaExcluir(null);
  };


  // ===================================================
  // CONFIRMAR EXCLUSÃO
  // ===================================================

  const confirmarExclusao = () => {
    if (!postParaExcluir) {
      return;
    }

    fetch(
      `${API_URL}/mural/${postParaExcluir.id}`,
      {
        method: "DELETE",

        headers: {
          Authorization:
            `Bearer ${localStorage.getItem("token")}`,
        },
      }
    )
      .then((resposta) => {
        if (!resposta.ok) {
          throw new Error(
            "Erro ao excluir post"
          );
        }

        return resposta.json();
      })

      .then(() => {
        carregarPosts();

        setPostParaExcluir(null);

        setPostSelecionado(null);
      })

      .catch((error) => {
        console.error(
          "Erro ao excluir post:",
          error
        );
      });
  };


  // ===================================================
  // TECLA ESC
  // ===================================================

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key !== "Escape") {
        return;
      }

      if (postParaExcluir) {
        setPostParaExcluir(null);
        return;
      }

      if (showCreateModal) {
        fecharCriacao();
        return;
      }

      if (postSelecionado) {
        fecharPost();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    postParaExcluir,
    showCreateModal,
    postSelecionado,
  ]);


  // ===================================================
  // RENDER
  // ===================================================

  return (
    <Page>

      <Layoutadm />

      <Content>

        <Header>

          <Title>
            Mural de avisos
          </Title>

          <Subtitle>
            Deixe seus recados e informações
            importantes para o evento.
          </Subtitle>

        </Header>


        <Mural>

          {posts.length === 0 ? (

            <EmptyState>

              <EmptyIcon>
                <FiMessageSquare />
              </EmptyIcon>

              <EmptyTitle>
                Nenhum recado cadastrado
              </EmptyTitle>

              <EmptyText>
                No momento não existem
                recados publicados no mural.
              </EmptyText>

            </EmptyState>

          ) : (

            posts.map(
              (post, index) => (

                <PostIt
                  key={
                    post.id ||
                    index
                  }

                  $color={
                    post.cor ||
                    cores[
                      index %
                      cores.length
                    ]
                  }

                  onClick={() =>
                    abrirPost(post)
                  }

                  role="button"

                  tabIndex={0}

                  onKeyDown={(event) => {

                    if (
                      event.key === "Enter" ||
                      event.key === " "
                    ) {

                      event.preventDefault();

                      abrirPost(post);

                    }

                  }}
                >

                  <PostItTitle>
                    {post.titulo}
                  </PostItTitle>


                  <PostItMessage>
                    {
                      post.mensagem ||
                      post.descricao ||
                      ""
                    }
                  </PostItMessage>


                  <PostItFooter>

                    <ReadMore>
                      Clique para visualizar
                    </ReadMore>


                    <PostDate>
                      {formatarData(
                        post.data_publicacao ||
                        post.dataPublicacao ||
                        post.created_at ||
                        post.createdAt ||
                        post.data_criacao ||
                        post.dataCriacao
                      )}
                    </PostDate>

                  </PostItFooter>

                </PostIt>

              )
            )

          )}

        </Mural>

      </Content>


      {/* =================================================
          BOTÃO FLUTUANTE
      ================================================= */}

      <FloatingButton
        type="button"

        onClick={
          abrirCriacao
        }

        onMouseMove={
          handleButtonMouseMove
        }

        aria-label="Criar novo recado"

        title="Criar novo recado"
      >

        <span className="buttonContent">

          <FiPlus />

        </span>

      </FloatingButton>


      {/* =================================================
          MODAL CRIAR / EDITAR
      ================================================= */}

      {showCreateModal && (

        <CreateOverlay
          onClick={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              fecharCriacao();

            }

          }}
        >

          <CreateModal>

            <CreateHeader>

              <CreateTitle>

                {postEditando
                  ? "Editar recado"
                  : "Novo recado"}

              </CreateTitle>


              <CreateCloseButton
                type="button"

                onClick={
                  fecharCriacao
                }

                onMouseMove={
                  handleButtonMouseMove
                }

                aria-label="Fechar"

                title="Fechar"
              >

                <span className="buttonContent">

                  <FiX />

                </span>

              </CreateCloseButton>

            </CreateHeader>


            <CreateForm
              onSubmit={
                postEditando
                  ? atualizarPost
                  : criarPost
              }
            >

              <Field>

                <Label>
                  Título
                </Label>

                <TitleInput
                  type="text"

                  value={titulo}

                  onChange={(event) =>
                    setTitulo(
                      event.target.value
                    )
                  }

                  placeholder="Digite o título"

                  maxLength={60}

                  autoFocus
                />

              </Field>


              <Field>

                <Label>
                  Descrição
                </Label>

                <DescriptionInput
                  value={descricao}

                  onChange={(event) =>
                    setDescricao(
                      event.target.value
                    )
                  }

                  placeholder="Digite seu recado..."

                  maxLength={300}
                />

              </Field>


              <Field>

                <ColorLabel>
                  Escolha a cor
                </ColorLabel>


                <ColorOptions>

                  {cores.map(
                    (cor) => (

                      <ColorOption
                        key={cor}

                        type="button"

                        $color={cor}

                        $selected={
                          cor ===
                          corSelecionada
                        }

                        onClick={() =>
                          setCorSelecionada(
                            cor
                          )
                        }

                        aria-label={
                          `Selecionar cor ${cor}`
                        }
                      />

                    )
                  )}

                </ColorOptions>

              </Field>


              <CreateButton
                type="submit"

                disabled={
                  !titulo.trim()
                }

                onMouseMove={
                  handleButtonMouseMove
                }
              >

                <span className="buttonContent">

                  {postEditando
                    ? "Salvar alterações"
                    : "Criar recado"}

                </span>

              </CreateButton>

            </CreateForm>

          </CreateModal>

        </CreateOverlay>

      )}


      {/* =================================================
          VISUALIZAR POST
      ================================================= */}

      {postSelecionado && (

        <ViewOverlay
          onClick={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              fecharPost();

            }

          }}
        >

          <ViewPostIt
            $color={
              postSelecionado.cor ||
              "#ffcf70"
            }
          >

            <ViewTopButtons>

              <ViewEditButton
                type="button"

                onClick={() =>
                  iniciarEdicao(
                    postSelecionado
                  )
                }

                onMouseMove={
                  handleButtonMouseMove
                }

                aria-label="Editar recado"

                title="Editar"
              >

                <span className="buttonContent">

                  <FiEdit3 />

                </span>

              </ViewEditButton>


              <ViewDeleteButton
                type="button"

                onClick={() =>
                  pedirExclusao(
                    postSelecionado
                  )
                }

                onMouseMove={
                  handleButtonMouseMove
                }

                aria-label="Excluir recado"

                title="Excluir"
              >

                <span className="buttonContent">

                  <FiTrash2 />

                </span>

              </ViewDeleteButton>


              <ViewCloseButton
                type="button"

                onClick={
                  fecharPost
                }

                onMouseMove={
                  handleButtonMouseMove
                }

                aria-label="Fechar"

                title="Fechar"
              >

                <span className="buttonContent">

                  <FiX />

                </span>

              </ViewCloseButton>

            </ViewTopButtons>


            <ViewContent>

              <ViewTitle>
                {
                  postSelecionado.titulo
                }
              </ViewTitle>


              <ViewDescription>
                {
                  postSelecionado.mensagem ||
                  postSelecionado.descricao ||
                  ""
                }
              </ViewDescription>


              <PostDate>
                {formatarData(
                  postSelecionado.data_publicacao ||
                  postSelecionado.dataPublicacao ||
                  postSelecionado.created_at ||
                  postSelecionado.createdAt ||
                  postSelecionado.data_criacao ||
                  postSelecionado.dataCriacao
                )}
              </PostDate>

            </ViewContent>

          </ViewPostIt>

        </ViewOverlay>

      )}


      {/* =================================================
          EXCLUSÃO
          (mesma interface do modal "Sair da conta?")
      ================================================= */}

      {postParaExcluir && (

        <DeleteOverlay
          onClick={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              cancelarExclusao();

            }

          }}
        >

          <DeleteModal
            role="alertdialog"

            aria-modal="true"

            aria-labelledby="excluir-recado-titulo"

            aria-describedby="excluir-recado-texto"
          >

            <DeleteIcon>

              <FiTrash2 />

            </DeleteIcon>


            <h3 id="excluir-recado-titulo">
              Excluir recado
            </h3>


            <p id="excluir-recado-texto">
              Tem certeza que deseja
              excluir este recado? Essa ação
              não pode ser desfeita.

              {postParaExcluir.titulo && (
                <strong>
                  {postParaExcluir.titulo}
                </strong>
              )}
            </p>


            <ModalButtons>

              <CancelButton
                type="button"

                onClick={
                  cancelarExclusao
                }

                onMouseMove={
                  handleButtonMouseMove
                }
              >

                <span className="buttonContent">

                  <FiX />

                  Cancelar

                </span>

              </CancelButton>


              <ConfirmButton
                type="button"

                onClick={
                  confirmarExclusao
                }

                onMouseMove={
                  handleButtonMouseMove
                }

                autoFocus
              >

                <span className="buttonContent">

                  <FiTrash2 />

                  Sim, excluir

                </span>

              </ConfirmButton>

            </ModalButtons>

          </DeleteModal>

        </DeleteOverlay>

      )}

    </Page>
  );
}
