import { useEffect, useState } from "react";
import { jsPDF } from "jspdf";
import Layoutadm from "../../../components/layoutadm";
import { getAuthHeaders } from "../../../utils/auth";
import { descobrirAno, ANO_MINIMO } from "../../../utils/ano";
import {
  FiEdit, FiTrash2, FiUsers, FiBookOpen, FiSearch, FiX,
  FiAlertTriangle, FiDownload, FiChevronLeft, FiChevronRight,
  FiCalendar, FiClock, FiCheck
} from "react-icons/fi";
import {
  Page, Content, Header, TitleArea, Title, Subtitle, FilterContainer,
  FilterButton, TableContainer, TableHeader, TableHeaderInfo, TableTitle,
  TableDescription, DownloadButton, TableWrapper, Table, StudentCell,
  StudentAvatar, StudentInfo, StudentName, Badge, TurnoBadge, Actions,
  ActionButton, EmptyState, EmptyIcon, EmptyTitle, EmptyText, LoadingState,
  Spinner, ModalOverlay, Modal, ModalHeader, ModalTitle,
  ModalClose, ModalDescription, Form, FormGroup, Label, Input, Select,
  ModalButtons, SaveButton, CancelButton,
  AvisoOverlay, AvisoModal, AvisoIcon, AvisoButton, AvisoActions,
  AvisoCancelButton, AvisoConfirmButton, AvisoField,
  YearsWrapper, YearsContainer, YearArrow, YearCard, YearIcon, YearNumber,
  YearDescription, Bloco, BlocoHeader, BlocoIcone, BlocoInfo, BlocoTitulo,
  BlocoDescricao
} from "./style";

const API_URL = "http://localhost:3001";

function obterInicial(nome) {
  return nome ? nome.trim().charAt(0).toUpperCase() : "?";
}

function ordenarPorNome(lista) {
  return [...lista].sort((a, b) => (a.nome_poeta || "").localeCompare(b.nome_poeta || "", "pt-BR", { sensitivity: "base" }));
}

const handleButtonMouseMove = (e) => {
  const button = e.currentTarget, rect = button.getBoundingClientRect();
  button.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  button.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
};

