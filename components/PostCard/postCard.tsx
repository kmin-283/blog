import React, { FC } from "react";
import { IPost } from "../../models/post";
import Image from "next/image";
import styles from "./postCard.module.css";

interface PostCardProps {
  post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  return (
    <div className={styles.postCard}>
      <a>
        <div className={styles.thumbnail}>
          {post.thumbnail && (
            <Image src={post.thumbnail} alt={"thumbnail"} layout={"fill"} />
          )}
        </div>
        <div className={styles.about}>
          <h2 className={styles.title} property={"title"}>
            {post.title} Static vs Unit vs Integration vs E2E Testing for
            Frontend Apps
          </h2>
          <hr className={styles.divider} />
          <span className={styles.description} property={"description"}>
            excerpt가 들어갈 자리입니다.excerpt가 들어갈 자리입니다. excerpt가
            들어갈 자리입니다. excerpt가 들어갈 자리입니다.excerpt가 들어갈
            자리입니다.
          </span>
        </div>
      </a>
    </div>
  );
};

export default PostCard;
