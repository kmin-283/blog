import React, { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import { getSession } from "next-auth/client";
import Login from "@/components/Login/Login";
import Statistics from "@/components/Statistics/Statistics";
import styles from "./index.module.css";
import { NextPageContext } from "next";
import { Session } from "next-auth";
import PostSection from "@/components/PostSection/PostSection";
import DataFetcher from "@/libs/DataFetcher";
import { DialogProvider } from "@/context/dialogContext";

const Admin = ({ session }: { session: Session | null }) => {
  // TODO dataFetcher는 1번만 생성됐으면 좋겠다...
  // 테스트코드에서 Admin이 rerendering 되면 dataFetcher의 mocking의 결과가 undefined가 됨....왜지???
  const dataFetcher = new DataFetcher();
  const [section, setSection] = useState("stats");

  if (!session) {
    return <Login />;
  }

  return (
    <>
      {session && (
        <>
          <Head>
            <title>admin</title>
            <meta name="robots" content="noindex" />
          </Head>
          <main className={styles.main}>
            <nav className={styles.navigation}>
              <ul>
                <li className={styles.navItem}>
                  <Link aria-label="go to main page" href="/">
                    <a>블로그로 이동</a>
                  </Link>
                </li>
                <li
                  className={styles.navItem}
                  title="show stats"
                  onClick={() => setSection("stats")}
                >
                  <div className={section === "stats" ? styles.current : ""}>
                    통계
                  </div>
                </li>
                <li
                  className={styles.navItem}
                  title="show posts"
                  onClick={() => setSection("posts")}
                >
                  <div className={section === "posts" ? styles.current : ""}>
                    글
                  </div>
                </li>
              </ul>
            </nav>
            {section === "stats" && <Statistics />}
            {section === "posts" && (
              // Provider도 새로 생성되서 발생하는 문제?
              <DialogProvider>
                <PostSection dataFetcher={dataFetcher} />
              </DialogProvider>
            )}
          </main>
          <div id="dialog-root" />
        </>
      )}
    </>
  );
};
export default Admin;

export const getServerSideProps = async (context: NextPageContext) => {
  const session = await getSession(context);
  return {
    props: {
      session,
    },
  };
};
