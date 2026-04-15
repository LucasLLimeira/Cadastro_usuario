import { Tarefa } from "@/types/tarefa";

const tarefasMock: Tarefa[] = [
  {
    id: "1",
    titulo: "Estudar testes unitarios",
    concluida: false,
  },
  {
    id: "2",
    titulo: "Praticar App Router",
    concluida: false,
  },
  {
    id: "3",
    titulo: "Criar hook de contagem",
    concluida: false,
  },
];

export async function buscarTarefasIniciais(): Promise<Tarefa[]> {
  return Promise.resolve(tarefasMock.map((tarefa) => ({ ...tarefa })));
}
