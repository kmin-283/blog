import React, {FC} from 'react';
import {markedString} from "@/utils/markdown";
import styles from './ContentHeader.module.css';

interface ContentHeaderProps {
  internalLinks: string[];
}

const ContentHeader: FC<ContentHeaderProps> = ({internalLinks}) => {
  return (
    <section className={styles.container}>
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
    </section>
  );
};

export default ContentHeader;