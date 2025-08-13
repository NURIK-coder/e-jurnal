import React from "react";
import styles from "./custom-datepicker.module.scss";
import { formatDate } from "../../../utils/helpers";

interface CustomDatePickerProps {
  value: string;
  onChange: (event: string) => void;
  label: string;
  error?: boolean;
  helperText?: string;
  minDate?: string;
  maxDate?: string;
  disabled?: boolean;
  required?: boolean;
  placeholder?: string;
  format?: string; // for potential future enhancement
  onBlur?: () => void;
  onFocus?: () => void;
  fullWidth?: boolean;
  variant?: "outlined" | "standard"; // 'outlined' by default
}

const CustomDatePicker: React.FC<CustomDatePickerProps> = ({
  value,
  onChange,
  label,
  error,
  helperText,
  minDate,
  maxDate,
  disabled,
  required,
  placeholder,
  onBlur,
  onFocus,
  fullWidth = false,
  variant = "outlined",
}) => {
  return (
    <div
      className={`${styles.datePickerContainer} ${
        fullWidth ? styles.fullWidth : ""
      }`}
    >
      <label className={styles.label}>
        {label}
        <input
          type="date"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          min={minDate}
          max={maxDate}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          onBlur={onBlur}
          onFocus={onFocus}
          className={`${styles.datePickerInput} ${
            variant === "outlined" ? styles.outlined : styles.standard
          } ${error ? styles.error : ""}`}
        />
      </label>
      {helperText && <p className={styles.helperText}>{helperText}</p>}
    </div>
  );
};

export default CustomDatePicker;
