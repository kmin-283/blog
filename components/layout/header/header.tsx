import React from "react";
import Link from "next/link";
import styles from "./header.module.css";

const Header = () => {
  return (
    <header className={styles.header}>
      <nav className={styles.links}>
        <span className={`${styles.my} ${styles.page}`}>
          <Link href="/">
            <a>kmin</a>
          </Link>
        </span>
        <ul className={styles.pages}>
          <li className={styles.page}>
            <Link href="/">
              <a>Blog</a>
            </Link>
          </li>
          {/*<li className={styles.page}>*/}
          {/*  <Link href={"/about"}>*/}
          {/*    <a>About</a>*/}
          {/*  </Link>*/}
          {/*</li>*/}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
