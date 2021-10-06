import React, { FC } from "react";
import { IPost } from "../../models/post";
import Link from "next/link";
import Image from "next/image";
import { convertToKRDate } from "@/utils/time";
import styles from "./postCard.module.css";

interface PostCardProps {
  post: IPost;
}

const PostCard: FC<PostCardProps> = ({ post }) => {
  const time = convertToKRDate(post.updatedAt.toString());
  return (
    <div className={styles.postCard}>
      <Link href={`/${post.title.replace(/\s/g, "-")}`}>
        <a>
          <div className={styles.thumbnail}>
            {post.thumbnail && (
              <Image src={post.thumbnail} alt={"thumbnail"} layout={"fill"} />
            )}
          </div>
          <div className={styles.about}>
            <h2 className={styles.title} property={"title"}>
              {post.title}
            </h2>
            <hr className={styles.divider} />
            <span className={styles.description} property={"description"}>
              {post.description}
            </span>
            <div className={styles.subInfo}>
              <time className={styles.time} dateTime={time}>
                {time}
              </time>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default PostCard;