function gerarPDF({ alunos, anoSelecionado, turno }) {
  const lista = ordenarPorNome(alunos);
  const doc = new jsPDF({ orientation: "landscape", unit: "mm", format: "a4" });
  const dataAtual = new Date();
  const dataFormatada = dataAtual.toLocaleDateString("pt-BR");
  const horaFormatada = dataAtual.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

  doc.setFillColor(131, 22, 20);
  doc.rect(0, 0, 297, 35, "F");
  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(20);
  doc.text(`Alunos inscritos - ${anoSelecionado}`, 18, 16);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.text(turno === "Todos" ? "Lista de inscrições" : `Lista de inscrições - ${turno}`, 18, 24);
  doc.text(`Gerado em ${dataFormatada} às ${horaFormatada}`, 279, 24, { align: "right" });
  doc.setTextColor(60, 60, 60);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(12);
  doc.text(`Total de alunos: ${lista.length}`, 18, 47);

  const margemEsquerda = 18, larguraTotal = 261;
  const colunas = [
    { titulo: "Nº", x: margemEsquerda, largura: 12 },
    { titulo: "ALUNO", x: margemEsquerda + 12, largura: 85 },
    { titulo: "TURMA", x: margemEsquerda + 97, largura: 45 },
    { titulo: "CURSO", x: margemEsquerda + 142, largura: 65 },
    { titulo: "TURNO", x: margemEsquerda + 207, largura: 54 }
  ];
  let y = 55;

  const desenharCabecalho = () => {
    doc.setFillColor(131, 22, 20);
    doc.rect(margemEsquerda, y, larguraTotal, 10, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    colunas.forEach((coluna) => doc.text(coluna.titulo, coluna.x + 3, y + 6.5));
    y += 10;
  };

  desenharCabecalho();

  lista.forEach((aluno, index) => {
    if (y > 185) {
      doc.addPage();
      y = 18;
      desenharCabecalho();
    }

    const alturaLinha = 11;
    doc.setFillColor(index % 2 === 0 ? 253 : 255, index % 2 === 0 ? 253 : 251, index % 2 === 0 ? 253 : 237);
    doc.rect(margemEsquerda, y, larguraTotal, alturaLinha, "F");
    doc.setDrawColor(230, 230, 230);
    doc.line(margemEsquerda, y + alturaLinha, margemEsquerda + larguraTotal, y + alturaLinha);
    doc.setTextColor(50, 50, 50);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(String(index + 1), colunas[0].x + 3, y + 7);
    doc.text((aluno.nome_poeta || "-").substring(0, 48), colunas[1].x + 3, y + 7);
    doc.text((aluno.turma || "-").substring(0, 25), colunas[2].x + 3, y + 7);
    doc.text((aluno.curso || "-").substring(0, 35), colunas[3].x + 3, y + 7);
    doc.text(aluno.turno || "-", colunas[4].x + 3, y + 7);
    y += alturaLinha;
  });

  const totalPaginas = doc.internal.getNumberOfPages();

  for (let pagina = 1; pagina <= totalPaginas; pagina++) {
    doc.setPage(pagina);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(130, 130, 130);
    doc.text("Sistema de organização do Slam", 18, 202);
    doc.text(`Página ${pagina} de ${totalPaginas}`, 279, 202, { align: "right" });
  }

  const nomeArquivo = `alunos-inscritos-${anoSelecionado}-${dataFormatada.replace(/\//g, "-")}.pdf`;
  doc.save(nomeArquivo);
}

function BlocoPagina({ icone, titulo, descricao, children }) {
  return (
    <Bloco>
      <BlocoHeader>
        <BlocoIcone>{icone}</BlocoIcone>
        <BlocoInfo>
          <BlocoTitulo>{titulo}</BlocoTitulo>
          <BlocoDescricao>{descricao}</BlocoDescricao>
        </BlocoInfo>
      </BlocoHeader>
      {children}
    </Bloco>
  );
}

export default function Inscricaoadm() {
  const [turno, setTurno] = useState("Todos");
  const [inscricoes, setInscricoes] = useState([]);
  const [carregando, setCarregando] = useState(true);
  // Card de aviso: { titulo, texto } ou null
  const [aviso, setAviso] = useState(null);
  const [inscricaoEditando, setInscricaoEditando] = useState(null);
  const [inscricaoExcluir, setInscricaoExcluir] = useState(null);
  const [confirmacaoExclusao, setConfirmacaoExclusao] = useState("");
  const [anoInicial, setAnoInicial] = useState(ANO_MINIMO);
  const [anoSelecionado, setAnoSelecionado] = useState(ANO_MINIMO);
  const anosVisiveis = Array.from({ length: 3 }, (_, i) => anoInicial + i);

  function mostrarAviso(titulo, texto) {
    setAviso({ titulo, texto });
  }

  useEffect(() => {
    buscarInscricoes();
  }, []);

  // ESC fecha primeiro o aviso, depois os modais.
  useEffect(() => {
    function handleKeyDown(e) {
      if (e.key !== "Escape") return;
      if (aviso) { setAviso(null); return; }
      if (inscricaoExcluir) { fecharModalExclusao(); return; }
      if (inscricaoEditando) setInscricaoEditando(null);
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [aviso, inscricaoExcluir, inscricaoEditando]);

  function buscarInscricoes() {
    setCarregando(true);
    fetch(`${API_URL}/inscricoes`, { headers: getAuthHeaders() })
      .then((res) => {
        if (!res.ok) throw new Error("Erro ao buscar inscrições.");
        return res.json();
      })
      .then((data) => setInscricoes(Array.isArray(data) ? data : []))
      .catch((error) => {
        console.error(error);
        mostrarAviso("Não foi possível carregar", "Não foi possível carregar as inscrições.");
      })
      .finally(() => setCarregando(false));
  }

  function avancarAnos() {
    const novoAno = anoInicial + 3;
    setAnoInicial(novoAno);
    setAnoSelecionado(novoAno);
    setTurno("Todos");
  }

  function voltarAnos() {
    const novoAno = Math.max(ANO_MINIMO, anoInicial - 3);
    setAnoInicial(novoAno);
    setAnoSelecionado(novoAno);
    setTurno("Todos");
  }

  function selecionarAno(ano) {
    setAnoSelecionado(ano);
    setTurno("Todos");
  }

  const inscricoesDoAno = inscricoes.filter((i) => descobrirAno(i) === anoSelecionado);
  const inscricoesFiltradas = turno === "Todos" ? ordenarPorNome(inscricoesDoAno) : inscricoesDoAno.filter((i) => i.turno === turno);

  function quantidadePorAno(ano) {
    return inscricoes.filter((i) => descobrirAno(i) === ano).length;
  }

  const opcoesTurno = [
    { valor: "Todos", total: inscricoesDoAno.length },
    { valor: "Manhã", total: inscricoesDoAno.filter((i) => i.turno === "Manhã").length },
    { valor: "Tarde", total: inscricoesDoAno.filter((i) => i.turno === "Tarde").length },
    { valor: "Noite", total: inscricoesDoAno.filter((i) => i.turno === "Noite").length }
  ];

  function baixarPDF() {
    if (!inscricoesFiltradas?.length) {
      mostrarAviso("Nada para exportar", "Não existem alunos inscritos para gerar o PDF.");
      return;
    }
    try {
      gerarPDF({ alunos: inscricoesFiltradas, anoSelecionado, turno });
    } catch (error) {
      console.error("Erro ao gerar PDF:", error);
      mostrarAviso("Não foi possível gerar o PDF", "Não foi possível gerar o PDF.");
    }
  }

  function abrirEdicao(inscricao) {
    setInscricaoEditando({ ...inscricao });
  }

  function alterarCampoEdicao(campo, valor) {
    setInscricaoEditando((atual) => ({ ...atual, [campo]: valor }));
  }

  async function salvarEdicao() {
    if (!inscricaoEditando) return;
    try {
      const res = await fetch(`${API_URL}/inscricao/${inscricaoEditando.id_inscricoes}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", ...getAuthHeaders() },
        body: JSON.stringify({
          nome_poeta: inscricaoEditando.nome_poeta,
          turma: inscricaoEditando.turma,
          turno: inscricaoEditando.turno,
          curso: inscricaoEditando.curso
        })
      });
      const data = await res.json();

      if (!res.ok) {
        mostrarAviso("Não foi possível salvar", data.erro || "Erro ao salvar alterações.");
        return;
      }

      setInscricoes((atual) => atual.map((i) => i.id_inscricoes === inscricaoEditando.id_inscricoes ? inscricaoEditando : i));
      setInscricaoEditando(null);
    } catch (err) {
      console.error(err);
      mostrarAviso("Sem conexão", "Não foi possível conectar ao servidor.");
    }
  }

  function abrirExclusao(inscricao) {
    if (inscricao.atribuido_evento) {
      mostrarAviso(
        "Exclusão não permitida",
        `Não é possível excluir ${inscricao.nome_poeta} porque o poeta já está atribuído ao evento "${inscricao.evento_nome}".`
      );
      return;
    }
    setInscricaoExcluir(inscricao);
    setConfirmacaoExclusao("");
  }

  function fecharModalExclusao() {
    setInscricaoExcluir(null);
    setConfirmacaoExclusao("");
  }

  async function excluirInscricao() {
    if (confirmacaoExclusao.toLowerCase() !== "excluir") return;
    try {
      const res = await fetch(`${API_URL}/inscricao/${inscricaoExcluir.id_inscricoes}`, {
        method: "DELETE",
        headers: getAuthHeaders()
      });
      const data = await res.json();

      if (!res.ok) {
        mostrarAviso("Não foi possível excluir", data.erro || "Erro ao excluir inscrição.");
        return;
      }

      setInscricoes((atual) => atual.filter((i) => i.id_inscricoes !== inscricaoExcluir.id_inscricoes));
      fecharModalExclusao();
    } catch (err) {
      console.error(err);
      mostrarAviso("Sem conexão", "Não foi possível conectar ao servidor.");
    }
  }

  return (
    <Page>
      <Layoutadm />
      <Content>
        <Header>
          <TitleArea>
            <Title>Inscrições dos Alunos</Title>
            <Subtitle>Gerencie as inscrições e informações dos alunos participantes.</Subtitle>
          </TitleArea>
        </Header>

        <BlocoPagina icone={<FiCalendar />} titulo="Ano das inscrições" descricao="Escolha o ano que deseja visualizar.">
          <YearsWrapper>
            <YearArrow type="button" onClick={voltarAnos} onMouseMove={handleButtonMouseMove} disabled={anoInicial === ANO_MINIMO} aria-label="Anos anteriores">
              <span className="buttonContent"><FiChevronLeft /></span>
            </YearArrow>
            <YearsContainer>
              {anosVisiveis.map((ano) => {
                const quantidade = quantidadePorAno(ano), ativo = anoSelecionado === ano;
                return (
                  <YearCard key={ano} $active={ativo} onClick={() => selecionarAno(ano)} onMouseMove={handleButtonMouseMove}>
                    <YearIcon $active={ativo}><FiCalendar /></YearIcon>
                    <YearNumber $active={ativo}>{ano}</YearNumber>
                    <YearDescription $active={ativo}>{quantidade} {quantidade === 1 ? "inscrição" : "inscrições"}</YearDescription>
                  </YearCard>
                );
              })}
            </YearsContainer>
            <YearArrow type="button" onClick={avancarAnos} onMouseMove={handleButtonMouseMove} aria-label="Próximos anos">
              <span className="buttonContent"><FiChevronRight /></span>
            </YearArrow>
          </YearsWrapper>
        </BlocoPagina>

        <BlocoPagina icone={<FiClock />} titulo="Filtrar por turno" descricao="Veja os alunos inscritos por período do dia.">
          <FilterContainer>
            {opcoesTurno.map((opcao) => (
              <FilterButton key={opcao.valor} type="button" $active={turno === opcao.valor} onClick={() => setTurno(opcao.valor)} onMouseMove={handleButtonMouseMove} aria-pressed={turno === opcao.valor}>
                <span>{opcao.valor}</span><strong>{opcao.total}</strong>
              </FilterButton>
            ))}
          </FilterContainer>
        </BlocoPagina>

        <TableContainer>
          <TableHeader>
            <TableHeaderInfo>
              <TableTitle>Inscrições</TableTitle>
              <TableDescription>Lista de alunos inscritos no ano selecionado.</TableDescription>
            </TableHeaderInfo>
            <DownloadButton type="button" onClick={baixarPDF} onMouseMove={handleButtonMouseMove}>
              <FiDownload />Baixar PDF
            </DownloadButton>
          </TableHeader>

          {carregando ? (
            <LoadingState><Spinner /><span>Carregando inscrições...</span></LoadingState>
          ) : (
            <TableWrapper>
              <Table>
                <thead>
                  <tr><th>Aluno</th><th>Turma</th><th>Curso</th><th>Turno</th><th>Ações</th></tr>
                </thead>
                <tbody>
                  {inscricoesFiltradas.map((inscricao) => {
                    const bloqueado = Boolean(inscricao.atribuido_evento);
                    return (
                      <tr key={inscricao.id_inscricoes}>
                        <td>
                          <StudentCell>
                            <StudentAvatar>{obterInicial(inscricao.nome_poeta)}</StudentAvatar>
                            <StudentInfo>
                              <StudentName>{inscricao.nome_poeta}</StudentName>
                              <small>Inscrição #{inscricao.id_inscricoes}</small>
                            </StudentInfo>
                          </StudentCell>
                        </td>
                        <td><Badge>{inscricao.turma}</Badge></td>
                        <td><Badge $type="course"><FiBookOpen />{inscricao.curso}</Badge></td>
                        <td><TurnoBadge $turno={inscricao.turno}><span />{inscricao.turno}</TurnoBadge></td>
                        <td>
                          <Actions>
                            <ActionButton type="button" $variant="edit" title="Editar inscrição" aria-label={`Editar ${inscricao.nome_poeta}`} onClick={() => abrirEdicao(inscricao)} onMouseMove={handleButtonMouseMove}><FiEdit /></ActionButton>
                            <ActionButton type="button" $variant="delete" title={bloqueado ? `Não é possível excluir: poeta atribuído ao evento "${inscricao.evento_nome}"` : "Excluir inscrição"} aria-label={bloqueado ? `Não é possível excluir ${inscricao.nome_poeta} porque está atribuído a um evento` : `Excluir ${inscricao.nome_poeta}`} onClick={() => abrirExclusao(inscricao)} onMouseMove={handleButtonMouseMove} disabled={bloqueado}><FiTrash2 /></ActionButton>
                          </Actions>
                        </td>
                      </tr>
                    );
                  })}
                  {!inscricoesFiltradas.length && (
                    <tr>
                      <td colSpan={5}>
                        <EmptyState>
                          <EmptyIcon><FiSearch /></EmptyIcon>
                          <EmptyTitle>Nenhuma inscrição encontrada</EmptyTitle>
                          <EmptyText>Não existem inscrições para os filtros selecionados.</EmptyText>
                        </EmptyState>
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </TableWrapper>
          )}
        </TableContainer>
      </Content>

      {inscricaoEditando && (
        <ModalOverlay onMouseDown={(e) => { if (e.target === e.currentTarget) setInscricaoEditando(null); }}>
          <Modal>
            <ModalHeader>
              <div>
                <ModalTitle>Editar inscrição</ModalTitle>
                <ModalDescription>Atualize os dados do aluno.</ModalDescription>
              </div>
              <ModalClose type="button" onClick={() => setInscricaoEditando(null)} onMouseMove={handleButtonMouseMove} aria-label="Fechar"><FiX /></ModalClose>
            </ModalHeader>

            <Form>
              <FormGroup>
                <Label>Nome do poeta</Label>
                <Input value={inscricaoEditando.nome_poeta || ""} onChange={(e) => alterarCampoEdicao("nome_poeta", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Turma</Label>
                <Input value={inscricaoEditando.turma || ""} onChange={(e) => alterarCampoEdicao("turma", e.target.value)} />
              </FormGroup>
              <FormGroup>
                <Label>Turno</Label>
                <Select value={inscricaoEditando.turno || ""} onChange={(e) => alterarCampoEdicao("turno", e.target.value)}>
                  <option value="">Selecione</option>
                  <option value="Manhã">Manhã</option>
                  <option value="Tarde">Tarde</option>
                  <option value="Noite">Noite</option>
                </Select>
              </FormGroup>
              <FormGroup>
                <Label>Curso</Label>
                <Input value={inscricaoEditando.curso || ""} onChange={(e) => alterarCampoEdicao("curso", e.target.value)} />
              </FormGroup>
              <ModalButtons>
                <CancelButton type="button" onClick={() => setInscricaoEditando(null)}>Cancelar</CancelButton>
                <SaveButton type="button" onClick={salvarEdicao} onMouseMove={handleButtonMouseMove}>Salvar alterações</SaveButton>
              </ModalButtons>
            </Form>
          </Modal>
        </ModalOverlay>
      )}

      {/* EXCLUIR INSCRIÇÃO - mesma interface do modal "Sair da conta?" */}
      {inscricaoExcluir && (
        <AvisoOverlay onMouseDown={(e) => { if (e.target === e.currentTarget) fecharModalExclusao(); }}>
          <AvisoModal role="alertdialog" aria-modal="true" aria-labelledby="excluir-inscricao-titulo" aria-describedby="excluir-inscricao-texto">
            <AvisoIcon><FiTrash2 /></AvisoIcon>

            <h3 id="excluir-inscricao-titulo">Excluir inscrição</h3>

            <p id="excluir-inscricao-texto">
              Você está prestes a excluir a inscrição de <strong>{inscricaoExcluir.nome_poeta}</strong>. O usuário voltará a ser aluno comum.
            </p>

            <AvisoField>
              <Label htmlFor="confirmar-exclusao">Digite <strong>excluir</strong> para confirmar</Label>
              <Input
                id="confirmar-exclusao"
                value={confirmacaoExclusao}
                onChange={(e) => setConfirmacaoExclusao(e.target.value)}
                placeholder="Digite excluir"
                autoComplete="off"
                autoFocus
              />
            </AvisoField>

            <AvisoActions>
              <AvisoCancelButton type="button" onClick={fecharModalExclusao} onMouseMove={handleButtonMouseMove}>
                <span className="buttonContent"><FiX />Cancelar</span>
              </AvisoCancelButton>

              <AvisoConfirmButton type="button" onClick={excluirInscricao} onMouseMove={handleButtonMouseMove} disabled={confirmacaoExclusao.toLowerCase() !== "excluir"}>
                <span className="buttonContent"><FiTrash2 />Sim, excluir</span>
              </AvisoConfirmButton>
            </AvisoActions>
          </AvisoModal>
        </AvisoOverlay>
      )}

      {/* AVISOS (erros e bloqueios) - mesma interface do modal "Sair da conta?" */}
      {aviso && (
        <AvisoOverlay onMouseDown={(e) => { if (e.target === e.currentTarget) setAviso(null); }}>
          <AvisoModal role="alertdialog" aria-modal="true" aria-labelledby="aviso-titulo" aria-describedby="aviso-texto">
            <AvisoIcon><FiAlertTriangle /></AvisoIcon>

            <h3 id="aviso-titulo">{aviso.titulo}</h3>

            <p id="aviso-texto">{aviso.texto}</p>

            <AvisoButton type="button" onClick={() => setAviso(null)} onMouseMove={handleButtonMouseMove} autoFocus>
              <span className="buttonContent"><FiCheck />Entendi</span>
            </AvisoButton>
          </AvisoModal>
        </AvisoOverlay>
      )}
    </Page>
  );
}
