import { fireEvent, render, screen } from "@testing-library/react";

import { NovaTarefa } from "@/components/NovaTarefa";

describe("NovaTarefa", () => {
  it("renderiza input e botao", () => {
    render(<NovaTarefa onAdicionarTarefa={jest.fn()} />);

    expect(screen.getByLabelText(/nova tarefa/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", {
        name: /adicionar/i,
      }),
    ).toBeInTheDocument();
  });

  it("nao envia quando o input esta vazio", () => {
    const onAdicionarTarefa = jest.fn();
    render(<NovaTarefa onAdicionarTarefa={onAdicionarTarefa} />);

    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(onAdicionarTarefa).not.toHaveBeenCalled();
    expect(
      screen.getByText(/digite uma tarefa antes de enviar/i),
    ).toBeInTheDocument();
  });

  it("submete o valor valido e limpa o campo", () => {
    const onAdicionarTarefa = jest.fn();
    render(<NovaTarefa onAdicionarTarefa={onAdicionarTarefa} />);

    const input = screen.getByLabelText(/nova tarefa/i);
    fireEvent.change(input, { target: { value: "  Estudar Jest  " } });
    fireEvent.click(screen.getByRole("button", { name: /adicionar/i }));

    expect(onAdicionarTarefa).toHaveBeenCalledTimes(1);
    expect(onAdicionarTarefa).toHaveBeenCalledWith("Estudar Jest");
    expect(input).toHaveValue("");
  });
});
