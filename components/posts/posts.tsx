import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IPost } from "../../models/post";
import { BsTrash } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import styles from "./posts.module.css";
import { useRouter } from "next/router";
import { convertToKRDate } from "../../utils/time";
import Dropdown from "@/components/dropdown/dropdownMenu/dropdown";
import DropdownItem from "@/components/dropdown/dropdownItem/dropdownItem";
import Tabs from "@/components/tabs/tabMenu/tabs";

export type TabType = "publish" | "draft";

const PostSection = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [tab, setTab] = useState<TabType>("publish");
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
        <Tabs tab={tab} onClick={setTab} />
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
                      <div>
                        <h2 className={styles.title}>{post.title}</h2>
                        <ul className={styles.tagList}>
                          {post.tags.slice(0, 5).map((tag) => (
                            <li key={`${post._id}-${tag}`}>{tag}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                    <time className={styles.time} dateTime={time}>
                      <AiOutlineClockCircle />
                      <span>{time}</span>
                    </time>
                  </section>
                  <Dropdown>
                    <DropdownItem
                      onClick={deletePost(post._id, post.title)}
                      role={"삭제하기"}
                      icon={<BsTrash size="1.2rem" />}
                    />
                    <DropdownItem
                      onClick={modifyPost(post._id)}
                      role={"수정하기"}
                      icon={<RiEdit2Fill size="1.2rem" />}
                    />
                  </Dropdown>
                </li>
              );
            })}
          </ul>
        </section>
      </section>
    </div>
  );
};

export default PostSection;
