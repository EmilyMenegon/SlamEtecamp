
import { useEffect, useState } from "react";

import {
  FiCalendar,
  FiClock,
  FiMapPin,
  FiImage,
  FiX,
  FiAward,
  FiList,
  FiInfo,
  FiChevronLeft,
  FiChevronRight,
} from "react-icons/fi";

import Layout from "../../../components/Layout";
import { descobrirAno, ANO_MINIMO } from "../../../utils/ano";

import {
  Page,
  Content,
  Header,
  TitleArea,
  Title,
  Subtitle,
  Bloco,
  BlocoInterno,
  BlocoHeader,
  BlocoIcone,
  BlocoInfo,
  BlocoTitulo,
  BlocoDescricao,
  BlocoContador,
  ErrorText,
  Cards,
  EventCard,
  EventImage,
  EventImagePlaceholder,
  EventContent,
  EventTitle,
  EventDescription,
  InfoList,
  InfoItem,
  EventFooter,
  AccessButton,
  EmptyState,
  EmptyIcon,
  EmptyTitle,
  EmptyText,
  ModalOverlay,
  Modal,
  ModalHeader,
  ModalTitle,
  CloseButton,
  ModalImage,
  ModalEventTitle,
  ModalDescription,
  ModalInfoList,
  ModalInfoItem,
  RankingTableWrapper,
  RankingTable,
  RankingRow,
  Position,
  ParticipantName,
  Score,
  Average,
  Penalty,
  Time,
  FinalScore,
  RankingEmpty,
  CriteriaBox,
  CriteriaHeader,
  CriteriaTitle,
  CriteriaDescription,
  CriteriaGrid,
  CriteriaItem,
  CriteriaItemTitle,
  CriteriaItemText,
  CriteriaHighlight,
  YearsWrapper,
  YearsContainer,
  YearArrow,
  YearCard,
  YearIcon,
  YearNumber,
  YearDescription,
} from "./style";

const API_URL = "http://localhost:3001";

// No evento, o ano vem da data do próprio evento (não da data de criação).
const CAMPOS_ANO_EVENTO = ["data", "data_evento"];

/* ============================================================
   FUNÇÕES AUXILIARES
============================================================ */

