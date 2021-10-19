import { ReactElement } from "react";
import Head from "next/head";
import { GetStaticPropsResult } from "next";
import { NextPageWithLayout } from "./_app";
import Header from "@/components/layout/header/header";
import Footer from "@/components/layout/footer/footer";
import PostCard from "@/components/PostCard/postCard";
import Post, { IPost } from "../models/post";
import styles from "./index.module.css";
import connectDB from "@/utils/mongodb";

export interface HomeProps {
  posts: IPost[];
}

const Home: NextPageWithLayout<HomeProps> = ({ posts }) => {
  return (
    <div>
      <Head>
        <title>kmin</title>
        <meta
          name="description"
          content="Website About kmin. In Blog page, write a articles on developing."
        />
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

export const getStaticProps = async (): Promise<
  GetStaticPropsResult<HomeProps>
> => {
  await connectDB();
  const posts = JSON.stringify(await Post.find({}));

  if (posts) {
    return {
      props: {
        posts: JSON.parse(posts),
      },
    };
  }
  return {
    props: {
      posts: [],
    },
  };
};
