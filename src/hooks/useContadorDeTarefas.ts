import { useMemo } from "react";

import { Tarefa } from "@/types/tarefa";

export function useContadorDeTarefas(tarefas: Tarefa[]): number {
  return useMemo(() => tarefas.length, [tarefas]);
}
