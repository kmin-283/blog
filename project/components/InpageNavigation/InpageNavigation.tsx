import React, {FC} from 'react';
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

  return (
    <nav className={styles.container}>
      <ol className={styles.links}>
        {headings.map((heading, index) => makeHierarchicalHeading(heading, index))}
      </ol>
    </nav>
  );
};

export default InpageNavigation;