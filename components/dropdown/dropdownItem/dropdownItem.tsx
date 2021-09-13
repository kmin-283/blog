import React, { ReactChild } from "react";
import styles from "./dropdownItem.module.css";

interface DropdownItemProps {
  onClick: () => void;
  role: string;
  icon: ReactChild;
}

const DropdownItem = ({ onClick, role, icon }: DropdownItemProps) => {
  return (
    <button className={styles.dropdownBtn} onClick={onClick}>
      <div className={styles.icon}>{icon}</div>
      <div className={styles.role}>{role}</div>
    </button>
  );
};

export default DropdownItem;
