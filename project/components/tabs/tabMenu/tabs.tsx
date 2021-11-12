import React, {Dispatch, SetStateAction} from "react";
import styles from "./tabs.module.css";
import {TabType} from "@/components/posts/posts";
import TabItem from "@/components/tabs/tabItem/tabItem";

interface TabsProps {
  tab: TabType;
  onClick: Dispatch<SetStateAction<TabType>>;
}

const Tabs = ({tab, onClick}: TabsProps) => {
  return (
    <section className={styles.postTypeFilter}>
      <ul className={styles.sectionNavigationList}>
        {/* TODO 임시저장 포스트와 실제 게제된 포스트 구분해서 보여주기*/}
        <TabItem
          active={tab === "publish"}
          role={"게시된 글"}
          onClick={() => onClick("publish")}
        />
        <TabItem
          active={tab === "draft"}
          role={"임시 저장 글"}
          onClick={() => onClick("draft")}
        />
      </ul>
    </section>
  );
};

export default Tabs;
