import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Container from "./Container";

describe("Container Component", () => {
  it("renders children correctly", () => {
    render(
      <Container>
        <div>Child 1</div>
        <div>Child 2</div>
      </Container>
    );
    const child1 = screen.getByText("Child 1");
    const child2 = screen.getByText("Child 2");

    expect(child1).toBeInTheDocument();
    expect(child2).toBeInTheDocument();
  });

  it("renders with only one child", () => {
    render(
      <Container>
        <div>Single Child</div>
      </Container>
    );
    const singleChild = screen.getByText("Single Child");

    expect(singleChild).toBeInTheDocument();
  });

  it("renders with multiple children", () => {
    render(
      <Container>
        <div>Child 1</div>
        <div>Child 2</div>
        <div>Child 3</div>
      </Container>
    );

    const child1 = screen.getByText("Child 1");
    const child2 = screen.getByText("Child 2");
    const child3 = screen.getByText("Child 3");

    expect(child1).toBeInTheDocument();
    expect(child2).toBeInTheDocument();
    expect(child3).toBeInTheDocument();
  });
});
