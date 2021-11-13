import React, { ReactElement } from "react";
import { readFileSync } from "fs";
import path from "path";
import { GetServerSidePropsContext } from "next";
import connectDB from "@/utils/mongodb";
import Head from "next/head";
import Post from "@/models/post";
import styles from "./[title].module.css";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { NextPageWithLayout } from "./_app";
import Tags from "@/components/Tags/Tags";
import { markedString } from "@/utils/markdown";
import generateJsonLD from "@/utils/generateJsonLD";
import ContentHeader from "@/components/ContentHeader/ContentHeader";

interface PostPageProps {
  postName: string;
  tags: string[];
  markdown: string;
  thumbnail: string;
  description: string;
  internalLinks: string[];
  updatedAt: Date;
}

const PostPage: NextPageWithLayout<PostPageProps> = ({
  postName,
  tags,
  markdown,
  thumbnail,
  description,
  internalLinks,
  updatedAt,
}) => {
  const jsonLD = generateJsonLD({
    title: postName,
    description,
    thumbnail,
    updatedAt,
    tags,
  });
  // TODO html에서 __NEXT_DATA__를 없앨 수 없나??
  // TODO what __next_data__로 검색해보자.
  return (
    <div>
      <Head>
        <title>{postName}</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content={description} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />
      </Head>
      <article className={styles.post}>
        <h1 className={styles.title}>{postName}</h1>
        <Tags tags={tags} howMany={5} />
        <ContentHeader internalLinks={internalLinks} />
        <strong className={styles.description}>{description}</strong>
        <section
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: markedString(markdown) }}
        />
      </article>
    </div>
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

interface GetServerSidePropsContextWithTitle extends GetServerSidePropsContext {
  params: {
    title: string;
  };
}

export const getServerSideProps = async (
  context: GetServerSidePropsContextWithTitle
) => {
  // TODO title로 DB를 조회하는게 좋은지 아니면 api로 조회하는게 좋은지..?
  connectDB().then();
  const { title } = context.params;
  const markdown = readFileSync(path.join("mds", `${title}.md`), "utf8");
  const trimmedTitle = title.replace(/\-/g, " ");
  const {
    title: postName,
    tags,
    thumbnail,
    description,
    internalLinks,
    updatedAt,
  } = await Post.findOne({ title: trimmedTitle });
  return {
    props: {
      postName,
      tags,
      thumbnail,
      description,
      internalLinks,
      updatedAt: (updatedAt as Date).toISOString(),
      markdown,
    },
  };
};
