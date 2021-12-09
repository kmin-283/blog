import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IPost } from "@/models/post";
import { BsTrash } from "react-icons/bs";
import { AiOutlineClockCircle } from "react-icons/ai";
import { RiEdit2Fill } from "react-icons/ri";
import styles from "./PostSection.module.css";
import { useRouter } from "next/router";
import { convertToKRDate } from "@/utils/time";
import Dropdown from "../Dropdown/Dropdown";
import DropdownItem from "../Dropdown/DropdownItem/DropdownItem";
import Tabs from "../Tabs/Tabs";
import Tags from "@/components/Tags/Tags";
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";
import TabList from "@/components/Tabs/TabList/TabList";
import Tab from "@/components/Tabs/Tab/Tab";
import { IDataFetcher } from "@/libs/DataFetcher";

const PostSection = ({ dataFetcher }: { dataFetcher: IDataFetcher }) => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const router = useRouter();

  useEffect(() => {
    const getPosts = async () =>
      await dataFetcher
        .getPosts("/api/posts")
        .then((newPosts) => setPosts(newPosts));

    getPosts();
  }, [dataFetcher]);

  const deletePost = (_id: string, title: string) => async () => {
    await dataFetcher
      .deletePost(`/api/posts/${_id}`, title)
      .then((newPosts) => setPosts(newPosts));
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
    <div className={styles.baseWrapper}>
      <section className={styles.base}>
        <header className={styles.header}>
          <div>
            <h1>글</h1>
            <p>블로그에 글을 발행하거나 관리합니다.</p>
          </div>
          <div className={styles.headerAction}>
            <Link href={"/_blog-admin/write"}>
              <a>게시글 작성</a>
            </Link>
          </div>
        </header>
        <Tabs tabIds={["published", "drafted"]}>
          <TabList>
            <Tab>게시된 글</Tab>
            <Tab>임시 저장 글</Tab>
          </TabList>
          <TabPanel>
            <ul className={styles.postList}>
              {posts.map((post) => {
                const time = convertToKRDate(post.updatedAt.toString());
                return (
                  <li className={styles.post} key={post._id}>
                    <section className={styles.detail}>
                      <div className={styles.info}>
                        <Image
                          className={styles.thumbnail}
                          src={post.thumbnail}
                          width={100}
                          height={100}
                          alt="thumbnail"
                        />
                        <div className={styles.text}>
                          <h2 className={styles.title}>{post.title}</h2>
                          <Tags tags={post.tags} howMany={5} />
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
                        icon={<BsTrash size="1.2em" />}
                      >
                        삭제하기
                      </DropdownItem>
                      <DropdownItem
                        onClick={modifyPost(post._id)}
                        icon={<RiEdit2Fill size="1.2em" />}
                      >
                        수정하기
                      </DropdownItem>
                    </Dropdown>
                  </li>
                );
              })}
            </ul>
          </TabPanel>
          <TabPanel>
            <p>drafted posts</p>
          </TabPanel>
        </Tabs>
      </section>
    </div>
  );
};

export default PostSection;
