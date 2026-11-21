import { FaEdit, FaTrash } from "react-icons/fa";
import {
  Card,
  Content,
  Aluno,
  Notas,
  NotaItem,
  Label,
  Valor,
  Media,
  Actions,
  EditButton,
  DeleteButton
} from "./style";

function handleMouseMove(e) {
  const button = e.currentTarget;
  const rect = button.getBoundingClientRect();

  button.style.setProperty("--mouse-x", `${e.clientX - rect.left}px`);
  button.style.setProperty("--mouse-y", `${e.clientY - rect.top}px`);
}

export default function NotaCard({ nota, onEdit, onDelete }) {
  const notaFinal = nota.resultado ?? nota.media ?? 0;
  const aprovado = notaFinal >= 7;
  const nomeAluno = nota.nomeAluno || "poeta";

  return (
    <Card>
      <Content>
        <Aluno>{nota.nomeAluno || "Poeta não encontrado"}</Aluno>

        {nota.eventoNome && (
          <NotaItem>
            <Label>Evento</Label>
            <Valor>{nota.eventoNome}</Valor>
          </NotaItem>
        )}

        <Notas>
          <NotaItem>
            <Label>N1</Label>
            <Valor>{nota.n1?.toFixed(1) ?? "-"}</Valor>
          </NotaItem>

          <NotaItem>
            <Label>N2</Label>
            <Valor>{nota.n2?.toFixed(1) ?? "-"}</Valor>
          </NotaItem>

          <NotaItem>
            <Label>N3</Label>
            <Valor>{nota.n3?.toFixed(1) ?? "-"}</Valor>
          </NotaItem>

          <NotaItem>
            <Label>N4</Label>
            <Valor>{nota.n4?.toFixed(1) ?? "-"}</Valor>
          </NotaItem>

          <NotaItem>
            <Label>N5</Label>
            <Valor>{nota.n5?.toFixed(1) ?? "-"}</Valor>
          </NotaItem>

          {nota.desconto > 0 && (
            <NotaItem>
              <Label>Desconto</Label>
              <Valor>-{nota.desconto.toFixed(1)}</Valor>
            </NotaItem>
          )}

          <NotaItem>
            <Label>Nota final</Label>
            <Media $aprovado={aprovado}>{notaFinal.toFixed(1)}</Media>
          </NotaItem>
        </Notas>
      </Content>

      <Actions>
        <EditButton
          type="button"
          onClick={() => onEdit(nota)}
          onMouseMove={handleMouseMove}
          aria-label={`Editar nota de ${nomeAluno}`}
          title="Editar nota"
        >
          <FaEdit aria-hidden="true" />
        </EditButton>

        <DeleteButton
          type="button"
          onClick={() => onDelete(nota.id)}
          onMouseMove={handleMouseMove}
          aria-label={`Excluir nota de ${nomeAluno}`}
          title="Excluir nota"
        >
          <FaTrash aria-hidden="true" />
        </DeleteButton>
      </Actions>
    </Card>
  );
}