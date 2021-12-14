import { ReactElement } from "react";
import Head from "next/head";
import { GetServerSidePropsResult } from "next";
import { NextPageWithLayout } from "./_app";
import Header from "@/components/Layout/Header/Header";
import Footer from "@/components/Layout/Footer/Footer";
import PostCard from "@/components/PostCard/PostCard";
import Post, { IPost } from "@/models/post";
import styles from "./index.module.css";
import Database from "@/libs/Database";
import postSchema from "@/models/post";

export interface HomeProps {
  posts: IPost[];
}

const Home: NextPageWithLayout<HomeProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>kmin</title>
        <meta
          name="description"
          content="kmin의 블로그입니다. 개발을 진행하며 학습한 내용들을 작성하려고 합니다."
        />
        <link rel="canonical" href="https://www.kmin-283.com" />
      </Head>
      <main>
        <div className={styles.posts}>
          {posts.map((post) => {
            return <PostCard key={post._id} post={post} />;
          })}
        </div>
      </main>
    </div>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <Header />
      {page}
      <Footer />
    </>
  );
};

export default Home;

export const getServerSideProps = async (): Promise<
  GetServerSidePropsResult<HomeProps>
> => {
  const db = new Database();
  db.connect(process.env.MONGO_URL!, "posts");
  const posts = await db.find<IPost>({
    filter: {},
    modelName: "Post",
    modelSchema: postSchema,
  });

  if (!posts.success) {
    return {
      props: {
        posts: [],
      },
    };
  }

  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts.data)) as IPost[],
    },
  };
};
