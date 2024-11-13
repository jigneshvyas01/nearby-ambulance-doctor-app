import React, { ButtonHTMLAttributes } from "react";
import styled from "styled-components";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "tertiary"; // Adding a tertiary option for more subtle buttons
  size?: "small" | "medium" | "large";
}

const buttonSizes = {
  small: "8px 16px",
  medium: "10px 20px",
  large: "12px 24px",
};

const buttonVariants = {
  primary: {
    background: "#5C6BC0", // Subtle blue
    color: "#FFFFFF",
    border: "none",
    hover: "#4F5B93", // Darker blue on hover
    active: "#3E4A7E", // Even darker on active
  },
  secondary: {
    background: "#B0BEC5", // Light grey
    color: "#FFFFFF",
    border: "none",
    hover: "#90A4AE", // Slightly darker grey on hover
    active: "#78909C", // Even darker grey on active
  },
  tertiary: {
    background: "#F5F5F5", // Lightest grey
    color: "#757575", // Dark grey text
    border: "1px solid #E0E0E0",
    hover: "#E0E0E0", // Slight darkening on hover
    active: "#BDBDBD", // Darker grey on active
  },
};

const StyledButton = styled.button<ButtonProps>`
  font-family: "Arial", sans-serif;
  font-size: 1rem;
  padding: ${({ size = "medium" }) => buttonSizes[size]};
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: inline-flex;
  align-items: center;
  justify-content: center;

  background-color: ${({ variant = "primary" }) =>
    buttonVariants[variant].background};
  color: ${({ variant = "primary" }) => buttonVariants[variant].color};
  border: ${({ variant = "primary" }) => buttonVariants[variant].border};

  &:hover {
    background-color: ${({ variant = "primary" }) =>
      buttonVariants[variant].hover};
  }

  &:active {
    background-color: ${({ variant = "primary" }) =>
      buttonVariants[variant].active};
  }

  &:disabled {
    background-color: #e0e0e0;
    color: #b0b0b0;
    cursor: not-allowed;
  }
`;

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = "primary",
  size = "medium",
  ...props
}) => {
  return (
    <StyledButton variant={variant} size={size} {...props}>
      {children}
    </StyledButton>
  );
};
