import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Home from "./pages/home";
import Ambulance from "./pages/ambulance";
import ManageAmbulances from "./pages/manageAmbulances";
import Doctor from "./pages/doctor";
import ManageDoctors from "./pages/manageDoctors";

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <AppContainer>
        <Routes>
          <Route path="/ambulances" element={<Ambulance />} />
          <Route path="/ambulances/manage" element={<ManageAmbulances />} />
          <Route path="/doctors" element={<Doctor />} />
          <Route path="/doctors/manage" element={<ManageDoctors />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </AppContainer>
    </BrowserRouter>
  );
};

export default App;
