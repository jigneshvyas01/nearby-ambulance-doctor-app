import React from "react";
import styled from "styled-components";

type ModalProps = {
  onClose: () => void;
  title?: string;
};

const Modal: React.FC<React.PropsWithChildren<ModalProps>> = ({
  children,
  onClose,
  title,
}) => {
  return (
    <ModalOverlay>
      <ModalContent>
        <ModalHeader>
          {title && <StyledTitle>{title}</StyledTitle>}
          <CloseButton onClick={onClose}>&times;</CloseButton>
        </ModalHeader>
        {children}
      </ModalContent>
    </ModalOverlay>
  );
};

export default Modal;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4); /* Slightly more subtle dark overlay */
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background-color: #f9f9f9;
  position: relative;
  padding: 20px;
  border-radius: 12px; /* Softer, rounded corners */
  width: 450px; /* Slightly wider for a better layout */
  max-width: 90%;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1); /* Subtle shadow for depth */
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  font-size: 24px; /* Larger size for better accessibility */
  color: #888; /* Softer color for the close button */
  cursor: pointer;
  transition: color 0.2s ease;

  &:hover {
    color: #333; /* Darker color on hover */
  }
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
`;

const StyledTitle = styled.h2`
  font-size: 1.6rem;
  font-weight: 600;
  margin: 0;
  color: #333; /* Subtle dark title color */
`;
