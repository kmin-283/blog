import React, { ReactChild, FC } from "react";
import styles from "./DropdownItem.module.css";

interface DropdownItemProps {
  onClick: () => void;
  icon: ReactChild;
}

const DropdownItem: FC<DropdownItemProps> = ({ children, onClick, icon }) => {
  return (
    <button className={styles.dropdownBtn} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.role}>{children}</div>
    </button>
  );
};

export default DropdownItem;
