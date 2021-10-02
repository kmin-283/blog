import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.socialIcon} social-icon`}>
        <Link aria-label="go to github" href="https://github.com/kmin-283">
          <a>
            <FaGithub size="2em" />
          </a>
        </Link>
      </div>
      <div className={`${styles.sitemap} sitemap`}>
        <Link href="/">
          <a>Blog</a>
        </Link>
        <Link href="/about">
          <a>About</a>
        </Link>
      </div>
      <div>
        <small>Copyright &copy; 2021 kmin. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
