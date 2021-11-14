import React, {FC} from 'react';

interface TabPanelProps {
  labelledBy: string;
}

const TabPanel: FC<TabPanelProps> = ({labelledBy, children}) => {
  return (
    <div role="tabpanel" aria-labelledby={labelledBy} hidden>
      {children}
    </div>
  );
};

export default TabPanel;