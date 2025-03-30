import React from "react";
import "./Button.css";

const Button = ({
  children,
  onClick,
  disabled = false,
  active = false,
  title = "",
}) => {
  return (
    <button
      className={`button ${active ? "button--active" : ""}`}
      onClick={onClick}
      disabled={disabled}
      title={title}
    >
      {children}
    </button>
  );
};

export default Button;
