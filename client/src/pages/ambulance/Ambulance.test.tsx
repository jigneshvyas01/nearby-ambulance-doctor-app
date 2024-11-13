// src/pages/ambulance/Ambulance.test.tsx

import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useNavigate } from "react-router-dom";
import Ambulance from "../ambulance"; // Adjust the path as necessary

// Mock the useNavigate hook
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Ambulance Component", () => {
  const mockNavigate = useNavigate as jest.Mock;

  beforeEach(() => {
    mockNavigate.mockClear(); // Clear any previous mock data before each test
  });

  test("renders ambulance page with correct header values", () => {
    render(<Ambulance />);

    // Test Header Title
    const headerTitle = screen.getByText(/Ambulance Services/i);
    expect(headerTitle).toBeInTheDocument();

    // Test Header Subtitle
    const headerSubtitle = screen.getByText(
      /Quickly access or manage ambulances near you/i
    );
    expect(headerSubtitle).toBeInTheDocument();
  });

  test("renders Home and Manage Fleet buttons", () => {
    render(<Ambulance />);

    // Test Home Button
    const homeButton = screen.getByText(/Home/i);
    expect(homeButton).toBeInTheDocument();

    // Test Manage Fleet Button
    const manageFleetButton = screen.getByText(/Manage Fleet/i);
    expect(manageFleetButton).toBeInTheDocument();
  });

  test("navigates to correct page when Home button is clicked", () => {
    render(<Ambulance />);

    // Test navigation for Home button
    const homeButton = screen.getByText(/Home/i);
    fireEvent.click(homeButton);
    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  test("navigates to correct page when Manage Fleet button is clicked", () => {
    render(<Ambulance />);

    // Test navigation for Manage Fleet button
    const manageFleetButton = screen.getByText(/Manage Fleet/i);
    fireEvent.click(manageFleetButton);
    expect(mockNavigate).toHaveBeenCalledWith("/ambulances/manage");
  });

  test("renders main title and description", () => {
    render(<Ambulance />);

    // Test Main Title
    const mainTitle = screen.getByText(/Welcome to Ambulance Services/i);
    expect(mainTitle).toBeInTheDocument();

    // Test Description
    const description = screen.getByText(
      /Explore and manage ambulance services efficiently. Select an option to begin./i
    );
    expect(description).toBeInTheDocument();
  });

  test("renders ambulance list component", () => {
    render(<Ambulance />);

    // Test if the Ambulance List component is rendered
    const ambulanceList = screen.getByTestId("ambulance-list");
    expect(ambulanceList).toBeInTheDocument();
  });
});
