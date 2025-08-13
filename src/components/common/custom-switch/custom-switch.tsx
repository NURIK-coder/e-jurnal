// CustomSwitch.tsx
import React, { useState } from "react";
import styles from "./custom-switch.module.scss";

interface CustomSwitchProps {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
}

const CustomSwitch: React.FC<CustomSwitchProps> = ({
  checked = false,
  onChange,
  disabled = false,
}) => {
  const [isChecked, setIsChecked] = useState(checked);

  const handleToggle = () => {
    if (disabled) return;
    const newChecked = !isChecked;
    setIsChecked(newChecked);
    onChange?.(newChecked);
  };

  return (
    <label className={`${styles.switch} ${disabled ? styles.disabled : ""}`}>
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleToggle}
        className={styles.switchInput}
        disabled={disabled}
      />
      <span className={styles.switchSlider} />
    </label>
  );
};

export default CustomSwitch;
