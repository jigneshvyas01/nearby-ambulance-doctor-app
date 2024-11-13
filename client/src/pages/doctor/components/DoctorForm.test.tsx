import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DoctorForm from "./DoctorForm";

// Mock function for form submission
const mockOnSubmit = jest.fn();

describe("DoctorForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render the form correctly with default values", () => {
    const doctor = {
      id: "1",
      title: "Dr. John Doe",
      description: "Cardiologist",
      location: "New York",
      image: "doctor-image.jpg",
    };

    render(<DoctorForm doctor={doctor} onSubmit={mockOnSubmit} />);

    // Check if form inputs are pre-filled with the doctor's data
    expect(screen.getByLabelText(/Title/i)).toHaveValue(doctor.title);
    expect(screen.getByLabelText(/Description/i)).toHaveValue(
      doctor.description
    );
    expect(screen.getByLabelText(/Location/i)).toHaveValue(doctor.location);
  });

  test("should handle form submission for creating a new doctor", async () => {
    render(<DoctorForm onSubmit={mockOnSubmit} />);

    // Fill in the form fields
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Dr. Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Pediatrician" },
    });
    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: "Los Angeles" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Create/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          title: "Dr. Jane Doe",
          description: "Pediatrician",
          location: "Los Angeles",
        },
        null
      );
    });
  });

  test("should handle form submission for updating an existing doctor", async () => {
    const doctor = {
      id: "1",
      title: "Dr. John Doe",
      description: "Cardiologist",
      location: "New York",
      image: "doctor-image.jpg",
    };

    render(<DoctorForm doctor={doctor} onSubmit={mockOnSubmit} />);

    // Fill in the form fields with new data
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Dr. Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Pediatrician" },
    });
    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: "Los Angeles" },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Update/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          title: "Dr. Jane Doe",
          description: "Pediatrician",
          location: "Los Angeles",
        },
        null
      );
    });
  });

  test("should display validation errors if required fields are not filled", async () => {
    render(<DoctorForm onSubmit={mockOnSubmit} />);

    // Submit the form without filling in any data
    fireEvent.click(screen.getByRole("button", { name: /Create/i }));

    // Check if the validation errors are displayed
    expect(await screen.findByText(/Title is required/i)).toBeInTheDocument();
    expect(
      await screen.findByText(/Description is required/i)
    ).toBeInTheDocument();
    expect(
      await screen.findByText(/Location is required/i)
    ).toBeInTheDocument();
  });

  test("should handle file input and display image preview", () => {
    render(<DoctorForm onSubmit={mockOnSubmit} />);

    const file = new File(["dummy content"], "doctor-image.jpg", {
      type: "image/jpeg",
    });
    const fileInput = screen.getByLabelText(/Upload an Image/i);

    // Simulate file selection
    fireEvent.change(fileInput, { target: { files: [file] } });

    // Check if the image preview is displayed
    expect(screen.getByAltText(/Preview/i)).toBeInTheDocument();
  });

  test("should submit the form with the selected file", async () => {
    const file = new File(["dummy content"], "doctor-image.jpg", {
      type: "image/jpeg",
    });

    render(<DoctorForm onSubmit={mockOnSubmit} />);

    // Fill in form fields
    fireEvent.change(screen.getByLabelText(/Title/i), {
      target: { value: "Dr. Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText(/Description/i), {
      target: { value: "Pediatrician" },
    });
    fireEvent.change(screen.getByLabelText(/Location/i), {
      target: { value: "Los Angeles" },
    });

    // Select file
    fireEvent.change(screen.getByLabelText(/Upload an Image/i), {
      target: { files: [file] },
    });

    // Submit the form
    fireEvent.click(screen.getByRole("button", { name: /Create/i }));

    await waitFor(() => {
      expect(mockOnSubmit).toHaveBeenCalledWith(
        {
          title: "Dr. Jane Doe",
          description: "Pediatrician",
          location: "Los Angeles",
        },
        file
      );
    });
  });

  test("should disable submit button when form is submitting", () => {
    render(<DoctorForm onSubmit={mockOnSubmit} />);

    // Check that the submit button is enabled initially
    const submitButton = screen.getByRole("button", { name: /Create/i });
    expect(submitButton).not.toBeDisabled();

    // Simulate form submission in progress
    fireEvent.click(submitButton);
    expect(submitButton).toBeDisabled();
  });
});
