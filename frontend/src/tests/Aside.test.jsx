import { render, fireEvent, screen } from "@testing-library/react";
import { Aside } from "../components/Aside/Aside";
import { expect } from "chai";

test("muestra el diálogo cuando se hace click en el botón", () => {
  render(<Aside />);
  const button = screen.getByText("AÑADIR LIBRO");
  fireEvent.click(button);
  const dialog = screen.getByText("ACEPTAR");
  expect(dialog).toBeInTheDocument();
});

test("oculta el diálogo cuando se hace clic en el botón de cierre", () => {
  render(<Aside />);

  const addButton = screen.getByText("AÑADIR LIBRO");

  fireEvent.click(addButton);

  let dialog = screen.getByRole("dialog");
  expect(dialog).toBeInTheDocument();

  fireEvent(
    dialog,
    new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
    })
  );

  setTimeout(() => {
    dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  }, 0);
});
