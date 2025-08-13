import React, { ReactNode } from "react";
import styles from "./custom-button.module.scss";

interface CustomButtonProps {
  children: ReactNode; // The content inside the button
  onClick?: () => void; // Click handler
  type?: "button" | "submit" | "reset"; // Button type
  disabled?: boolean; // Disable state
  className?: string; // Additional CSS classes
  style?: React.CSSProperties; // Custom styles
  isLoading?: boolean; // Loading state
}

const CustomButton: React.FC<CustomButtonProps> = ({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  style = {},
  isLoading = false,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`${styles.customButton} ${className}`}
      style={style}
      disabled={disabled || isLoading}
    >
      {isLoading ? <span className={styles.loader}></span> : children}
    </button>
  );
};

export default CustomButton;
