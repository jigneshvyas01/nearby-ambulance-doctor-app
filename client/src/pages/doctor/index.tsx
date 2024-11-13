import React from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import DoctorList from "../doctor/components/DoctorList";
import Container from "../../components/Container";
import styled from "styled-components";

const Doctor: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <StyledHeader>
        <HeaderContent>
          <HeaderTitle>Doctors</HeaderTitle>
          <HeaderSubtitle>
            Manage and view doctors in your system
          </HeaderSubtitle>
        </HeaderContent>
        <HeaderButtons>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Button onClick={() => navigate("/doctors/manage")}>
            Manage Doctors
          </Button>
        </HeaderButtons>
      </StyledHeader>

      <Content>
        <DoctorList />
      </Content>
    </Container>
  );
};

export default Doctor;

const StyledHeader = styled.div`
  background-color: #343a40; /* Dark header color */
  color: white;
  padding: 20px;
  border-radius: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.15); /* Subtle drop shadow */
`;

const HeaderContent = styled.div`
  display: flex;
  flex-direction: column;
`;

const HeaderTitle = styled.h1`
  font-size: 1.8rem;
  margin: 0;
  color: white;
`;

const HeaderSubtitle = styled.p`
  font-size: 1rem;
  margin: 5px 0 0;
  color: #b0bec5; /* Lighter text color for the subtitle */
`;

const HeaderButtons = styled.div`
  display: flex;
  gap: 10px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const Content = styled.div`
  padding: 20px;
  text-align: center;
  background-color: #f8f9fa; /* Light background to contrast with header */
  border-radius: 8px;
`;
