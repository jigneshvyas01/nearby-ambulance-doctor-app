import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AmbulanceList from "./AmbulanceList";
import axios from "axios";

// Mock axios
jest.mock("axios");

// This ensures that we correctly mock axios.get and enable mocking methods like mockResolvedValueOnce
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("AmbulanceList Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("displays loading skeletons while fetching data", () => {
    // Mock successful response
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: [], totalPages: 1, total: 0 },
    });

    render(<AmbulanceList />);

    // Check if skeleton loaders are displayed while loading
    const skeletons = screen.getAllByTestId("skeleton-loader");
    expect(skeletons.length).toBeGreaterThan(0);
  });

  test("displays error message if fetching ambulances fails", async () => {
    // Mock failed API call
    mockedAxios.get.mockRejectedValueOnce(
      new Error("Failed to fetch ambulances")
    );

    render(<AmbulanceList />);

    await waitFor(() => {
      expect(
        screen.getByText(/Failed to fetch ambulances/)
      ).toBeInTheDocument();
    });
  });

  test("displays empty message if no ambulances are available", async () => {
    // Mock empty data response
    mockedAxios.get.mockResolvedValueOnce({
      data: { data: [], totalPages: 1, total: 0 },
    });

    render(<AmbulanceList />);

    await waitFor(() => {
      expect(screen.getByText(/No ambulances available/)).toBeInTheDocument();
    });
  });

  test("displays ambulance items when available", async () => {
    // Mock response with ambulance data
    const ambulanceData = [
      {
        id: "1",
        title: "Ambulance 1",
        description: "Description 1",
        location: "Location 1",
      },
      {
        id: "2",
        title: "Ambulance 2",
        description: "Description 2",
        location: "Location 2",
      },
    ];

    mockedAxios.get.mockResolvedValueOnce({
      data: { data: ambulanceData, totalPages: 1, total: ambulanceData.length },
    });

    render(<AmbulanceList />);

    // Check if ambulance titles are displayed
    await waitFor(() => {
      expect(screen.getByText("Ambulance 1")).toBeInTheDocument();
      expect(screen.getByText("Ambulance 2")).toBeInTheDocument();
    });
  });

  test("displays pagination and handles page change", async () => {
    // Mock paginated response
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            id: "1",
            title: "Ambulance 1",
            description: "Description 1",
            location: "Location 1",
          },
        ],
        totalPages: 2,
        total: 1,
      },
    });

    render(<AmbulanceList />);

    // Check if pagination is displayed
    expect(
      screen.getByText("Total Ambulances available: 1")
    ).toBeInTheDocument();

    // Simulate page change
    const nextPageButton = screen.getByText("Next");
    fireEvent.click(nextPageButton);

    // Verify that the API is called again with the correct page number
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/ambulances?page=2`
      );
    });
  });

  test("refetches data when refetch prop is set", async () => {
    // Mock initial and refetch response
    mockedAxios.get.mockResolvedValueOnce({
      data: {
        data: [
          {
            id: "1",
            title: "Ambulance 1",
            description: "Description 1",
            location: "Location 1",
          },
        ],
        totalPages: 1,
        total: 1,
      },
    });

    // Create state to manage refetch
    const setRefetch = jest.fn();
    const { rerender } = render(
      <AmbulanceList refetch={true} setRefetch={setRefetch} />
    );

    // Verify that fetch is called on render
    await waitFor(() => {
      expect(mockedAxios.get).toHaveBeenCalledWith(
        `${import.meta.env.VITE_API_URL}/api/ambulances?page=1`
      );
    });

    // Simulate refetch
    rerender(<AmbulanceList refetch={true} setRefetch={setRefetch} />);

    // Verify that fetch is triggered again
    expect(mockedAxios.get).toHaveBeenCalledTimes(2);
    expect(setRefetch).toHaveBeenCalledWith(false);
  });
});
