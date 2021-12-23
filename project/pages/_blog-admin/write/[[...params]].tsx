import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "./write.module.css";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import Login from "@/components/Login/Login";
import { AiOutlineSave, AiOutlineUpload } from "react-icons/ai";
import Toolbar from "@/components/Toolbar/Toolbar";
import Tags from "@/components/Tags/Tags";
import { markedString } from "@/utils/markdown";
import DataFetcher from "@/libs/DataFetcher";

const dataFetcher = new DataFetcher();

const Write = ({ session }: { session: Session }) => {
  const router = useRouter();
  const { _id } = router.query;
  const [loading, setLoading] = useState<boolean>(false);
  const [prevTitle, setPrevTitle] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [markdown, setMarkdown] = useState<string>("");

  useEffect(() => {
    const getPost = async () => dataFetcher.getPost(`/api/write/${_id}`);
    if (_id) {
      getPost().then(({ title, tags, description, markdown }) => {
        setTitle(title);
        setPrevTitle(title);
        setTags(tags);
        setDescription(description);
        setMarkdown(markdown);
      });
    }
  }, [_id]);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.slice(0, 32));
  };

  const handleTags = (event: KeyboardEvent & ChangeEvent<HTMLInputElement>) => {
    // TODO tag validation check
    // TODO 비어있거나 중복이 있어선 안됨
    if (event.key === "Enter" && tags.length < 5) {
      const nextValue = event.target.value;
      setTags((prevState) => [...prevState, nextValue]);
      event.target.value = "";
    }
  };

  const handleDescription = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(event.target.value);
  };

  const handleMarkdown = (event: ChangeEvent<HTMLTextAreaElement>) => {
    setMarkdown(event.target.value);
  };

  const writePost = async () => {
    setLoading(true);
    const res = await dataFetcher.writePost({
      url: "/api/write",
      title,
      tags,
      description,
      markdown,
    });
    if (res.success) {
      await router.push("/_blog-admin");
    }
    // TODO 실패 로그 남기기
    setLoading(false);
  };

  const modifyPost = async () => {
    setLoading(true);
    const res = await dataFetcher.updatePost({
      url: `/api/write/${_id}`,
      prevTitle,
      title,
      tags,
      description,
      markdown,
    });
    if (res.success) {
      await router.push("/_blog-admin");
    }
    // TODO 실패 로그 남기기
    setLoading(false);
  };

  const draftPost = async () => {};

  const deleteTag = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const uploadImage = async (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const res = await dataFetcher.uploadImage(
      "/api/images",
      event.target.files
    );
    if (res.success) {
      setMarkdown((prevState) => prevState + `![](${res.data})`);
    } else if (!res.success && res.data === "") {
      // TODO log남기기
      console.error("뭔가 오류가 발생했습니다");
    }
  };

  if (!session) {
    return <Login />;
  }

  if (loading) {
    // TODO 로딩 중에 보여질 화면 구성하기
    return <h1>loadinnnng...</h1>;
  }

  return (
    <>
      <Head>
        <title>write</title>
        <meta name="robots" content="noindex" />
      </Head>
      <main className={styles.wrapper}>
        <section className={styles.editor}>
          <input
            type="text"
            className={styles.title}
            value={title}
            placeholder="제목을 입력하세요"
            spellCheck={false}
            onChange={handleTitle}
          />
          <input
            type="text"
            className={styles.tagInput}
            placeholder="태그를 입력하세요"
            spellCheck={false}
            onKeyDown={handleTags}
          />
          <section>
            <Tags tags={tags} howMany={5} onClickHandler={deleteTag} />
            {/* TODO 태그가 삭제됩니다 요거 화면 차지 안하도록 변경하기 */}
            <span className={styles.description}>
              태그를 누르면 해당 태그가 삭제됩니다
            </span>
          </section>
          <Toolbar uploadImage={uploadImage} />
          <textarea
            className={styles.description}
            value={description}
            placeholder="이번 포스트의 핵심 문장을 입력하세요"
            onChange={handleDescription}
          />
          <textarea
            className={styles.mainText}
            value={markdown}
            spellCheck={false}
            placeholder="본문을 작성하세요..."
            onChange={handleMarkdown}
          />
          <section className={styles.actions}>
            <Link aria-label="leave the write page" href="/_blog-admin">
              <a>나가기</a>
            </Link>
            <div className={styles.saveAction}>
              <button className={styles.draft} onClick={draftPost}>
                <AiOutlineSave />
                <span>임시저장</span>
              </button>
              {_id && (
                <button className={styles.save} onClick={modifyPost}>
                  <AiOutlineSave />
                  <span>수정</span>
                </button>
              )}
              {!_id && (
                <button className={styles.save} onClick={writePost}>
                  <AiOutlineUpload />
                  <span>출간</span>
                </button>
              )}
            </div>
          </section>
        </section>
        <section className={styles.preview}>
          <h1 className={styles.previewTitle}>
            {title ? title : "제목을 입력해주십시오"}
          </h1>
          <Tags tags={tags} howMany={5} />
          <strong>{description}</strong>
          <main
            className={styles.content}
            dangerouslySetInnerHTML={{
              __html: markedString("wrtie", markdown),
            }}
          />
        </section>
      </main>
    </>
  );
};
export default Write;

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