function formatarData(dataEvento) {
  if (!dataEvento) return "";

  const partes = dataEvento.split("-");

  if (partes.length !== 3) return dataEvento;

  return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function formatarTempo(segundos) {
  if (segundos === null || segundos === undefined) return "-";

  const m = Math.floor(segundos / 60);
  const s = Math.floor(segundos % 60);

  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

// Efeito do mouse nos botões (a bolinha acompanha o cursor)
function handleButtonMouseMove(event) {
  const button = event.currentTarget;
  const rect = button.getBoundingClientRect();

  button.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`);
  button.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`);
}

/* ============================================================
   BLOCO (mesma interface das páginas de Inscrições e Galeria)
============================================================ */

function BlocoPagina({ icone, titulo, descricao, extra, interno, children }) {
  const Wrapper = interno ? BlocoInterno : Bloco;

  return (
    <Wrapper>
      <BlocoHeader>
        <BlocoIcone>{icone}</BlocoIcone>
        <BlocoInfo>
          <BlocoTitulo>{titulo}</BlocoTitulo>
          <BlocoDescricao>{descricao}</BlocoDescricao>
        </BlocoInfo>
        {extra}
      </BlocoHeader>
      {children}
    </Wrapper>
  );
}

export default function EventosUsuario() {
  const [eventos, setEventos] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  const [eventoSelecionado, setEventoSelecionado] = useState(null);
  const [resultados, setResultados] = useState([]);

  const [anoInicial, setAnoInicial] = useState(ANO_MINIMO);
  const [anoSelecionado, setAnoSelecionado] = useState(ANO_MINIMO);

  const anosVisiveis = Array.from({ length: 3 }, (_, index) => anoInicial + index);

  const eventosDoAno = eventos.filter(
    (evento) => descobrirAno(evento, CAMPOS_ANO_EVENTO) === anoSelecionado
  );

  function quantidadePorAno(ano) {
    return eventos.filter(
      (evento) => descobrirAno(evento, CAMPOS_ANO_EVENTO) === ano
    ).length;
  }

  /* ---------- Navegação entre anos ---------- */

  function avancarAnos() {
    const novoAno = anoInicial + 3;
    setAnoInicial(novoAno);
    setAnoSelecionado(novoAno);
  }

  function voltarAnos() {
    const novoAno = Math.max(ANO_MINIMO, anoInicial - 3);
    setAnoInicial(novoAno);
    setAnoSelecionado(novoAno);
  }

  function selecionarAno(ano) {
    setAnoSelecionado(ano);
  }

  /* ---------- Carregar eventos ---------- */

  useEffect(() => {
    setCarregando(true);
    setErro("");

    fetch(`${API_URL}/eventos`)
      .then((res) => res.json())
      .then((dados) => {
        setEventos(Array.isArray(dados) ? dados : []);
      })
      .catch(() => {
        setErro("Não foi possível carregar os eventos.");
      })
      .finally(() => {
        setCarregando(false);
      });
  }, []);

  /* ---------- Carregar resultados do evento aberto ---------- */

  useEffect(() => {
    if (!eventoSelecionado) {
      setResultados([]);
      return;
    }

    fetch(`${API_URL}/eventos/${eventoSelecionado.id}/notas`)
      .then((res) => res.json())
      .then((dados) => {
        setResultados(Array.isArray(dados) ? dados : []);
      })
      .catch(() => {
        setResultados([]);
      });
  }, [eventoSelecionado]);

  /* ---------- Abrir / fechar ---------- */

  function abrirEvento(evento) {
    setEventoSelecionado(evento);
  }

  function fecharEvento() {
    setEventoSelecionado(null);
  }

  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setEventoSelecionado(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  /* ---------- Render ---------- */

  return (
    <Page>
      <Layout />

      <Content>
        <Header>
          <TitleArea>
            <Title>Eventos</Title>
            <Subtitle>Confira os próximos eventos.</Subtitle>
          </TitleArea>
        </Header>

        {erro && <ErrorText>{erro}</ErrorText>}

        {/* BLOCO: ANO DOS EVENTOS */}
        <BlocoPagina
          icone={<FiCalendar />}
          titulo="Ano dos eventos"
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
                        ? "Nenhum evento"
                        : quantidade === 1
                        ? "1 evento"
                        : `${quantidade} eventos`}
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

        {/* BLOCO: LISTA DE EVENTOS */}
        <BlocoPagina
          icone={<FiList />}
          titulo={`Eventos de ${anoSelecionado}`}
          descricao="Clique em um evento para ver os detalhes e os resultados."
          extra={
            <BlocoContador>
              {eventosDoAno.length}{" "}
              {eventosDoAno.length === 1 ? "evento" : "eventos"}
            </BlocoContador>
          }
        >
          <Cards>
            {carregando ? (
              <EmptyState>
                <EmptyIcon>
                  <FiCalendar />
                </EmptyIcon>
                <EmptyTitle>Carregando eventos...</EmptyTitle>
              </EmptyState>
            ) : eventosDoAno.length === 0 ? (
              <EmptyState>
                <EmptyIcon>
                  <FiCalendar />
                </EmptyIcon>
                <EmptyTitle>Nenhum evento disponível</EmptyTitle>
                <EmptyText>
                  Não existem eventos cadastrados em {anoSelecionado}.
                </EmptyText>
              </EmptyState>
            ) : (
              eventosDoAno.map((evento) => (
                <EventCard
                  key={evento.id}
                  tabIndex={0}
                  onClick={() => abrirEvento(evento)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") abrirEvento(evento);
                  }}
                >
                  {evento.imagem ? (
                    <EventImage>
                      <img src={evento.imagem} alt={evento.nome} />
                    </EventImage>
                  ) : (
                    <EventImagePlaceholder>
                      <FiImage />
                    </EventImagePlaceholder>
                  )}

                  <EventContent>
                    <EventTitle>{evento.nome}</EventTitle>

                    <EventDescription>{evento.descricao}</EventDescription>

                    <InfoList>
                      <InfoItem>
                        <FiCalendar />
                        <span>{formatarData(evento.data)}</span>
                      </InfoItem>

                      <InfoItem>
                        <FiClock />
                        <span>{evento.horario}</span>
                      </InfoItem>

                      <InfoItem>
                        <FiMapPin />
                        <span>{evento.local}</span>
                      </InfoItem>
                    </InfoList>

                    <EventFooter>
                      <AccessButton
                        type="button"
                        onPointerMove={handleButtonMouseMove}
                        onClick={(event) => {
                          event.stopPropagation();
                          abrirEvento(evento);
                        }}
                      >
                        <span className="buttonContent">Ver evento</span>
                      </AccessButton>
                    </EventFooter>
                  </EventContent>
                </EventCard>
              ))
            )}
          </Cards>
        </BlocoPagina>
      </Content>

      {/* MODAL DO EVENTO */}
      {eventoSelecionado && (
        <ModalOverlay
          onClick={(event) => {
            if (event.target === event.currentTarget) {
              fecharEvento();
            }
          }}
        >
          <Modal>
            <ModalHeader>
              <ModalTitle>Evento</ModalTitle>

              <CloseButton
                type="button"
                onClick={fecharEvento}
                onPointerMove={handleButtonMouseMove}
                aria-label="Fechar evento"
              >
                <span className="buttonContent">
                  <FiX />
                </span>
              </CloseButton>
            </ModalHeader>

            {/* BLOCO: INFORMAÇÕES DO EVENTO */}
            <BlocoPagina
              interno
              icone={<FiInfo />}
              titulo="Informações"
              descricao="Detalhes do evento selecionado."
            >
              {eventoSelecionado.imagem ? (
                <ModalImage>
                  <img
                    src={eventoSelecionado.imagem}
                    alt={eventoSelecionado.nome}
                  />
                </ModalImage>
              ) : (
                <EventImagePlaceholder $grande>
                  <FiImage />
                </EventImagePlaceholder>
              )}

              <ModalEventTitle>{eventoSelecionado.nome}</ModalEventTitle>

              <ModalDescription>{eventoSelecionado.descricao}</ModalDescription>

              <ModalInfoList>
                <ModalInfoItem>
                  <FiCalendar />
                  <div>
                    <strong>Data</strong>
                    <span>{formatarData(eventoSelecionado.data)}</span>
                  </div>
                </ModalInfoItem>

                <ModalInfoItem>
                  <FiClock />
                  <div>
                    <strong>Horário</strong>
                    <span>{eventoSelecionado.horario}</span>
                  </div>
                </ModalInfoItem>

                <ModalInfoItem>
                  <FiMapPin />
                  <div>
                    <strong>Local</strong>
                    <span>{eventoSelecionado.local}</span>
                  </div>
                </ModalInfoItem>
              </ModalInfoList>
            </BlocoPagina>

            {/* BLOCO: RESULTADOS */}
            <BlocoPagina
              interno
              icone={<FiAward />}
              titulo={`Resultados (${resultados.length})`}
              descricao="Notas lançadas pelo matemático para este evento."
            >
              {resultados.length === 0 ? (
                <RankingEmpty>
                  <FiAward />
                  <strong>Nenhum resultado ainda</strong>
                  <span>
                    Os resultados deste evento aparecerão aqui assim que forem
                    lançados.
                  </span>
                </RankingEmpty>
              ) : (
                <RankingTableWrapper>
                  <RankingTable>
                    <thead>
                      <tr>
                        <th>Pos.</th>
                        <th>Poeta</th>
                        <th>N1</th>
                        <th>N2</th>
                        <th>N3</th>
                        <th>N4</th>
                        <th>N5</th>
                        <th>Média</th>
                        <th>Tempo</th>
                        <th>Desconto</th>
                        <th>Nota final</th>
                      </tr>
                    </thead>

                    <tbody>
                      {resultados.map((resultado, index) => (
                        <RankingRow key={resultado.id} $primeiro={index === 0}>
                          <td>
                            <Position>
                              {index === 0 && <FiAward />}
                              {index + 1}º
                            </Position>
                          </td>
                          <td>
                            <ParticipantName>
                              {resultado.nomeAluno}
                            </ParticipantName>
                          </td>
                          <td>
                            <Score>{resultado.n1?.toFixed(1) ?? "-"}</Score>
                          </td>
                          <td>
                            <Score>{resultado.n2?.toFixed(1) ?? "-"}</Score>
                          </td>
                          <td>
                            <Score>{resultado.n3?.toFixed(1) ?? "-"}</Score>
                          </td>
                          <td>
                            <Score>{resultado.n4?.toFixed(1) ?? "-"}</Score>
                          </td>
                          <td>
                            <Score>{resultado.n5?.toFixed(1) ?? "-"}</Score>
                          </td>
                          <td>
                            <Average>
                              {resultado.media?.toFixed(2) ?? "-"}
                            </Average>
                          </td>
                          <td>
                            <Time>
                              <FiClock />
                              {formatarTempo(resultado.tempo)}
                            </Time>
                          </td>
                          <td>
                            <Penalty $penalidade={resultado.desconto > 0}>
                              {resultado.desconto > 0
                                ? `-${resultado.desconto.toFixed(1)}`
                                : "0"}
                            </Penalty>
                          </td>
                          <td>
                            <FinalScore>
                              {resultado.resultado?.toFixed(2) ?? "-"}
                            </FinalScore>
                          </td>
                        </RankingRow>
                      ))}
                    </tbody>
                  </RankingTable>
                </RankingTableWrapper>
              )}

              <CriteriaBox>
                <CriteriaHeader>
                  <BlocoIcone>
                    <FiInfo />
                  </BlocoIcone>
                  <div>
                    <CriteriaTitle>Critérios de avaliação</CriteriaTitle>
                    <CriteriaDescription>
                      Entenda como as notas e o tempo influenciam o resultado dos poetas.
                    </CriteriaDescription>
                  </div>
                </CriteriaHeader>

                <CriteriaGrid>
                  <CriteriaItem>
                    <CriteriaItemTitle>Notas dos jurados (N1 a N5)</CriteriaItemTitle>
                    <CriteriaItemText>
                      Cada nota corresponde à pontuação atribuída por um dos cinco jurados.
                    </CriteriaItemText>
                  </CriteriaItem>

                  <CriteriaItem>
                    <CriteriaItemTitle>Média</CriteriaItemTitle>
                    <CriteriaItemText>
                      É a média das cinco notas recebidas pelo poeta.
                    </CriteriaItemText>
                  </CriteriaItem>

                  <CriteriaItem>
                    <CriteriaItemTitle>Tempo de apresentação</CriteriaItemTitle>
                    <CriteriaItemText>
                      O tempo limite para cada apresentação é de 3 minutos. O poeta pode
                      apresentar um texto mais curto, sem precisar ocupar todo esse tempo.
                    </CriteriaItemText>
                  </CriteriaItem>

                  <CriteriaItem>
                    <CriteriaItemTitle>Tolerância</CriteriaItemTitle>
                    <CriteriaItemText>
                      Há uma tolerância de 10 segundos após os 3 minutos. Até 3min10s,
                      não há desconto na pontuação.
                    </CriteriaItemText>
                  </CriteriaItem>

                  <CriteriaItem>
                    <CriteriaItemTitle>Desconto por tempo</CriteriaItemTitle>
                    <CriteriaItemText>
                      A partir de 3min11s, são descontados 0,5 ponto da nota final.
                      A cada novo intervalo de 10 segundos excedidos, é aplicado mais
                      0,5 ponto de desconto.
                    </CriteriaItemText>
                  </CriteriaItem>

                  <CriteriaItem>
                    <CriteriaItemTitle>Nota final</CriteriaItemTitle>
                    <CriteriaItemText>
                      É o resultado da média dos jurados após a aplicação dos descontos
                      por tempo, quando houver.
                    </CriteriaItemText>
                  </CriteriaItem>
                </CriteriaGrid>

                <CriteriaHighlight>
                  <FiClock />
                  <span>
                    Exemplos: 3min11s = desconto de 0,5 ponto; 3min21s = desconto
                    total de 1,0 ponto; 3min31s = desconto total de 1,5 ponto.
                  </span>
                </CriteriaHighlight>
              </CriteriaBox>
            </BlocoPagina>
          </Modal>
        </ModalOverlay>
      )}
    </Page>
  );
}