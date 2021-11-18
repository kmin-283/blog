import React, {useEffect, useState} from "react";
import Link from "next/link";
import Image from "next/image";
import {IPost} from "@/models/post";
import {BsTrash} from "react-icons/bs";
import {AiOutlineClockCircle} from "react-icons/ai";
import {RiEdit2Fill} from "react-icons/ri";
import styles from "./Posts.module.css";
import {useRouter} from "next/router";
import {convertToKRDate} from "@/utils/time";
import Dropdown from "../Dropdown/Dropdown";
import DropdownItem from "../Dropdown/DropdownItem/DropdownItem";
import Tabs from "../Tabs/Tabs";
import Tags from "../Tags/Tags";
import TabPanel from "@/components/Tabs/TabPanel/TabPanel";
import TabList from "@/components/Tabs/TabList/TabList";
import Tab from "@/components/Tabs/Tab/Tab";

export type TabType = "publish" | "draft";

const PostSection = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [tabActive, setTabActive] = useState<TabType>("publish");
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
    getPosts().then(({data}) => setPosts(data as IPost[]));
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
      const {data} = await response.json();
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
          <div className={styles.sectionHeaderAction}>
            <Link href={"/_blog-admin/write"}>
              <a>게시글 작성</a>
            </Link>
          </div>
        </header>
        <Tabs tabIds={['published', 'drafted']}>
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
                    {/* TODO Link 태그로 감싸서 해당포스트의 새로운 창을 띄워주기 */}
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
                          <Tags tags={post.tags} howMany={5}/>
                        </div>
                      </div>
                      <time className={styles.time} dateTime={time}>
                        <AiOutlineClockCircle/>
                        <span>{time}</span>
                      </time>
                    </section>
                    <Dropdown>
                      <DropdownItem
                        onClick={deletePost(post._id, post.title)}
                        role={"삭제하기"}
                        icon={<BsTrash size="1.2em"/>}
                      />
                      <DropdownItem
                        onClick={modifyPost(post._id)}
                        role={"수정하기"}
                        icon={<RiEdit2Fill size="1.2em"/>}
                      />
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
