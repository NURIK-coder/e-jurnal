import React, { ChangeEvent, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import styles from "./custom-input.module.scss";

interface CustomInputProps {
  type?: string;
  placeholder?: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name?: string;
  label?: string;
  className?: string;
  max?: number;
  style?: React.CSSProperties;
  disabled?: boolean;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const CustomInput: React.FC<CustomInputProps> = ({
  type = "text",
  placeholder = "",
  value,
  onChange,
  name = "",
  max,
  label = "",
  className = "",
  style = {},
  disabled = false,
  required = false,
  isError = false,
  errorMessage = "Invalid input",
}) => {
  const [showPassword, setShowPassword] = useState(false);

  // Function to toggle password visibility
  const handleTogglePassword = () => setShowPassword((prev) => !prev);

  // Determine the input type based on the toggle state
  const inputType =
    type === "password" ? (showPassword ? "text" : "password") : type;

  return (
    <div className={`${styles.customInput} ${className}`} style={{ ...style }}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          className={`${styles.input} ${isError ? styles.errorInput : ""}`}
          disabled={disabled}
          required={required}
        />
        {/* Show/Hide Password Button */}
        {type === "password" && (
          <button
            type="button"
            onClick={handleTogglePassword}
            className={styles.togglePassword}
          >
            {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
          </button>
        )}
      </div>
      {isError && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default CustomInput;
