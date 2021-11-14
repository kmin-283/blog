import React, {FC} from "react";
import styles from "./TabItem.module.css";

interface TabItemProps {
  active: boolean;
  onClick: () => void;
}

const TabItem: FC<TabItemProps> = ({active, onClick, children }) => {
  return (
    <li
      className={`${styles.tabItem} ${active ? styles.active : ""}`}
      onClick={onClick}
    >
      {children}
    </li>
  );
};

export default TabItem;
