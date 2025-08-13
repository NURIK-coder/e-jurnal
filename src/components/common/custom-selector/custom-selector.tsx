import React, { useState, useEffect, useRef } from "react";
import styles from "./custom-selector.module.scss";

interface Option {
  value: string;
  label: string;
}

interface CustomSelectorProps {
  options: Option[];
  loadMoreOptions?: (page: number, name: string) => void;
  searchOption?: (name: any) => void;
  name?: string;
  placeholder?: string;
  value?: any[] | any; // Change to an array for multiple values
  onChange: (value: any[] | any) => void; // Change to an array for multiple values
  disabled?: boolean;
  required?: boolean;
  isError?: boolean;
  errorMessage?: string;
  multiple?: boolean; // New prop to handle single or multiple selection
}

const CustomSelector: React.FC<CustomSelectorProps> = ({
  options,
  loadMoreOptions,
  placeholder,
  searchOption,
  value = [],
  name,
  onChange,
  disabled = false,
  required = false,
  isError = false,
  errorMessage = "Invalid input",
  multiple = false, // Default to false for single selection
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState<string | null>(null);
  const [searchFinalValue, setSearchFinalValue] = useState<string | null>(null);
  const selectorRef = useRef<HTMLDivElement | null>(null);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    console.log(scrollHeight - scrollTop, clientHeight, "scrolling");
    if (scrollHeight - scrollTop === clientHeight) {
      loadMoreOptions &&
        loadMoreOptions(currentPage + 1, searchFinalValue as string);
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handleOptionClick = (optionValue: string) => {
    if (multiple) {
      const newValue = value?.includes(optionValue)
        ? (value as string[]).filter((val) => val !== optionValue)
        : [...value, optionValue];
      onChange(newValue);
    } else {
      onChange(value === optionValue ? "" : optionValue);
      setIsOpen(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    if (searchTerm || searchTerm === "") {
      const delay = 500; // Adjust the delay as needed (e.g., 500 milliseconds)
      const timeoutId = setTimeout(() => {
        setSearchFinalValue(searchTerm);
      }, delay);

      return () => {
        clearTimeout(timeoutId);
      };
    }
  }, [searchTerm]);

  useEffect(() => {
    if (searchFinalValue || searchFinalValue === "") {
      searchOption?.(searchFinalValue);
    }
  }, [searchFinalValue]);

  // Add event listener for clicks outside the component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectorRef.current &&
        !selectorRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.customSelector} ref={selectorRef}>
      <input
        type="text"
        placeholder={placeholder}
        value={
          multiple
            ? (
                value?.map(
                  (value: any) =>
                    options?.find((opt) => opt.value === value)?.label
                ) as string[]
              )?.join(", ")
            : options?.find((opt) => opt?.value === value)?.label || ""
        } // Display selected values for multiple selection
        onClick={() => !disabled && setIsOpen(!isOpen)}
        readOnly
        name={name}
        disabled={disabled}
        required={required}
        className={`${styles.input} ${isError ? styles.error : ""}`}
      />
      {isError && <span className={styles.errorMessage}>{errorMessage}</span>}
      {isOpen && !disabled && (
        <div className={styles.dropdownContainer}>
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm as string}
            onChange={handleSearch}
            className={styles.searchInput}
          />
          <div className={styles.optionsContainer} onScroll={handleScroll}>
            {options?.map((option) => (
              <div
                key={option.value}
                className={`${styles.option} ${
                  (
                    multiple
                      ? value?.includes(option.value)
                      : value === option?.value
                  )
                    ? styles.selected
                    : ""
                }`}
                onClick={() => handleOptionClick(option.value)}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomSelector;
