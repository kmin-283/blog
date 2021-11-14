import React, {FC} from 'react';
import styles from "@/components/Tabs/TabItem/TabItem.module.css";

interface TabProps {
  tabId: string;
  active: boolean;
}

const Tab: FC<TabProps> = ({active, tabId, children}) => {
  return (
    <li className={active ? styles.active : ""} role="tab" aria-selected={active} aria-controls={tabId}>
      {children}
    </li>
  );
};

export default Tab;