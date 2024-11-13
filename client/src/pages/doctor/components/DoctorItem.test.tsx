import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DoctorItem from "./DoctorItem";
import { Doctor } from "./DoctorList";

// Mock axios
jest.mock("axios");

const mockDoctor: Doctor = {
  id: "1",
  title: "Dr. John Doe",
  description: "Cardiologist",
  location: "New York",
  image: "doctor-image.jpg",
};

describe("DoctorItem Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render doctor information correctly", () => {
    render(<DoctorItem doctor={mockDoctor} isManaging={false} />);

    // Check if doctor's title, description, and location are displayed
    expect(screen.getByText(mockDoctor.title)).toBeInTheDocument();
    expect(screen.getByText(mockDoctor.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Location: ${mockDoctor.location}`)
    ).toBeInTheDocument();
  });

  test("should render default image if doctor has no image", () => {
    const doctorWithoutImage = { ...mockDoctor, image: "" };
    render(<DoctorItem doctor={doctorWithoutImage} isManaging={false} />);

    // Check if the default image is displayed
    const image = screen.getByAltText(mockDoctor.title);
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("user-profile-icon.jpg")
    );
  });

  test("should show action buttons when isManaging is true", () => {
    render(<DoctorItem doctor={mockDoctor} isManaging={true} />);

    // Check if the edit and delete buttons are displayed
    expect(screen.getByRole("button", { name: /trash/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  test("should call handleEditItem when the edit button is clicked", async () => {
    const handleEditItem = jest.fn();
    render(
      <DoctorItem
        doctor={mockDoctor}
        isManaging={true}
        handleEditItem={handleEditItem}
      />
    );

    const editButton = screen.getByRole("button", { name: /edit/i });

    fireEvent.click(editButton);

    await waitFor(() => {
      expect(handleEditItem).toHaveBeenCalledWith(mockDoctor);
    });
  });

  test("should not show action buttons when isManaging is false", () => {
    render(<DoctorItem doctor={mockDoctor} isManaging={false} />);

    // Check if the action buttons are not displayed
    expect(
      screen.queryByRole("button", { name: /trash/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /edit/i })
    ).not.toBeInTheDocument();
  });
});
