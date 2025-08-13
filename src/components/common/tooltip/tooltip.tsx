import React, { useState } from "react";
import styles from "./ooltip.module.scss";

interface TooltipProps {
  title: string;
  children: React.ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ title, children }) => {
  const [visible, setVisible] = useState(false);

  const showTooltip = () => setVisible(true);
  const hideTooltip = () => setVisible(false);

  return (
    <div
      className={styles.tooltipContainer}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      {visible && <div className={styles.tooltip}>{title}</div>}
    </div>
  );
};

export default Tooltip;
