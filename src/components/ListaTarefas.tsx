import { Tarefa } from "@/types/tarefa";

interface ListaTarefasProps {
  tarefas: Tarefa[];
}

export function ListaTarefas({ tarefas }: ListaTarefasProps) {
  return (
    <ul aria-label="Lista de tarefas">
      {tarefas.map((tarefa) => (
        <li key={tarefa.id}>{tarefa.titulo}</li>
      ))}
    </ul>
  );
}
