import React from "react";
import styles from "./footer.module.css";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Link aria-label="go to github" href="https://github.com/kmin-283">
        <a>
          <FaGithub size="1.5em" color="white" />
        </a>
      </Link>
      <div>
        <span>© 2021 kmin. All rights reserved.</span>
      </div>
    </footer>
  );
};

export default Footer;
