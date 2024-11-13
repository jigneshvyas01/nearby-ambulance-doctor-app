import React from "react";
import styled from "styled-components";

const ListContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return <Container>{children}</Container>;
};

export default ListContainer;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
