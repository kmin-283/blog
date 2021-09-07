import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IPost } from "../../models/post";
import { BsTrash, BsThreeDots } from "react-icons/bs";
import { RiEdit2Fill } from "react-icons/ri";
import styles from "./posts.module.css";

const PostsComp = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
      });
      if (response.ok) {
        const { data } = await response.json();
        setPosts(data as IPost[]);
      }
    };
    getPosts();
  }, []);

  const deletePost = (_id: string, title: string) => async () => {
    const response = await fetch("/api/posts", {
      method: "DELETE",
      body: JSON.stringify({
        _id,
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
  const modifyPost = (_id: string) => async () => {};

  return (
    <>
      <Link href={"/_blog-admin/write"}>
        <a>게시글 작성</a>
      </Link>
      <ul className={styles.postContainer}>
        {posts.map((post) => {
          return (
            <li className={styles.post} key={post._id} data-mainentity="">
              <h6>{post._id}</h6>
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
    </>
  );
};

export default PostsComp;
