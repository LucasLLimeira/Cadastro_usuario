import { render, screen } from "@testing-library/react";

import Home from "@/app/page";

describe("Home page", () => {
  it("renderiza a pagina com tarefas iniciais", async () => {
    const pagina = await Home();
    render(pagina);

    expect(
      screen.getByRole("heading", { name: /lista de tarefas/i }),
    ).toBeInTheDocument();
    expect(screen.getByText(/adicione novas tarefas/i)).toBeInTheDocument();
    expect(screen.getByText(/estudar testes unitarios/i)).toBeInTheDocument();
    expect(screen.getByText(/praticar app router/i)).toBeInTheDocument();
    expect(screen.getByText(/criar hook de contagem/i)).toBeInTheDocument();
  });
});
