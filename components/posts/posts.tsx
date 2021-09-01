import React from "react";
import Link from "next/link";

const PostsComp = () => {
  return (
    <>
      <Link href={"/_blog-admin/write"}>
        <a>게시글 작성</a>
      </Link>
      <ul>
        <li data-mainentity="">
          <h2 data-name="">1</h2>
          <p data-description="">desc1</p>
        </li>
        <li data-mainentity="">2</li>
        <li data-mainentity="">3</li>
        <li data-mainentity="">4</li>
      </ul>
    </>
  );
};

export default PostsComp;
