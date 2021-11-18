import React, {FC} from 'react';
import styles from './TabPanel.module.css';

interface TabPanelProps {
  isHidden: boolean;
  tabId: string;
}

const TabPanel: FC = ({ children, ...props}) => {
  const { isHidden, tabId } = props as TabPanelProps;
  return (
    <div className={styles.tabPanel} role="tabpanel" aria-labelledby={tabId} hidden={isHidden}>
      {children}
    </div>
  );
};

export default TabPanel;