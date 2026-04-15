"use client";

import { FormEvent, useState } from "react";

interface NovaTarefaProps {
  onAdicionarTarefa: (titulo: string) => void;
}

export function NovaTarefa({ onAdicionarTarefa }: NovaTarefaProps) {
  const [titulo, setTitulo] = useState("");
  const [erro, setErro] = useState("");

  function aoEnviar(evento: FormEvent<HTMLFormElement>) {
    evento.preventDefault();

    const valorLimpo = titulo.trim();
    if (!valorLimpo) {
      setErro("Digite uma tarefa antes de enviar.");
      return;
    }

    onAdicionarTarefa(valorLimpo);
    setTitulo("");
    setErro("");
  }

  return (
    <form className="form" onSubmit={aoEnviar}>
      <input
        type="text"
        placeholder="Nova tarefa"
        aria-label="Nova tarefa"
        value={titulo}
        onChange={(evento) => {
          setTitulo(evento.target.value);
          if (erro) {
            setErro("");
          }
        }}
      />
      <button type="submit">Adicionar</button>
      {erro ? <p className="erro">{erro}</p> : null}
    </form>
  );
}
