import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AmbulanceForm from "./AmbulanceForm";
import { Ambulance } from "./AmbulanceList";

// Dummy ambulance data for testing
const ambulance: Ambulance = {
  id: "1",
  title: "Ambulance 1",
  description: "This is a description",
  location: "Location 1",
  image: "ambulance.jpg",
};

describe("AmbulanceForm", () => {
  it("should render form with default values if ambulance prop is provided", () => {
    render(<AmbulanceForm ambulance={ambulance} onSubmit={jest.fn()} />);

    expect(screen.getByDisplayValue(ambulance.title)).toBeInTheDocument();
    expect(screen.getByDisplayValue(ambulance.description)).toBeInTheDocument();
    expect(screen.getByDisplayValue(ambulance.location)).toBeInTheDocument();
  });

  it("should show validation errors when fields are empty and form is submitted", async () => {
    render(<AmbulanceForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByRole("button", { name: /create/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(screen.getByText(/title is required/i)).toBeInTheDocument();
      expect(screen.getByText(/description is required/i)).toBeInTheDocument();
      expect(screen.getByText(/location is required/i)).toBeInTheDocument();
    });
  });

  it("should display image preview when a file is selected", async () => {
    render(<AmbulanceForm onSubmit={jest.fn()} />);

    const fileInput = screen.getByLabelText(/upload an image/i);
    const file = new File(["image"], "ambulance.jpg", { type: "image/jpeg" });

    fireEvent.change(fileInput, { target: { files: [file] } });

    const imagePreview = await screen.findByAltText("Preview");
    expect(imagePreview).toBeInTheDocument();
    expect(imagePreview).toHaveAttribute(
      "src",
      expect.stringContaining("blob:")
    );
  });

  it("should call onSubmit with the correct data when creating a new ambulance", async () => {
    const mockOnSubmit = jest.fn();
    render(<AmbulanceForm onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const locationInput = screen.getByLabelText(/location/i);
    const fileInput = screen.getByLabelText(/upload an image/i);
    const submitButton = screen.getByRole("button", { name: /create/i });

    fireEvent.change(titleInput, { target: { value: "Ambulance 2" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New ambulance description" },
    });
    fireEvent.change(locationInput, { target: { value: "Location 2" } });

    const file = new File(["image"], "ambulance2.jpg", { type: "image/jpeg" });
    fireEvent.change(fileInput, { target: { files: [file] } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          title: "Ambulance 2",
          description: "New ambulance description",
          location: "Location 2",
        },
        file
      );
    });
  });

  it("should call onSubmit with the correct data when updating an ambulance", async () => {
    const mockOnSubmit = jest.fn();
    render(<AmbulanceForm ambulance={ambulance} onSubmit={mockOnSubmit} />);

    const titleInput = screen.getByLabelText(/title/i);
    const descriptionInput = screen.getByLabelText(/description/i);
    const locationInput = screen.getByLabelText(/location/i);
    const submitButton = screen.getByRole("button", { name: /update/i });

    fireEvent.change(titleInput, { target: { value: "Updated Ambulance" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated description" },
    });
    fireEvent.change(locationInput, { target: { value: "Updated Location" } });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          title: "Updated Ambulance",
          description: "Updated description",
          location: "Updated Location",
        },
        null
      );
    });
  });

  it("should disable the submit button while the form is submitting", () => {
    render(<AmbulanceForm onSubmit={jest.fn()} />);

    const submitButton = screen.getByRole("button", { name: /create/i });
    expect(submitButton).not.toBeDisabled();
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });
});
