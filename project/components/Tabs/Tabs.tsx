import React, {FC, useState} from "react";
import styles from "./Tabs.module.css";
import TabList from "@/components/Tabs/TabList/TabList";
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";

interface TabsProps {
  tabIds: string[];
}

const Tabs: FC<TabsProps> = ({children, tabIds}) => {
  const [tabId, setTabId] = useState<string>(tabIds[0]);
  const clickTab = (id: string) => () => {
    setTabId(id);
  };
  let tabIndex = 0;
  const childrenWithProps = React.Children.map(children, (child)=>{
    if (Object.getOwnPropertyDescriptor(child,'type')?.value.name === TabList.name && React.isValidElement(child)) {
      const tabs = React.Children.map(child.props.children, (grandChild) => {
        return React.cloneElement(grandChild, {
          active: tabId === tabIds[tabIndex],
          tabId: tabIds[tabIndex++],
          onClick: clickTab});
      });
      return React.cloneElement(child, {}, tabs);
    }

    if (Object.getOwnPropertyDescriptor(child,'type')?.value.name === TabPanel.name && React.isValidElement(child)) {
      if (tabIndex === tabIds.length) {
        tabIndex = 0;
      }
      return React.cloneElement(child, {
        isHidden: tabId !== tabIds[tabIndex],
        tabId: tabIds[tabIndex++],
      });
    }
    return child;
  });
  
  return (
    <div className={styles.tabs}>
      {childrenWithProps}
    </div>
  );
};

export default Tabs;
