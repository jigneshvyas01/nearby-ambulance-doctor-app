import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import DoctorList, { Doctor } from "./DoctorList";
import axios from "axios";

// Mock axios
jest.mock("axios");

// This ensures that we correctly mock axios.get and enable mocking methods like mockResolvedValue
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("DoctorList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockDoctors: Doctor[] = [
    {
      id: "1",
      title: "Dr. John Doe",
      description: "Cardiologist",
      location: "New York",
    },
    {
      id: "2",
      title: "Dr. Jane Smith",
      description: "Neurologist",
      location: "Los Angeles",
    },
  ];

  test("should display skeleton loader while loading", () => {
    // Mock initial response where doctors list is empty
    mockedAxios.get.mockImplementation(() =>
      Promise.resolve({
        data: { data: [], totalPages: 1, total: 0 },
      })
    );

    render(<DoctorList />);

    // Check if skeleton loader is displayed while loading
    expect(screen.getByText("Skeleton Loader")).toBeInTheDocument();
  });

  test("should display error message when fetching doctors fails", async () => {
    // Mock failed API call
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.reject(new Error("Failed to fetch doctors"))
    );

    render(<DoctorList />);

    await waitFor(() => {
      expect(screen.getByText(/Failed to fetch doctors/)).toBeInTheDocument();
    });
  });

  test("should display 'No doctors available' if no doctors are found", async () => {
    // Mock empty data response
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: [], totalPages: 1, total: 0 },
      })
    );

    render(<DoctorList />);

    await waitFor(() => {
      expect(screen.getByText("No doctors available")).toBeInTheDocument();
    });
  });

  test("should render doctors when data is loaded", async () => {
    // Mock response with doctors data
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: mockDoctors, totalPages: 1, total: 2 },
      })
    );

    render(<DoctorList />);

    await waitFor(() => {
      expect(screen.getByText(mockDoctors[0].title)).toBeInTheDocument();
      expect(screen.getByText(mockDoctors[1].title)).toBeInTheDocument();
    });
  });

  test("should change page when pagination is used", async () => {
    // Mock paginated response
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: mockDoctors, totalPages: 2, total: 4 },
      })
    );

    render(<DoctorList />);

    // Simulate a page change
    fireEvent.click(screen.getByText("Pagination"));

    // Verify that the API was called with the correct page number
    await waitFor(() =>
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining("page=2")
      )
    );
  });

  test("should refetch data when refetch prop is true", async () => {
    // Mock initial response
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: mockDoctors, totalPages: 1, total: 2 },
      })
    );

    const setRefetch = jest.fn();
    const { rerender } = render(
      <DoctorList refetch={true} setRefetch={setRefetch} />
    );

    // Verify that fetch is called on render
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        expect.stringContaining("page=1")
      );
    });

    // Simulate refetch
    rerender(<DoctorList refetch={true} setRefetch={setRefetch} />);

    // Verify that fetch is triggered again
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(setRefetch).toHaveBeenCalledWith(false);
  });

  test("should render pagination component", async () => {
    // Mock paginated response
    mockedAxios.get.mockImplementationOnce(() =>
      Promise.resolve({
        data: { data: mockDoctors, totalPages: 2, total: 4 },
      })
    );

    render(<DoctorList />);

    await waitFor(() => {
      expect(screen.getByText("Pagination")).toBeInTheDocument();
    });
  });
});
