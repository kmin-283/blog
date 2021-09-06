import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IPost } from "../../models/post";

const PostsComp = () => {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    const getPosts = async () => {
      const response = await fetch("/api/posts", {
        method: "GET",
      });
      if (response.ok) {
        const { data }: { data: IPost[] } = await response.json();
        setPosts(data);
      }
    };
    getPosts();
  }, []);

  return (
    <>
      <Link href={"/_blog-admin/write"}>
        <a>게시글 작성</a>
      </Link>
      <ul>
        {posts.map((post) => {
          return (
            <li key={post.title} data-mainentity="">
              <h2 data-name="">{post.title}</h2>
            </li>
          );
        })}
      </ul>
    </>
  );
};

export default PostsComp;
