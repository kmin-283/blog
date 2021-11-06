import React, { useState, useEffect, ChangeEvent, KeyboardEvent } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import Head from "next/head";
import styles from "./write.module.css";
import { NextPageContext } from "next";
import { getSession } from "next-auth/client";
import { Session } from "next-auth";
import Login from "../../../components/login/login";
import { AiOutlineSave, AiOutlineUpload } from "react-icons/ai";
import Toolbar from "../../../components/toolbar/toolbar";
import Tags from "../../../components/tags/tags";
import { markedString } from "../../../utils/markdown";

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
    const getPost = async () => {
      const response = await fetch(`/api/write/${_id}`);
      if (response.ok) {
        return await response.json();
      }
    };
    if (_id) {
      getPost().then(({ data: { title, tags, description, markdown } }) => {
        setTitle(title);
        setPrevTitle(title);
        setTags(tags);
        setDescription(description);
        setMarkdown(markdown);
      });
    }
  }, [_id]);

  const handleTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value.slice(0, 65));
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
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({ title, tags, description, markdown }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await router.push("/_blog-admin");
    } else {
      const data = response.json();
      // logger가 에러가 발생한 로그를 수집할 수 있도록 하자
      // 에러가 발생했다면 data에 에러 메시지가 담겨있을거임
      console.error(data);
    }
    setLoading(false);
  };

  const modifyPost = async () => {
    setLoading(true);
    const response = await fetch(`/api/write/${_id}`, {
      method: "PUT",
      body: JSON.stringify({ prevTitle, title, tags, description, markdown }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      await router.push("/_blog-admin");
    } else {
      const data = response.json();
      // logger가 에러가 발생한 로그를 수집할 수 있도록 하자
      // 에러가 발생했다면 data에 에러 메시지가 담겨있을거임
      console.error(data);
    }
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
    const files = event.target.files;
    if (files && files.length > 0) {
      const formData = new FormData();
      formData.append("file", files[0], files[0].name);
      const response = await fetch("/api/images", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        const {
          uploadData: { Location },
        } = data;
        setMarkdown((prevState) => prevState + `![](${Location})`);
      } else {
        {
          /*TODO log를 남길 수 있게 추가하기*/
        }
        console.log(data);
      }
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
            <Tags tags={tags} howMany={5} deleteTag={deleteTag} />
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
          <h2 className={styles.previewTitle}>
            {title ? title : "제목을 입력해주십시오"}
          </h2>
          <Tags tags={tags} howMany={5} />
          <strong>{description}</strong>
          <main
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: markedString(markdown) }}
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
