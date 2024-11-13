import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import ListContainer from "./ListContainer";

describe("ListContainer Component", () => {
  it("renders children correctly", () => {
    render(
      <ListContainer>
        <div>Item 1</div>
        <div>Item 2</div>
      </ListContainer>
    );

    const item1 = screen.getByText("Item 1");
    const item2 = screen.getByText("Item 2");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
  });
});
