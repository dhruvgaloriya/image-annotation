import React from "react";
import "./Button.css";

interface ButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  disabled?: boolean;
  active?: boolean;
  title?: string;
}

/**
 * A reusable button component with active and disabled states
 * @param children - Content to display inside the button
 * @param onClick - Click handler function
 * @param disabled - Whether the button is disabled
 * @param active - Whether the button is in active state
 */
const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  disabled = false,
  active = false,
}) => {
  return (
    <button
      className={`button ${active ? "button--active" : ""}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
