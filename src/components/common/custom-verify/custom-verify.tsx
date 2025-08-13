import React, { FC, useRef, useEffect } from "react";
import styles from "./custom-verify.module.scss";

interface CustomVerifyProps {
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
}

const CustomVerify: FC<CustomVerifyProps> = ({
  message,
  onConfirm,
  onCancel,
}) => {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click is outside the modal
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        onCancel(); // Close the modal if clicked outside
      }
    };

    // Add event listener to detect clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      // Cleanup the event listener on component unmount
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onCancel]);

  return (
    <div className={styles.verifyOverlay}>
      <div className={styles.verifyBox} ref={modalRef}>
        <p>{message}</p>
        <div className={styles.buttonGroup}>
          <button onClick={onConfirm} className={styles.confirmButton}>
            Confirm
          </button>
          <button onClick={onCancel} className={styles.cancelButton}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomVerify;
