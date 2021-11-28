import React, {FC} from 'react';
import {heading} from '@/utils/markdown';
import Link from 'next/link';
import styles from './HierarchicalList.module.css';

export interface HierarchicalListProps {
  role?: string;
  labelledBy?: string;
  internalLinks: string;
}
const HierarchicalList: FC<HierarchicalListProps> = ({role, labelledBy, internalLinks}) => {
  const headings: heading[] = JSON.parse(internalLinks);
  const makeHierarchicalHeading = (heading: heading, key: number) => {
    if (heading.child.length > 0) {
      return (
        <li key={`${heading.headingLevel}+-${key}`} role={role ? 'menuitem' : undefined}>
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
      <li key={`${heading.headingLevel}+-${key}`} role={role ? 'menuitem' : undefined}>
        <Link href={`#${heading.value.replace(/\s/g,'-')}`}>
          {heading.value}
        </Link>
      </li>);
  };
  
  return (
    <ol role={role} id={labelledBy} className={styles.links}>
      {headings.map((heading, index) => makeHierarchicalHeading(heading, index))}
    </ol>
  );
};

export default HierarchicalList;