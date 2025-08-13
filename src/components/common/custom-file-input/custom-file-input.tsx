import React, { ChangeEvent, useState, useEffect } from "react";
import styles from "./custom-file-input.module.scss";
import { truncateText } from "../../../utils/helpers";

interface CustomFileInputProps {
  label?: string;
  name?: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  style?: React.CSSProperties;
  disabled?: boolean;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
  defaultFileName?: string; // Default file name or URL
}

const CustomFileInput: React.FC<CustomFileInputProps> = ({
  label = "",
  name = "",
  onChange,
  className = "",
  style = {},
  disabled = false,
  required = false,
  isError = false,
  errorMessage = "Invalid file",
  defaultFileName = null, // Set default file name or URL here
}) => {
  const [fileName, setFileName] = useState<string | null>(defaultFileName);

  useEffect(() => {
    // Update file name if defaultFileName prop changes
    setFileName(defaultFileName);
  }, [defaultFileName]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFileName(e.target.files[0].name);
    } else {
      setFileName(null);
    }
    onChange(e);
  };

  return (
    <div className={`${styles.customFileInput} ${className}`} style={style}>
      {label && (
        <label htmlFor={name} className={styles.label}>
          {label}
        </label>
      )}
      <div className={styles.inputWrapper}>
        {/* <label
          htmlFor={name}
          className={`${styles.input} ${isError ? styles.errorInput : ""}`}
        >
          {fileName ? (
            <span className={styles.fileName}>
              {fileName.startsWith("http") ? (
                <a href={fileName} target="_blank" rel="noopener noreferrer">
                  {fileName}
                </a>
              ) : (
                truncateText(fileName, 26)
              )}
            </span>
          ) : (
            <span className={styles.chooseFileText}>Buyerga bosing</span>
          )}
        </label> */}
        <input
          type="file"
          onChange={handleFileChange}
          name={name}
          id={name}
          // style={{ display: "none" }}
          className={`${styles.input} ${isError ? styles.errorInput : ""}`}
          disabled={disabled}
          required={required}
          placeholder="Fayl yuklang"
        />
      </div>
      {isError && <span className={styles.errorMessage}>{errorMessage}</span>}
    </div>
  );
};

export default CustomFileInput;
