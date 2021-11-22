import React, {FC} from 'react';
import {markedString} from "@/utils/markdown";
import styles from './InpageNavigation.module.css';

interface ContentHeaderProps {
  internalLinks: string[];
}

const InpageNavigation: FC<ContentHeaderProps> = ({internalLinks}) => {
  return (
    <nav className={styles.container}>
      <ol className={styles.links}>
        {internalLinks.map((internalLink, index) =>
          (internalLink &&
            <li
              className={styles.link}
              key={internalLink}
              dangerouslySetInnerHTML={{
                __html: markedString(`[${index + 1}. ${internalLink
                  .replace(/-/g, ' ')}](#${internalLink})`)
              }}>
            </li>))}
      </ol>
    </nav>
  );
};

export default InpageNavigation;