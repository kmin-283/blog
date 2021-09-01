import React, { useState, ChangeEvent, KeyboardEvent } from "react";
import Link from "next/link";
import styles from "./write.module.css";
import marked from "marked";

const Write = () => {
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [markdown, setMarkdown] = useState<string>("");

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleTags = (event: KeyboardEvent & ChangeEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      const nextValue = event.target.value;
      setTags((prevState) => [...prevState, nextValue]);
      event.target.value = "";
    }
  };

  const handleMarkdown = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  return (
    <main className={styles.wrapper}>
      <section className={styles.editor}>
        <input placeholder="제목을 입력하세요" onChange={handleTitle} />
        <input placeholder="태그를 입력하세요" onKeyUp={handleTags} />
        <section>
          <ol className={styles.tags}>
            {tags.map((tag, index) => (
              <li className={styles.tagItem} key={index}>
                {tag}
              </li>
            ))}
          </ol>
        </section>
        <textarea value={markdown} onChange={handleMarkdown} />
        <section className={styles.control}>
          <Link aria-label="leave the write page" href="/_blog-admin">
            <a>나가기</a>
          </Link>
          <button>임시저장</button>
          <button>출간</button>
        </section>
      </section>
      <section className={styles.preview}>
        <h2>{title ? title : "제목을 입력해주십시오"}</h2>
        <section dangerouslySetInnerHTML={{ __html: marked(markdown) }} />
      </section>
    </main>
  );
};

export default Write;
