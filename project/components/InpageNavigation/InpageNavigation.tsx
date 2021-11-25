import React, {FC, useEffect, useState} from 'react';
import Link from 'next/link';
import {heading} from "@/utils/markdown";
import styles from './InpageNavigation.module.css';

interface ContentHeaderProps {
  internalLinks: string;
}

const InpageNavigation: FC<ContentHeaderProps> = ({internalLinks}) => {
  const headings: heading[] = JSON.parse(internalLinks);
  const makeHierarchicalHeading = (heading: heading, key: number) => {
    if (heading.child.length > 0) {
      return (
        <li key={`${heading.headingLevel}+-${key}`}>
          <Link href={`#${heading.value.replace(/\s/g,'-')}`}>
            {heading.value}
          </Link>
          <ol className={styles.links} key={`hierarchy#${key}${key}`}>
            {heading.child.map((h, index) => makeHierarchicalHeading(h, index))}
          </ol>
        </li>
      );
    }
    return (
      <li key={`${heading.headingLevel}+-${key}`}>
        <Link href={`#${heading.value.replace(/\s/g,'-')}`}>
          {heading.value}
        </Link>
      </li>);
  };
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
        <ol className={styles.links}>
          {headings.map((heading, index) => makeHierarchicalHeading(heading, index))}
        </ol>
      </nav>
    </section>
  );
};

export default InpageNavigation;