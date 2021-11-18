import React, { FC } from "react";
import styles from "./Tags.module.css";

interface TagsProps {
  tags: string[];
  howMany: number;
  deleteTag?: (index: number) => void;
}

const Tags: FC<TagsProps> = ({ tags, howMany, deleteTag }) => {
  const handleOnClick = (index: number) => () => {
    if (deleteTag) {
      deleteTag(index);
    }
  };
  return (
    <ul className={styles.tags}>
      {tags.slice(0, howMany).map((tag, index) => (
        <li
          className={styles.tag}
          key={`${tag}-${index}`}
          onClick={handleOnClick(index)}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default Tags;
