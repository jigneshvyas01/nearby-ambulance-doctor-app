import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import AmbulanceItem from "./AmbulanceItem";
import { Ambulance } from "./AmbulanceList";
import axios from "axios";

// Mock axios delete function
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

// Dummy ambulance data for testing
const ambulance: Ambulance = {
  id: "1",
  title: "Ambulance 1",
  description: "This is a description",
  location: "Location 1",
};

describe("AmbulanceItem", () => {
  it("should render ambulance data correctly", () => {
    render(<AmbulanceItem ambulance={ambulance} isManaging={false} />);

    expect(screen.getByText(ambulance.title)).toBeInTheDocument();
    expect(screen.getByText(ambulance.description)).toBeInTheDocument();
    expect(
      screen.getByText(`Location: ${ambulance.location}`)
    ).toBeInTheDocument();
  });

  it("should render the default image when no image prop is provided", () => {
    render(<AmbulanceItem ambulance={ambulance} isManaging={false} />);
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("ambulance.jpg")
    );
  });

  it("should display the edit and delete buttons when isManaging is true", () => {
    render(
      <AmbulanceItem
        ambulance={ambulance}
        isManaging={true}
        handleEditItem={() => {}}
      />
    );

    expect(screen.getByRole("button", { name: /trash/i })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /edit/i })).toBeInTheDocument();
  });

  it("should not display edit and delete buttons when isManaging is false", () => {
    render(<AmbulanceItem ambulance={ambulance} isManaging={false} />);

    const deleteButton = screen.queryByRole("button", { name: /trash/i });
    const editButton = screen.queryByRole("button", { name: /edit/i });

    expect(deleteButton).not.toBeInTheDocument();
    expect(editButton).not.toBeInTheDocument();
  });

  it("should call handleAmbulanceItemDelete when delete button is clicked", async () => {
    mockedAxios.delete.mockResolvedValueOnce({ data: {} });

    const setRefetch = jest.fn();
    render(
      <AmbulanceItem
        ambulance={ambulance}
        isManaging={true}
        setRefetch={setRefetch}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /trash/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/ambulances/${ambulance.id}`
      );
      expect(setRefetch).toHaveBeenCalledWith(true);
    });
  });

  it("should call handleAmbulanceItemEdit when edit button is clicked", () => {
    const handleEditItem = jest.fn();
    render(
      <AmbulanceItem
        ambulance={ambulance}
        isManaging={true}
        handleEditItem={handleEditItem}
      />
    );

    const editButton = screen.getByRole("button", { name: /edit/i });
    fireEvent.click(editButton);

    expect(handleEditItem).toHaveBeenCalledWith(ambulance);
  });

  it("should not call delete function if axios.delete fails", async () => {
    mockedAxios.delete.mockRejectedValueOnce(new Error("Delete failed"));

    render(
      <AmbulanceItem
        ambulance={ambulance}
        isManaging={true}
        setRefetch={jest.fn()}
      />
    );

    const deleteButton = screen.getByRole("button", { name: /trash/i });
    fireEvent.click(deleteButton);

    await waitFor(() => {
      expect(mockedAxios.delete).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/ambulances/${ambulance.id}`
      );
    });
  });
});
