import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal Component", () => {
  it("renders the modal with children", () => {
    render(
      <Modal onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    const content = screen.getByText("Modal Content");
    expect(content).toBeInTheDocument();
  });

  it("renders the title if provided", () => {
    render(
      <Modal onClose={() => {}} title="Modal Title">
        <div>Modal Content</div>
      </Modal>
    );

    const title = screen.getByText("Modal Title");
    expect(title).toBeInTheDocument();
  });

  it("does not render the title if not provided", () => {
    render(
      <Modal onClose={() => {}}>
        <div>Modal Content</div>
      </Modal>
    );

    const title = screen.queryByText("Modal Title");
    expect(title).toBeNull();
  });
});
