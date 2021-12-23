import React, { FC } from "react";
import { IPost } from "@/models/post";
import Link from "next/link";
import Image from "next/image";
import { convertToKRDate } from "@/utils/time";
import styles from "./PostCard.module.css";

export interface PostCardProps {
  post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const createdTime = convertToKRDate(post.createdAt.toString());
  return (
    <Link href={`/${post.title.replace(/\s/g, "-")}`}>
      <a>
        <div className={styles.postCard}>
          <div className={styles.thumbnail}>
            {post.thumbnail && (
              <Image src={post.thumbnail} alt={"thumbnail"} layout={"fill"} />
            )}
          </div>
          <article className={styles.about}>
            <h2 className={styles.title} property={"title"}>
              {post.title}
            </h2>
            <hr className={styles.divider} />
            <span className={styles.description} property={"description"}>
              {post.description}
            </span>
            <time className={styles.time} dateTime={post.createdAt.toString()}>
              {createdTime}
            </time>
          </article>
        </div>
      </a>
    </Link>
  );
};

export default PostCard;
