import { useEffect, useState, useRef } from "react";
import { FaTimes, FaPlay, FaStop, FaRedo } from "react-icons/fa";
import { io } from "socket.io-client";
import { getAuthHeaders } from "../../utils/auth";
import {
  Overlay, CronometroPage, TopBar, CloseButton, Eyebrow, MainTitle,
  TimerCard, RingWrap, RingSvg, RingTrack, RingProgress, RingCenter,
  TimeDisplay, ZoneLabel, PenaltyBadge, TimerControls, TimerButton,
  ResetButton, DemoButton, NotesCard, SectionTitle, SectionSub,
  SelectLabel, AutocompleteWrapper, PoetaInput, SuggestionsList,
  SuggestionItem, SuggestionEmpty, NotesGrid, NoteField, NoteLabel,
  NoteInput, CalculateButton, ErrorMessage, ResultsCard, ResultsTable,
  ResultsHeader, ResultsRow, Tag, Summary, SummaryRow, SummaryValue,
  FinalRow, FinalLabel, FinalValue, SaveButton
} from "./style";

const API_URL = "http://localhost:3001";
const CIRCUMFERENCE = 603.19;

function handleMouseMove(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();
  button.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  button.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
}

function obterToken() {
  const headers = getAuthHeaders();
  const authorization = headers.Authorization || headers.authorization || "";
  return authorization.replace(/^Bearer\s+/i, "");
}

// a TV recebe apenas o primeiro nome do poeta
function primeiroNome(nome) {
  return (nome || "").trim().split(/\s+/)[0] || "";
}

