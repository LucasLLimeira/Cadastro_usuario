import { renderHook } from "@testing-library/react";

import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";
import { Tarefa } from "@/types/tarefa";

describe("useContadorDeTarefas", () => {
  it("retorna 0 para lista vazia", () => {
    const { result } = renderHook(() => useContadorDeTarefas([]));

    expect(result.current).toBe(0);
  });

  it("retorna o total de tarefas", () => {
    const tarefas: Tarefa[] = [
      { id: "1", titulo: "Tarefa 1", concluida: false },
      { id: "2", titulo: "Tarefa 2", concluida: false },
      { id: "3", titulo: "Tarefa 3", concluida: true },
    ];

    const { result } = renderHook(() => useContadorDeTarefas(tarefas));

    expect(result.current).toBe(3);
  });
});
