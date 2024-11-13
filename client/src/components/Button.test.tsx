import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Button } from "./Button";

describe("Button Component", () => {
  it("renders the button with default props", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
    expect(button).toHaveStyle("padding: 10px 20px"); // Default medium size
  });

  it("renders the button with the 'secondary' variant", () => {
    render(<Button variant="secondary">Secondary</Button>);
    const button = screen.getByRole("button", { name: /secondary/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Secondary");
  });

  it("renders the button with the 'tertiary' variant", () => {
    render(<Button variant="tertiary">Tertiary</Button>);
    const button = screen.getByRole("button", { name: /tertiary/i });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Tertiary");
  });

  it("applies the correct size styles", () => {
    const { rerender } = render(<Button size="small">Small</Button>);
    let button = screen.getByRole("button", { name: /small/i });

    expect(button).toHaveStyle("padding: 8px 16px"); // Small size padding

    rerender(<Button size="large">Large</Button>);
    button = screen.getByRole("button", { name: /large/i });

    expect(button).toHaveStyle("padding: 12px 24px"); // Large size padding
  });

  it("handles click events correctly", () => {
    const onClick = jest.fn();
    render(<Button onClick={onClick}>Click Me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });

    fireEvent.click(button); // Simulate click event
    expect(onClick).toHaveBeenCalledTimes(1); // Verify that onClick was called
  });
});
