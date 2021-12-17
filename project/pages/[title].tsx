import React, { ReactElement } from "react";
import { readFileSync } from "fs";
import path from "path";
import { GetServerSidePropsContext } from "next";
import Head from "next/head";
import Post, { IPost } from "@/models/post";
import styles from "./[title].module.css";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import { NextPageWithLayout } from "./_app";
import Tags from "@/components/Tags/Tags";
import { markedString } from "@/utils/markdown";
import generateJsonLD from "@/utils/generateJsonLD";
import InpageNavigation from "@/components/InpageNavigation/InpageNavigation";
import NavigationMenuButton from "@/components/NavigationMenuButton/NavigationMenuButton";
import postSchema from "@/models/post";
import Database from "@/libs/Database";

interface PostPageProps {
  postName: string;
  tags: string[];
  markdown: string;
  thumbnail: string;
  description: string;
  internalLinks: string;
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
        <meta property="og:title" content={postName} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="article" />
        <meta property="og:image" content={thumbnail} />
        <meta
          property="og:url"
          content={`https://kmin-283/${postName.replace(/\s/g, "-")}`}
        />
        <link rel="canonical" href={`https://www.kmin-283.com/${postName}`} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
        />
      </Head>
      <article className={styles.container}>
        <section className={styles.post}>
          <h1 className={styles.title}>{postName}</h1>
          <Tags tags={tags} howMany={5} />
          <strong className={styles.description}>{description}</strong>
          <section
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: markedString(markdown) }}
          />
        </section>
        {internalLinks.length > 2 && (
          <InpageNavigation internalLinks={internalLinks} />
        )}
        {internalLinks.length > 2 && (
          <NavigationMenuButton internalLinks={internalLinks}>
            컨텐츠 보기
          </NavigationMenuButton>
        )}
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
  const db = new Database();
  db.connect(process.env.MONGO_URL!, "posts");
  const { title } = context.params;
  const markdown = readFileSync(path.join("mds", `${title}.md`), "utf8");
  const trimmedTitle = title.replace(/\-/g, " ");
  const ret = await db.find({
    filter: { title: trimmedTitle },
    modelName: "Post",
    modelSchema: postSchema,
  });

  if (!ret.success) {
    // TODO 404페이지를 보여줘야 함
    return {
      props: {},
    };
  }

  const {
    title: postName,
    tags,
    thumbnail,
    description,
    internalLinks,
    updatedAt,
  } = (ret.data as IPost[])[0];

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
