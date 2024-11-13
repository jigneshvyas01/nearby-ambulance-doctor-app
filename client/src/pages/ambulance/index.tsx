import React from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import AmbulanceList from "./components/AmbulanceList";
import Container from "../../components/Container";
import styled from "styled-components";

const Ambulance: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <StyledHeader>
        <HeaderContent>
          <HeaderTitle>Ambulance Services</HeaderTitle>
          <HeaderSubtitle>
            Quickly access or manage ambulances near you
          </HeaderSubtitle>
        </HeaderContent>
        <HeaderButtons>
          <Button onClick={() => navigate("/")}>Home</Button>
          <Button onClick={() => navigate("/ambulances/manage")}>
            Manage Fleet
          </Button>
        </HeaderButtons>
      </StyledHeader>
      <Content>
        <MainTitle>Welcome to Ambulance Services</MainTitle>
        <Description>
          Explore and manage ambulance services efficiently. Select an option to
          begin.
        </Description>
        <AmbulanceList />
      </Content>
    </Container>
  );
};

export default Ambulance;

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

const MainTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: bold;
  color: #333;
`;

const Description = styled.p`
  font-size: 1rem;
  color: #666;
  margin: 10px 0 20px;
`;
