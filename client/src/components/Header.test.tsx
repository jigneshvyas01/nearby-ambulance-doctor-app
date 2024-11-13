import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Header from "./Header";

describe("Header Component", () => {
  it("renders the title correctly", () => {
    render(<Header title="Header Title" />);

    const title = screen.getByRole("heading", { name: /header title/i });
    expect(title).toBeInTheDocument();
  });

  it("renders children correctly", () => {
    render(
      <Header title="Header Title">
        <button>Click Me</button>
      </Header>
    );

    const button = screen.getByText("Click Me");
    expect(button).toBeInTheDocument();
  });

  it("renders with correct styles", () => {
    render(<Header title="Styled Header" />);

    const container = screen.getByRole("heading", {
      name: /styled header/i,
    }).parentElement;

    expect(container).toHaveStyle("display: flex");
    expect(container).toHaveStyle("gap: 2rem");
    expect(container).toHaveStyle("justify-content: space-between");
    expect(container).toHaveStyle("align-items: center");
  });

  it("does not render children if not provided", () => {
    render(<Header title="No Children" />);

    const buttonContainer = screen.queryByRole("region");
    expect(buttonContainer).toBeNull();
  });
});
