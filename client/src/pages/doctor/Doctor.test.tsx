import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import Doctor from "../doctor";

jest.mock("../doctor/components/DoctorList", () => ({
  __esModule: true,
  default: jest.fn(() => <div>Doctor List Component</div>),
}));

const MockNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  useNavigate: () => MockNavigate,
}));

describe("Doctor Component", () => {
  it("should render the Doctor page with the header and content", () => {
    render(
      <Router>
        <Doctor />
      </Router>
    );

    expect(screen.getByText(/Doctors/i)).toBeInTheDocument();
    expect(
      screen.getByText(/Manage and view doctors in your system/i)
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Home/i })).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Manage Doctors/i })
    ).toBeInTheDocument();
    expect(screen.getByText("Doctor List Component")).toBeInTheDocument();
  });

  it("should navigate to '/' when 'Home' button is clicked", () => {
    render(
      <Router>
        <Doctor />
      </Router>
    );

    const homeButton = screen.getByRole("button", { name: /Home/i });
    fireEvent.click(homeButton);

    expect(MockNavigate).toHaveBeenCalledWith("/");
  });

  it("should navigate to '/doctors/manage' when 'Manage Doctors' button is clicked", () => {
    render(
      <Router>
        <Doctor />
      </Router>
    );

    const manageDoctorsButton = screen.getByRole("button", {
      name: /Manage Doctors/i,
    });
    fireEvent.click(manageDoctorsButton);

    expect(MockNavigate).toHaveBeenCalledWith("/doctors/manage");
  });

  it("should render DoctorList component inside Doctor component", () => {
    render(
      <Router>
        <Doctor />
      </Router>
    );

    expect(screen.getByText("Doctor List Component")).toBeInTheDocument();
  });

  it("should adjust layout of header buttons on small screens", () => {
    // Set up the test for mobile screen size
    window.innerWidth = 500; // Simulate mobile screen size
    render(
      <Router>
        <Doctor />
      </Router>
    );

    // Check if the buttons are stacked and centered on small screens
    const buttons = screen.getAllByRole("button");
    expect(buttons[0]).toHaveStyle("flex-wrap: wrap");
    expect(buttons[0]).toHaveStyle("justify-content: center");
  });
});
