import React, {FC} from 'react';
import styles from "./Tab.module.css";

export interface TabProps {
  tabId: string;
  active: boolean;
  onClick: (tabId: string) => React.MouseEventHandler<HTMLLIElement>;
}

const Tab: FC = ({children, ...props}) => {
  const { active, tabId, onClick } = props as TabProps;

  return (
    <li
      className={`${styles.tab} ${active ? styles.active : ""}`}
      role="tab"
      aria-selected={active}
      aria-controls={`${tabId}-tab`}
      onClick={onClick(tabId)}
    >
      {children}
    </li>
  );
};

export default Tab;