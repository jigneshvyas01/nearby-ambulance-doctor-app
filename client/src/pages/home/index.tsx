import React from "react";
import { Button } from "../../components/Button";
import { useNavigate } from "react-router-dom";
import Container from "../../components/Container";
import Header from "../../components/Header";
import styled from "styled-components";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container>
      <Header title="Welcome to Our Service" />
      <ContentWrapper>
        <Heading>Get Help in Moments</Heading>
        <Description>
          Whether you're searching for ambulances or doctors, we're here to
          connect you with the right help, right away.
        </Description>
        <Actions>
          <Button onClick={() => navigate("/ambulances")}>
            Search Ambulances
          </Button>
          <Button onClick={() => navigate("/doctors")}>Search Doctors</Button>
        </Actions>
      </ContentWrapper>
    </Container>
  );
};

export default Home;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  gap: 20px;
  text-align: center;
`;

const Heading = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #333;
`;

const Description = styled.p`
  font-size: 1.2rem;
  color: #555;
  line-height: 1.5;
  max-width: 600px;
`;

const Actions = styled.div`
  display: flex;
  gap: 15px;
  margin-top: 20px;
`;
