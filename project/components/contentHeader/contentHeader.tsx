import React, {FC} from 'react';
import {markedString} from "../../utils/markdown";

interface ContentHeaderProps {
  internalLinks: string[];
}

const ContentHeader: FC<ContentHeaderProps> = ({internalLinks}) => {
  return (
    <section>
      <ol>
        {internalLinks.map((internalLink) =>
          (internalLink && <li
            key={internalLink}
            dangerouslySetInnerHTML={{
              __html: markedString(`[${internalLink
                .replace(/-/g, ' ')}](#${internalLink})`)
            }}>
          </li>))}
      </ol>
    </section>
  );
};

export default ContentHeader;