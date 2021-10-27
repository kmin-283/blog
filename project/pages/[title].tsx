import React, {ReactElement} from "react";
import {readdirSync, readFileSync} from "fs";
import path from "path";
import {GetStaticPaths, GetStaticPropsContext} from "next";
import connectDB from "../utils/mongodb";
import Head from "next/head";
import Post from "../models/post";
import styles from "./[title].module.css";
import Header from "../components/layout/header/header";
import Footer from "../components/layout/footer/footer";
import {NextPageWithLayout} from "./_app";
import Tags from "../components/tags/tags";
import {markedString} from "../utils/markdown";
import generateJsonLD from "../utils/generateJsonLD";
import {customSerialize} from "../utils/time";
import ContentHeader from "../components/contentHeader/contentHeader";

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
                                                       updatedAt
                                                     }) => {
  const jsonLD = generateJsonLD({
    title: postName
    , description
    , thumbnail
    , updatedAt
    , tags
  });
  // TODO html에서 __NEXT_DATA__를 없앨 수 없나??
  // TODO what __next_data__로 검색해보자.
  return (
    <div>
      <Head>
        <title>{postName}</title>
        <meta name="description" content={description}/>
        <script type="application/ld+json"
                dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLD)}}
        />
      </Head>
      <article className={styles.post}>
        <h1 className={styles.title}>{postName}</h1>
        <Tags tags={tags} howMany={5}/>
        <ContentHeader internalLinks={internalLinks}/>
        <strong className={styles.description}>{description}</strong>
        <section
          className={styles.content}
          dangerouslySetInnerHTML={{__html: markedString(markdown)}}
        />
      </article>
    </div>
  );
};

PostPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header/>
      {page}
      <Footer/>
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
  const {title} = context.params;
  const markdown = readFileSync(path.join("mds", `${title}.md`), "utf8");
  const trimmedTitle = title.replace(/\-/g, " ");
  const {
    title: postName,
    tags,
    thumbnail,
    description,
    internalLinks,
    updatedAt
  } = await Post.findOne({title: trimmedTitle});
  const time = customSerialize(updatedAt);
  return {
    props: {
      postName,
      tags,
      thumbnail,
      description,
      internalLinks,
      updatedAt: time,
      markdown,
    },
  };
};
