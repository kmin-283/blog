import React, {FC} from 'react';

interface TabPanelProps {
  isHidden: boolean;
  tabId: string;
}

const TabPanel: FC<TabPanelProps> = ({isHidden, tabId, children}) => {
  return (
    <div role="tabpanel" aria-labelledby={tabId} hidden={isHidden}>
      {children}
    </div>
  );
};

export default TabPanel;