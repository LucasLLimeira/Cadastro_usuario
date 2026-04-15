"use client";

import { useState } from "react";

import { useContadorDeTarefas } from "@/hooks/useContadorDeTarefas";
import { Tarefa } from "@/types/tarefa";
import { ListaTarefas } from "./ListaTarefas";
import { NovaTarefa } from "./NovaTarefa";

interface TarefasClientProps {
  tarefasIniciais: Tarefa[];
}

export function TarefasClient({ tarefasIniciais }: TarefasClientProps) {
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);
  const totalDeTarefas = useContadorDeTarefas(tarefas);

  function adicionarTarefa(titulo: string) {
    const novaTarefa: Tarefa = {
      id: crypto.randomUUID(),
      titulo,
      concluida: false,
    };

    setTarefas((estadoAtual) => [...estadoAtual, novaTarefa]);
  }

  return (
    <section className="painel">
      <p className="contador">Total de tarefas: {totalDeTarefas}</p>
      <NovaTarefa onAdicionarTarefa={adicionarTarefa} />
      <ListaTarefas tarefas={tarefas} />
    </section>
  );
}
