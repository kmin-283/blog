import React, {FC} from "react";
import styles from "./Tabs.module.css";

const Tabs: FC = ({children}) => {
  return (
    <div className={styles.tabs}>
      {children}
    </div>
  );
};

export default Tabs;
