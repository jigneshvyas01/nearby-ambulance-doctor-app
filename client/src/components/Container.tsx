import React from 'react'
import styled from 'styled-components';

const Container: React.FC<React.PropsWithChildren> = ({ children }) => {
    return (
        <StyledDiv>{children}</StyledDiv>
    )
};

export default Container;

const StyledDiv = styled.div`
    display: flex;
    gap: 2rem;
    flex-direction: column;
`