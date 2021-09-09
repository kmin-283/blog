import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IPost } from "../../models/post";
import { BsTrash, BsThreeDots } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import styles from "./posts.module.css";
import { useRouter } from "next/router";

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
              return (
                <li className={styles.post} key={post._id} data-mainentity="">
                  <div className={styles.metaData}>
                    <div className={styles.mainEntity}>
                      {/*TODO img를 next/image로 변경하기 */}
                      <img
                        src="https://source.unsplash.com/random/100x100"
                        alt="randomImage"
                      />
                      <h2 data-name="">{post.title}</h2>
                    </div>
                    {post.updatedAt}
                  </div>
                  {/*TODO button들을 dropdown메뉴로 변경하기 */}
                  {/*<button>*/}
                  {/*  <BsThreeDots fontSize="1.2rem" />*/}
                  {/*</button>*/}
                  <button onClick={deletePost(post._id, post.title)}>
                    <BsTrash fontSize="1.2rem" />
                    삭제하기
                  </button>
                  <button onClick={modifyPost(post._id)}>
                    <RiEdit2Fill fontSize="1.2rem" />
                    수정하기
                  </button>
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