export default function NotaForm({ visible, nota, onClose, onSave }) {
  const socketRef = useRef(null);
  const editando = Boolean(nota);

  const [alunos, setAlunos] = useState([]);
  const [buscaAluno, setBuscaAluno] = useState("");
  const [selectedAluno, setSelectedAluno] = useState("");
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [eventos, setEventos] = useState([]);
  const [buscaEvento, setBuscaEvento] = useState("");
  const [selectedEvento, setSelectedEvento] = useState("");
  const [mostrarSugestoesEvento, setMostrarSugestoesEvento] = useState(false);
  const [notes, setNotes] = useState(["", "", "", "", ""]);
  const [error, setError] = useState("");
  const [resultado, setResultado] = useState(null);
  const [salvando, setSalvando] = useState(false);
  const [running, setRunning] = useState(false);
  const [startTs, setStartTs] = useState(null);
  const [accumulated, setAccumulated] = useState(0);
  const [elapsed, setElapsed] = useState(0);

  const LIMIT = 180;
  const TOLERANCE_END = 190;

  function pularPara(segundos) {
    if (running || editando) return;
    setStartTs(null);
    setRunning(false);
    setAccumulated(segundos);
    setElapsed(segundos);
  }

  useEffect(() => {
    if (!visible) return;

    const socket = io(API_URL, { auth: { token: obterToken() } });
    socketRef.current = socket;

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [visible]);

  useEffect(() => {
    if (!visible || !selectedEvento) {
      setAlunos([]);
      return;
    }

    (async () => {
      try {
        const res = await fetch(
          `${API_URL}/eventos/${selectedEvento}/participantes`,
          { headers: { ...getAuthHeaders() } }
        );
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.erro || "Não foi possível carregar os participantes.");
        }

        setAlunos(
          Array.isArray(data)
            ? data.map((participante) => ({
                id: participante.usuarioId,
                nome: participante.nome_poeta,
                turma: participante.turma,
                turno: participante.turno,
                curso: participante.curso
              }))
            : []
        );
      } catch (err) {
        console.error(err);
        setAlunos([]);
        setError("Não foi possível carregar os participantes do evento.");
      }
    })();
  }, [visible, selectedEvento]);

  useEffect(() => {
    if (!visible) return;

    (async () => {
      try {
        const res = await fetch(`${API_URL}/eventos`, {
          headers: { ...getAuthHeaders() }
        });
        const data = await res.json();

        if (!res.ok) {
          throw new Error(data.erro || "Não foi possível carregar os eventos.");
        }

        setEventos(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        setError("Não foi possível carregar os eventos.");
      }
    })();
  }, [visible]);

  useEffect(() => {
    if (!visible) return;

    if (nota) {
      const tempoSalvo = Number(nota.tempo) || 0;

      setSelectedAluno(String(nota.idAluno || ""));
      setSelectedEvento(String(nota.eventoId || ""));
      setNotes([
        nota.n1 ?? "",
        nota.n2 ?? "",
        nota.n3 ?? "",
        nota.n4 ?? "",
        nota.n5 ?? ""
      ]);
      setRunning(false);
      setStartTs(null);
      setAccumulated(tempoSalvo);
      setElapsed(tempoSalvo);
    } else {
      setSelectedAluno("");
      setSelectedEvento("");
      setBuscaEvento("");
      setNotes(["", "", "", "", ""]);
      setRunning(false);
      setStartTs(null);
      setAccumulated(0);
      setElapsed(0);
    }

    setBuscaAluno("");
    setMostrarSugestoes(false);
    setMostrarSugestoesEvento(false);
    setResultado(null);
    setError("");
  }, [visible, nota]);

  useEffect(() => {
    if (!selectedEvento || !eventos.length) return;

    const evento = eventos.find(
      (item) => String(item.id) === String(selectedEvento)
    );

    if (evento) setBuscaEvento(evento.nome);
  }, [selectedEvento, eventos]);

  const eventosFiltrados = eventos.filter((evento) => {
    if (!buscaEvento.trim()) return true;
    return evento.nome?.toLowerCase().includes(buscaEvento.toLowerCase().trim());
  });

  const alunosFiltrados = alunos.filter((aluno) => {
    if (!buscaAluno.trim()) return true;

    const termo = buscaAluno.toLowerCase().trim();

    return (
      aluno.nome?.toLowerCase().includes(termo) ||
      aluno.turma?.toLowerCase().includes(termo) ||
      aluno.curso?.toLowerCase().includes(termo)
    );
  });

  const poetaSelecionado = alunos.find(
    (aluno) => String(aluno.id) === String(selectedAluno)
  );

  function handleEventoChange(valor, nome = "") {
    setSelectedEvento(valor);
    setBuscaEvento(nome);
    setMostrarSugestoesEvento(false);
    setSelectedAluno("");
    setBuscaAluno("");
    setResultado(null);
    setError("");
  }

  useEffect(() => {
    if (!visible || !selectedAluno) return;

    const poeta = alunos.find(
      (aluno) => String(aluno.id) === String(selectedAluno)
    );

    if (poeta) setBuscaAluno(poeta.nome);
  }, [visible, alunos, selectedAluno]);

  useEffect(() => {
    if (!running) return;

    const interval = setInterval(() => {
      const current = accumulated + (Date.now() - startTs) / 1000;
      setElapsed(current);
    }, 50);

    return () => clearInterval(interval);
  }, [running, accumulated, startTs]);

  function startTimer() {
    if (editando) return;

    if (running) {
      const current = accumulated + (Date.now() - startTs) / 1000;
      setAccumulated(current);
      setElapsed(current);
      setRunning(false);
      return;
    }

    setStartTs(Date.now());
    setRunning(true);
  }

  function resetTimer() {
    if (editando) return;

    setRunning(false);
    setStartTs(null);
    setAccumulated(0);
    setElapsed(0);
    setResultado(null);
    setError("");
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return String(m).padStart(2, "0") + ":" + String(s).padStart(2, "0");
  }

  function computePenalty(seconds) {
    if (seconds <= TOLERANCE_END) return 0;

    const blocks = Math.floor((seconds - TOLERANCE_END - 1) / 10) + 1;
    return blocks * 0.5;
  }

  const penalty = computePenalty(Math.floor(elapsed));
  const progress = Math.min(elapsed / LIMIT, 1);
  const tempoSegundos = Math.floor(elapsed);

  useEffect(() => {
    if (!visible) return;

    socketRef.current?.emit("aoVivoAtualizar", {
      poeta: primeiroNome(poetaSelecionado?.nome),
      notas: notes.map((n) => (n === "" ? null : Number(n))),
      tempo: tempoSegundos
    });
  }, [visible, selectedAluno, notes, tempoSegundos]);

  function handleNoteChange(index, value) {
    if (value !== "" && !/^-?\d*\.?\d*$/.test(value)) return;

    let valorFinal = value;
    const numero = parseFloat(value.replace(",", "."));

    if (!isNaN(numero)) {
      if (numero < 0) valorFinal = "0";
      if (numero > 10) valorFinal = "10";
    }

    const newNotes = [...notes];
    newNotes[index] = valorFinal;
    setNotes(newNotes);
  }

  function calculateResult() {
    setError("");

    if (elapsed <= 0) {
      setError("Inicie e finalize o cronômetro antes de calcular o resultado.");
      return;
    }

    if (running) {
      setError("Pare o cronômetro antes de calcular o resultado.");
      return;
    }

    if (!selectedEvento) {
      setError("Selecione o evento antes de calcular.");
      return;
    }

    if (!selectedAluno) {
      setError("Selecione o poeta antes de calcular.");
      return;
    }

    const values = notes.map((value) =>
      parseFloat(String(value).replace(",", "."))
    );

    const valid = values.every(
      (value) => !isNaN(value) && value >= 0 && value <= 10
    );

    if (!valid) {
      setError("Preencha as 5 notas com valores entre 0 e 10.");
      return;
    }

    const indexed = values.map((value, index) => ({ value, index }));
    const sorted = [...indexed].sort((a, b) => a.value - b.value);
    const min = sorted[0];
    const max = sorted[sorted.length - 1];
    const discarded = new Set([min.index, max.index]);
    const kept = indexed.filter((item) => !discarded.has(item.index));

    const baseAverage =
      kept.reduce((sum, item) => sum + item.value, 0) / kept.length;

    const finalScore = Math.max(0, baseAverage - penalty);

    setResultado({
      values,
      discarded,
      baseAverage,
      penalty,
      finalScore
    });
  }

  async function handleSalvar() {
    if (!resultado) {
      setError("Calcule o resultado antes de salvar.");
      return;
    }

    if (elapsed <= 0) {
      setError("O cronômetro precisa ter um tempo registrado antes de salvar.");
      return;
    }

    const payload = {
      n1: resultado.values[0],
      n2: resultado.values[1],
      n3: resultado.values[2],
      n4: resultado.values[3],
      n5: resultado.values[4],
      media: resultado.baseAverage,
      desconto: resultado.penalty,
      tempo: Math.floor(elapsed),
      resultado: resultado.finalScore,
      id_aluno: Number(selectedAluno),
      evento_id: Number(selectedEvento)
    };

    setSalvando(true);

    try {
      const sucesso = await onSave(payload);

      if (sucesso) {
        socketRef.current?.emit("aoVivoFinalizar", {
          poeta: primeiroNome(poetaSelecionado?.nome),
          notas: resultado.values,
          media: resultado.baseAverage,
          desconto: resultado.penalty,
          resultado: resultado.finalScore
        });

        socketRef.current?.emit("aoVivoLimpar");
      }
    } finally {
      setSalvando(false);
    }
  }

  function handleFechar() {
    socketRef.current?.emit("aoVivoLimpar");
    onClose();
  }

  if (!visible) return null;

  return (
    <Overlay>
      <CronometroPage>
        <TopBar>
          <div>
            <Eyebrow>Regulamento oficial · 3 min + 10s de tolerância</Eyebrow>
            <MainTitle>Cronômetro</MainTitle>
          </div>

          <CloseButton onClick={handleFechar} onMouseMove={handleMouseMove}>
            <FaTimes />
          </CloseButton>
        </TopBar>

        <TimerCard>
          {!editando && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                gap: 8,
                flexWrap: "wrap",
                marginBottom: 18
              }}
            >
              {[
                { label: "Normal (do zero)", value: 0 },
                { label: "Demo (começa em 1 min)", value: 60 },
                { label: "Demo (começa em 3 min)", value: 180 }
              ].map((opcao) => (
                <DemoButton
                  key={opcao.value}
                  type="button"
                  disabled={running}
                  $selected={Math.floor(accumulated) === opcao.value}
                  onClick={() => pularPara(opcao.value)}
                  onMouseMove={handleMouseMove}
                >
                  <span>{opcao.label}</span>
                </DemoButton>
              ))}
            </div>
          )}

          <RingWrap>
            <RingSvg viewBox="0 0 220 220">
              <RingTrack cx="110" cy="110" r="96" />
              <RingProgress
                cx="110"
                cy="110"
                r="96"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={CIRCUMFERENCE * (1 - progress)}
                $penalty={elapsed > TOLERANCE_END}
              />
            </RingSvg>

            <RingCenter>
              <TimeDisplay $penalty={elapsed > TOLERANCE_END}>
                {formatTime(elapsed)}
              </TimeDisplay>
              <ZoneLabel $penalty={elapsed > TOLERANCE_END}>
                {elapsed <= LIMIT
                  ? "dentro do tempo"
                  : elapsed <= TOLERANCE_END
                  ? "tolerância · sem desconto"
                  : "excedeu o tempo"}
              </ZoneLabel>
            </RingCenter>
          </RingWrap>

          <PenaltyBadge $visible={penalty > 0}>
            desconto: -{penalty.toFixed(1).replace(".", ",")} pontos
          </PenaltyBadge>

          {!editando && (
            <TimerControls>
              <TimerButton
                onClick={startTimer}
                onMouseMove={handleMouseMove}
                $primary
              >
                {running ? <FaStop /> : <FaPlay />}
                <span>{running ? "Parar" : "Iniciar"}</span>
              </TimerButton>

              <ResetButton onClick={resetTimer} onMouseMove={handleMouseMove}>
                <FaRedo />
                <span>Zerar</span>
              </ResetButton>
            </TimerControls>
          )}
        </TimerCard>

        <NotesCard>
          <SectionTitle>Notas dos jurados</SectionTitle>
          <SectionSub>
            Selecione o evento, o poeta e informe as 5 notas. A maior e a
            menor nota serão descartadas.
          </SectionSub>

          <SelectLabel>Evento</SelectLabel>

          <AutocompleteWrapper>
            <PoetaInput
              type="text"
              placeholder="Digite o nome do evento..."
              value={buscaEvento}
              autoComplete="off"
              onChange={(e) => {
                setBuscaEvento(e.target.value);
                setSelectedEvento("");
                setSelectedAluno("");
                setBuscaAluno("");
                setResultado(null);
                setMostrarSugestoesEvento(true);
              }}
              onFocus={() => setMostrarSugestoesEvento(true)}
              onBlur={() =>
                setTimeout(() => setMostrarSugestoesEvento(false), 150)
              }
            />

            {mostrarSugestoesEvento && (
              <SuggestionsList>
                {eventosFiltrados.length === 0 ? (
                  <SuggestionEmpty>Nenhum evento encontrado.</SuggestionEmpty>
                ) : (
                  eventosFiltrados.map((evento) => (
                    <SuggestionItem
                      key={evento.id}
                      type="button"
                      $selected={String(evento.id) === String(selectedEvento)}
                      onMouseDown={() =>
                        handleEventoChange(String(evento.id), evento.nome)
                      }
                      onMouseMove={handleMouseMove}
                    >
                      <span>{evento.nome}</span>
                    </SuggestionItem>
                  ))
                )}
              </SuggestionsList>
            )}
          </AutocompleteWrapper>

          {eventos.length === 0 && (
            <ErrorMessage>
              Nenhum evento cadastrado ainda. Peça pro organizador criar um
              evento antes de lançar notas.
            </ErrorMessage>
          )}

          <SelectLabel>Poeta</SelectLabel>

          <AutocompleteWrapper>
            <PoetaInput
              type="text"
              placeholder={
                selectedEvento
                  ? "Digite o nome, turma ou curso do poeta..."
                  : "Selecione um evento primeiro"
              }
              value={buscaAluno}
              disabled={!selectedEvento}
              autoComplete="off"
              onChange={(e) => {
                setBuscaAluno(e.target.value);
                setSelectedAluno("");
                setMostrarSugestoes(true);
              }}
              onFocus={() => selectedEvento && setMostrarSugestoes(true)}
              onBlur={() =>
                setTimeout(() => setMostrarSugestoes(false), 150)
              }
            />

            {mostrarSugestoes && selectedEvento && (
              <SuggestionsList>
                {alunosFiltrados.length === 0 ? (
                  <SuggestionEmpty>
                    Nenhum poeta participante deste evento.
                  </SuggestionEmpty>
                ) : (
                  alunosFiltrados.map((aluno) => (
                    <SuggestionItem
                      key={aluno.id}
                      type="button"
                      $selected={String(aluno.id) === String(selectedAluno)}
                      onMouseDown={() => {
                        setSelectedAluno(String(aluno.id));
                        setBuscaAluno(aluno.nome);
                        setMostrarSugestoes(false);
                      }}
                      onMouseMove={handleMouseMove}
                    >
                      <span>
                        {aluno.nome}
                        {aluno.turma ? ` — ${aluno.turma}` : ""}
                      </span>
                    </SuggestionItem>
                  ))
                )}
              </SuggestionsList>
            )}
          </AutocompleteWrapper>

          {!selectedAluno && buscaAluno.trim() && (
            <ErrorMessage>Selecione um poeta da lista de sugestões.</ErrorMessage>
          )}

          <NotesGrid>
            {notes.map((value, index) => (
              <NoteField key={index}>
                <NoteLabel>Jurado {index + 1}</NoteLabel>
                <NoteInput
                  type="number"
                  min="0"
                  max="10"
                  step="0.1"
                  inputMode="decimal"
                  value={value}
                  onChange={(e) => handleNoteChange(index, e.target.value)}
                />
              </NoteField>
            ))}
          </NotesGrid>

          <CalculateButton
            onClick={calculateResult}
            onMouseMove={handleMouseMove}
            disabled={elapsed <= 0 || running}
          >
            <span>
              {running
                ? "Pare o cronômetro para calcular"
                : elapsed <= 0
                ? "Inicie o cronômetro para calcular"
                : "Calcular resultado"}
            </span>
          </CalculateButton>

          {error && <ErrorMessage>{error}</ErrorMessage>}
        </NotesCard>

        {resultado && (
          <ResultsCard>
            <SectionTitle>Resultado</SectionTitle>
            <SectionSub>
              Tempo do poeta: {formatTime(elapsed)}
              {resultado.penalty > 0
                ? " — excedeu o limite."
                : " — dentro do tempo permitido."}
            </SectionSub>

            <ResultsTable>
              <thead>
                <tr>
                  <ResultsHeader>Jurado</ResultsHeader>
                  <ResultsHeader>Nota</ResultsHeader>
                  <ResultsHeader>Status</ResultsHeader>
                </tr>
              </thead>

              <tbody>
                {resultado.values.map((value, index) => {
                  const isDiscarded = resultado.discarded.has(index);

                  return (
                    <ResultsRow key={index} $discarded={isDiscarded}>
                      <td>Jurado {index + 1}</td>
                      <td>{value.toFixed(1).replace(".", ",")}</td>
                      <td>{isDiscarded && <Tag>Descartada</Tag>}</td>
                    </ResultsRow>
                  );
                })}
              </tbody>
            </ResultsTable>

            <Summary>
              <SummaryRow>
                <span>Média das 3 notas válidas</span>
                <SummaryValue>
                  {resultado.baseAverage.toFixed(2).replace(".", ",")}
                </SummaryValue>
              </SummaryRow>

              <SummaryRow>
                <span>Desconto por tempo</span>
                <SummaryValue $penalty>
                  -{resultado.penalty.toFixed(1).replace(".", ",")}
                </SummaryValue>
              </SummaryRow>
            </Summary>

            <FinalRow>
              <FinalLabel>Nota final</FinalLabel>
              <FinalValue>
                {resultado.finalScore.toFixed(2).replace(".", ",")}
              </FinalValue>
            </FinalRow>

            <SaveButton
              onClick={handleSalvar}
              onMouseMove={handleMouseMove}
              disabled={salvando}
            >
              <span>{salvando ? "Salvando..." : "Salvar nota"}</span>
            </SaveButton>
          </ResultsCard>
        )}
      </CronometroPage>
    </Overlay>
  );
}