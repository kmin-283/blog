import React, {FC} from 'react';

interface TabPanelProps {
  isHidden: boolean;
  tabId: string;
}

const TabPanel: FC = ({ children, ...props}) => {
  const { isHidden, tabId } = props as TabPanelProps;
  return (
    <div role="tabpanel" aria-labelledby={tabId} hidden={isHidden}>
      {children}
    </div>
  );
};

export default TabPanel;