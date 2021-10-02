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
        <small>Copyright &copy; 2021 kmin. All rights reserved.</small>
      </div>
    </footer>
  );
};

export default Footer;
