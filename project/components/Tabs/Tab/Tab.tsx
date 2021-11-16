import React, {FC} from 'react';
import styles from "./Tab.module.css";

export interface TabProps {
  tabId: string;
  active: boolean;
}

const Tab: FC<TabProps> = ({active, tabId, children}) => {
  return (
    <li className={`${styles.tab} ${active ? styles.active : ""}`} role="tab" aria-selected={active} aria-controls={tabId}>
      {children}
    </li>
  );
};

export default Tab;