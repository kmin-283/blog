import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IPost } from "../../models/post";
import { BsTrash, BsThreeDots } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import styles from "./posts.module.css";
import { useRouter } from "next/router";
import { convertToKRDate } from "../../utils/time";

const PostsComp = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
      });
      if (response.ok) {
        return await response.json();
      }
    };
    getPosts().then(({ data }) => setPosts(data as IPost[]));
  }, []);

  const deletePost = (_id: string, title: string) => async () => {
    const response = await fetch(`/api/posts/${_id}`, {
      method: "DELETE",
      body: JSON.stringify({
        title,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.ok) {
      const { data } = await response.json();
      setPosts(data as IPost[]);
    }
  };

  const modifyPost = (_id: string) => async () => {
    await router.push({
      pathname: "/_blog-admin/write",
      query: {
        _id,
      },
    });
  };

  return (
    <div className={styles.base}>
      <section className={styles.contentContainer}>
        <header>
          <h1>글</h1>
          <p>블로그에 글을 발행하거나 관리합니다.</p>
        </header>
        <section className={styles.postTypeFilter}>
          <ul className={styles.sectionNavigationList}>
            {/* TODO 임시저장 포스트와 실제 게제된 포스트 구분해서 보여주기*/}
            <li>발행된 글 보기</li>
            <li>임시 저장 글 보기</li>
          </ul>
        </section>
        <section className={styles.postSection}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionHeaderLabel}>
              <span>글</span>
            </div>
            <div className={styles.sectionHeaderAction}>
              <Link href={"/_blog-admin/write"}>
                <a>게시글 작성</a>
              </Link>
            </div>
          </div>
          <ul className={styles.postList}>
            {posts.map((post) => {
              const time = convertToKRDate(post.updatedAt.toString());
              return (
                <li className={styles.post} key={post._id}>
                  {/* TODO Link 태그로 감싸서 해당포스트의 새로운 창을 띄워주기 */}
                  <section className={styles.detail}>
                    <div className={styles.info}>
                      {/*TODO img를 next/image로 변경하기 */}
                      <img
                        className={styles.thumbnail}
                        src="https://source.unsplash.com/random/100x100"
                        alt="randomImage"
                      />
                      <h2 className={styles.title}>{post.title}</h2>
                    </div>
                    <time className={styles.time} dateTime={time}>
                      <AiOutlineClockCircle />
                      <span>{time}</span>
                    </time>
                  </section>
                  {/*TODO button들을 dropdown메뉴로 변경하기 */}
                  {/*<button>*/}
                  {/*  <BsThreeDots fontSize="1.2rem" />*/}
                  {/*</button>*/}
                  <section className={styles.menu}>
                    <button onClick={deletePost(post._id, post.title)}>
                      <BsTrash fontSize="1.2rem" />
                      삭제하기
                    </button>
                    <button onClick={modifyPost(post._id)}>
                      <RiEdit2Fill fontSize="1.2rem" />
                      수정하기
                    </button>
                  </section>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </div>
  );
};

export default PostsComp;
