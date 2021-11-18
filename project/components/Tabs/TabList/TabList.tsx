import React, {FC} from 'react';
import styles from './TabList.module.css';

const TabList: FC = ({children}) =>  {
  return (
    <ul className={styles.tabList} role="tablist" aria-label="Entertainment">
      {children}
    </ul>
  );
};

export default TabList;