import React, {Dispatch, FC, SetStateAction} from "react";
import styles from "./Tabs.module.css";
import {TabType} from "@/components/Posts/Posts";
import TabItem from "@/components/Tabs/TabItem/TabItem";

interface TabsProps {
  // tab: TabType;
  // onClick: Dispatch<SetStateAction<TabType>>;
}

const Tabs: FC = ({children}) => {
  return (
    <section className={styles.postTypeFilter}>
      <ul className={styles.sectionNavigationList}>
        {children}
      </ul>
    </section>
  );
};

export default Tabs;
