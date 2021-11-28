import React, {FC, useEffect, useState} from 'react';
import styles from './InpageNavigation.module.css';
import HierarchicalList from '@/components/HierarchicalList/HierarchicalList';

export interface InpageNavigationProps {
  internalLinks: string;
}

const InpageNavigation: FC<InpageNavigationProps> = ({internalLinks}) => {
  const [isFixed, setIsFixed] = useState<boolean>(false);
  
  useEffect(() => {
    const onScroll = () => {
      const wrapper = document.querySelector(`.${styles.wrapper}`)!;
      const nav = document.querySelector(`.${styles.container}`)!;
      
      if (!isFixed && nav.getBoundingClientRect().top < 0 && !nav.classList.contains(`${styles.fixed}`)) {
        setIsFixed(true);
      }
      if (isFixed && wrapper.getBoundingClientRect().top > 0 && nav.classList.contains(`${styles.fixed}`)) {
        setIsFixed(false);
      }
    };
    
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isFixed]);
  
  return (
    <section className={styles.wrapper}>
      <nav className={`${styles.container} ${isFixed ? styles.fixed : ''}`}>
        <HierarchicalList internalLinks={internalLinks}/>
      </nav>
    </section>
  );
};

export default InpageNavigation;