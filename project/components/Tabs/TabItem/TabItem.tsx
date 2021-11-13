import React from "react";
import styles from "./TabItem.module.css";

interface TabItemProps {
  active: boolean;
  role: string;
  onClick: () => void;
}

const TabItem = ({ active, role, onClick }: TabItemProps) => {
  return (
    <li
      className={`${styles.tabItem} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      <span>{role}</span>
    </li>
  );
};

export default TabItem;
