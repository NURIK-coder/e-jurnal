import React, { ChangeEvent, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import styles from "./custom-search-input.module.scss";

interface CustomSearchInputProps {
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onClear?: () => void;
  name?: string;
  label?: string;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const CustomSearchInput: React.FC<CustomSearchInputProps> = ({
  placeholder = "Izlash...",
  value,
  onChange,
  onClear,
  name = "",
  label = "",
  className = "",
  style = {},
  disabled = false,
  required = false,
  isError = false,
  errorMessage = "Invalid input",
}) => {
  return (
    <div className={`${styles.customSearchInput} ${className}`} style={style}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        <SearchIcon className={styles.searchIcon} />
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          name={name}
          id={name}
          className={`${styles.input} ${isError ? styles.errorInput : ""}`}
          disabled={disabled}
          required={required}
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className={styles.clearButton}
            disabled={disabled}
          >
            <ClearIcon />
          </button>
        )}
      </div>
      {isError && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default CustomSearchInput;
