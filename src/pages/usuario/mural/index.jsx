import { useEffect, useState } from "react";

import Layout from "../../../components/Layout";
import { apiFetch } from "../../../utils/auth";

import {
  FiFileText,
  FiX,
} from "react-icons/fi";

import {
  Page,
  Content,
  Header,
  Title,
  Subtitle,
  Cards,

  PostIt,
  PostItTitle,
  PostItMessage,
  PostItFooter,
  ReadMore,
  PostDate,

  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,

  ModalOverlay,
  FullPostIt,
  FullPostItContent,
  FullPostItTitle,
  FullPostItMessage,
  CloseButton,
} from "./style";


const API_URL = "http://localhost:3001";


export default function Mural() {

  const [posts, setPosts] = useState([]);

  const [postSelecionado, setPostSelecionado] =
    useState(null);


  // =====================================================
  // POSIÇÃO DO MOUSE
  // =====================================================

  const handleButtonMouseMove = (e) => {

    const button = e.currentTarget;

    const rect =
      button.getBoundingClientRect();

    button.style.setProperty(
      "--mouse-x",
      `${e.clientX - rect.left}px`
    );

    button.style.setProperty(
      "--mouse-y",
      `${e.clientY - rect.top}px`
    );

  };


  // =====================================================
  // CARREGAR POSTS
  // =====================================================

  function carregarPosts() {

    apiFetch(`${API_URL}/mural`)

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

  }


  // =====================================================
  // CARREGAMENTO
  // =====================================================

  useEffect(() => {

    carregarPosts();

    const intervalo =
      setInterval(
        carregarPosts,
        3000
      );

    return () => {

      clearInterval(intervalo);

    };

  }, []);


  // =====================================================
  // ABRIR POST
  // =====================================================

  function abrirPost(post) {

    setPostSelecionado(post);

  }


  // =====================================================
  // FECHAR POST
  // =====================================================

  function fecharPost() {

    setPostSelecionado(null);

  }


  // =====================================================
  // ESC
  // =====================================================

  useEffect(() => {

    function handleKeyDown(event) {

      if (
        event.key === "Escape"
      ) {

        fecharPost();

      }

    }

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

  }, []);


  // =====================================================
  // FORMATAR DATA
  // =====================================================

  const formatarData = (data) => {

    if (!data) {
      return "";
    }

    const dataObj = new Date(data);

    if (Number.isNaN(dataObj.getTime())) {
      return "";
    }

    return dataObj.toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      }
    );

  };


  // =====================================================
  // RENDER
  // =====================================================

  return (

    <Page>

      <Layout />

      <Content>

        {/* HEADER */}

        <Header>

          <Title>
            Mural de avisos
          </Title>

          <Subtitle>
            Confira os avisos e mensagens
            sobre o evento.
          </Subtitle>

        </Header>


        {/* =================================================
            CARDS
        ================================================= */}

        <Cards>

          {posts.length === 0 ? (

            <EmptyState>

              <EmptyIcon>
                <FiFileText />
              </EmptyIcon>

              <EmptyTitle>
                Nenhum aviso disponível
              </EmptyTitle>

              <EmptyText>
                No momento não existem
                mensagens publicadas no mural.
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
                    "#ffcf70"
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

                  {/* TÍTULO */}

                  <PostItTitle>

                    {post.titulo}

                  </PostItTitle>


                  {/* MENSAGEM */}

                  <PostItMessage>

                    {
                      post.mensagem ||
                      post.descricao ||
                      ""
                    }

                  </PostItMessage>


                  {/* RODAPÉ */}

                  <PostItFooter>

                    <ReadMore>
                      Clique para visualizar
                    </ReadMore>

                    {formatarData(
                      post.data_publicacao ||
                      post.dataPublicacao ||
                      post.created_at ||
                      post.createdAt ||
                      post.data_criacao ||
                      post.dataCriacao
                    ) && (

                      <PostDate>

                        Publicado em{" "}

                        {formatarData(
                          post.data_publicacao ||
                          post.dataPublicacao ||
                          post.created_at ||
                          post.createdAt ||
                          post.data_criacao ||
                          post.dataCriacao
                        )}

                      </PostDate>

                    )}

                  </PostItFooter>

                </PostIt>

              )
            )

          )}

        </Cards>

      </Content>


      {/* =================================================
          MODAL
      ================================================= */}

      {postSelecionado && (

        <ModalOverlay

          onClick={(event) => {

            if (
              event.target ===
              event.currentTarget
            ) {

              fecharPost();

            }

          }}

        >

          <FullPostIt
            $color={
              postSelecionado.cor ||
              "#ffcf70"
            }
          >

            <CloseButton
              type="button"

              onClick={
                fecharPost
              }

              onMouseMove={
                handleButtonMouseMove
              }

              aria-label="Fechar mensagem"

            >

              <span className="buttonContent">

                <FiX />

              </span>

            </CloseButton>


            <FullPostItContent>

              <FullPostItTitle>

                {
                  postSelecionado.titulo
                }

              </FullPostItTitle>


              <FullPostItMessage>

                {
                  postSelecionado.mensagem ||
                  postSelecionado.descricao ||
                  ""
                }

              </FullPostItMessage>

            </FullPostItContent>

          </FullPostIt>

        </ModalOverlay>

      )}

    </Page>

  );

}