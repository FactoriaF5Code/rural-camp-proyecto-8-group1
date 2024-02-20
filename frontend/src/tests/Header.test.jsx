import { render, screen } from "@testing-library/react";
import { test } from "vitest";
import { Header } from "../components/Header/Header";

test("El panel no muestra el título", () => {
  render(<Header />);

  expect(screen.queryByText("Hola!")).not.toBeInTheDocument();
});

test("El panel muestra el título", () => {
  render(<Header />);

  expect(screen.queryByText("Greenfield library")).toBeInTheDocument();
});
