import React, { ReactElement, FC } from "react";
import { readdirSync, readFileSync } from "fs";
import path from "path";
import { GetStaticPaths, GetStaticPropsContext } from "next";
import connectDB from "../utils/mongodb";
import Post from "../models/post";
import marked from "marked";
import styles from "./[title].module.css";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";

interface PostPageProps {
  postName: string;
  tags: string[];
  markdown: string;
}

const PostPage: FC<PostPageProps> = ({ postName, tags, markdown }) => {
  return (
    <article className={styles.post}>
      <h1>{postName}</h1>
      <ul className={styles.tags}>
        {tags.map((tag, index) => (
          <li key={`${tag}-${index}`}>{tag}</li>
        ))}
      </ul>
      <section
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: marked(markdown) }}
      />
    </article>
  );
};

PostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};

export default PostPage;

export const getStaticPaths: GetStaticPaths = async () => {
  const files = readdirSync(path.join("mds"));
  const paths = files.map((file) => ({
    params: {
      title: file.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

interface GetStaticPropsContextWithTitle extends GetStaticPropsContext {
  params: {
    title: string;
  };
}

export const getStaticProps = async (
  context: GetStaticPropsContextWithTitle
) => {
  // TODO title로 DB를 조회하는게 좋은지 아니면 api로 조회하는게 좋은지..?
  connectDB().then();
  const { title } = context.params;
  const markdown = readFileSync(path.join("mds", `${title}.md`), "utf8");
  const { title: postName, tags } = await Post.findOne({ title });

  return {
    props: {
      postName,
      tags,
      markdown,
    },
  };
};
