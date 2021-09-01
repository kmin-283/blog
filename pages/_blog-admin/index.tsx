import React, { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/client";
import Login from "@/components/login/login";
import Statistics from "@/components/statistics/statistics";
import PostsComp from "@/components/posts/posts";
import styles from "./_blog-admin.module.css";

const Admin = () => {
  const [session] = useSession();
  const [section, setSection] = useState("stats");

  return (
    <>
      {!session && <Login />}
      {session && (
        <main className={styles.main} data-type="https://schema.org/WebPage">
          <nav className={styles.navigation}>
            <ul>
              <li>
                <Link aria-label="go to main page" href="/">
                  <a>메인 페이지</a>
                </Link>
              </li>
              <li
                className={styles.item}
                title="show stats"
                onClick={() => setSection("stats")}
              >
                통계
              </li>
              <li
                className={styles.item}
                title="show posts"
                onClick={() => setSection("posts")}
              >
                글
              </li>
            </ul>
          </nav>
          <section>
            <h1>{`현재 메뉴는 ${section}입니다.`}</h1>
            {section === "stats" && <Statistics />}
            {section === "posts" && <PostsComp />}
          </section>
        </main>
      )}
    </>
  );
};
export default Admin;
