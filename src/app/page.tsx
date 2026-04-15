import { TarefasClient } from "@/components/TarefasClient";
import { buscarTarefasIniciais } from "@/lib/tarefas";

export default async function Home() {
  const tarefasIniciais = await buscarTarefasIniciais();

  return (
    <main className="container">
      <h1>Lista de Tarefas</h1>
      <p className="subtitulo">Adicione novas tarefas e acompanhe o total.</p>
      <TarefasClient tarefasIniciais={tarefasIniciais} />
    </main>
  );
}
