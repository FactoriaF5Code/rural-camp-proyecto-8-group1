import { render, fireEvent, screen, waitFor } from "@testing-library/react";
import { List } from "../components/List/List";
import { test } from "vitest";
import { setupServer } from "msw/node";
import { handlers } from "./handlers";
import userEvent from "@testing-library/user-event";

const server = setupServer(...handlers);

test("realiza una búsqueda y muestra los resultados", async () => {
  render(<List />);

  const input = screen.getByPlaceholderText("Buscar libro...");
  userEvent.type(input, "harry");
  const button = screen.getByAltText("icono buscador");

  userEvent.click(button);
 
  await waitFor(() => {
    expect(
      screen.getByText(/Harry Potter y la Piedra Filosofal/)
    ).toBeInTheDocument();
  });
  expect(
    screen.getByText(/Harry Potter y la Piedra Filosofal/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Harry Potter y el Prisionero de Azkaban/)
  ).toBeInTheDocument();
  expect(
    screen.getByText(/Harry Potter y la Cámara de los Secretos/)
  ).toBeInTheDocument();
});
