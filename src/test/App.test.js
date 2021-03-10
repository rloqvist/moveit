import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { App } from "App";

test("renders moveit text", () => {
  render(<App />);
  const linkElement = screen.getByText(/moveit/i);
  expect(linkElement).toBeInTheDocument();
});
