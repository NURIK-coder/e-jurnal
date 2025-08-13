import React, { useState, useRef, useEffect } from "react";
import styles from "./custom-menu.module.scss";
import CustomButton from "../custom-button/custom-button";
import MoreVertIcon from "@mui/icons-material/MoreVert";
interface CustomMenuProps {
  menuItems: any[];
  onSelect: (item: any) => void;
}

const CustomMenu: React.FC<CustomMenuProps> = ({ menuItems, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setIsOpen(false);
    }
  };

  const handleItemClick = (item: string) => {
    onSelect(item);
    setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.menuContainer} ref={menuRef}>
      <CustomButton className={styles.menuButton} onClick={toggleMenu}>
        <MoreVertIcon />
      </CustomButton>
      {isOpen && (
        <div className={styles.menuList}>
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={styles.menuItem}
              onClick={() => handleItemClick(item.action)}
            >
              {item.component}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomMenu;
