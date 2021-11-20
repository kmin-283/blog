import React, {FC, useRef} from "react";
import styles from "./Tags.module.css";
import {generateRandomColors, getContrastYIQs} from "@/utils/color";

interface TagsProps {
  tags: string[];
  howMany: number;
  onClickHandler?: (index: number) => void;
}

const Tags: FC<TagsProps> = ({ tags, howMany, onClickHandler} ) => {
  const handleOnClick = (index: number) => () => {
    if (onClickHandler) {
      onClickHandler(index);
    }
  };
  const randomColors = useRef<string[]>(generateRandomColors(howMany));
  const textColors = useRef<string[]>(getContrastYIQs(randomColors.current));
  
  return (
    <ul className={styles.tags}>
      {tags.slice(0, howMany).map((tag, index) => (
        <li
          className={`${styles.tag} ${onClickHandler ? styles.shrink : ''}`}
          key={`${tag}-${index}`}
          style={{backgroundColor: randomColors.current[index], color: textColors.current[index]}}
          onClick={handleOnClick(index)}
        >
          <p>{tag}</p>
        </li>
      ))}
    </ul>
  );
};

export default Tags;
