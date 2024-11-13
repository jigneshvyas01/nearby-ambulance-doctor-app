import React from "react";
import styled from "styled-components";

type HeaderProps = {
  title: string;
  children?: React.ReactNode;
};

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  return (
    <>
      <Container>
        <h1>{title}</h1>
        <ButtonContainer>{children}</ButtonContainer>
      </Container>
    </>
  );
};

export default Header;

const Container = styled.div`
  color: #000;
  width: 100%;
  display: flex;
  gap: 2rem;
  justify-content: space-between;
  align-items: center;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 2rem;
`;
