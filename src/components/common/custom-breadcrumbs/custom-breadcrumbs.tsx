import * as React from "react";
import Breadcrumbs from "@mui/material/Breadcrumbs";
import styles from "./custom-breadcrumbs.module.scss";
import { useNavigate } from "react-router-dom";

const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
  event.preventDefault();
  console.info("You clicked a breadcrumb.");
};

const CustomBreadcrumbs: React.FC<{
  list: { value: string; label: string }[];
  active: string;
}> = ({ list, active }) => {
  const navigate = useNavigate();
  return (
    <div role="presentation" onClick={handleClick}>
      <Breadcrumbs
        style={{ marginBottom: "10px", alignItems: "center" }}
        aria-label="breadcrumb"
      >
        {list.map((link) => (
          <p
            key={link.value}
            className={`${styles.breadcrumb} ${
              link.value === active && styles.active_crumb
            }`}
            onClick={() => navigate(link.value)}
          >
            {link.label}
          </p>
        ))}
      </Breadcrumbs>
    </div>
  );
};

export default CustomBreadcrumbs;
