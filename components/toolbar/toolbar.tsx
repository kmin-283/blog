import React, { ChangeEvent } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import styles from "./toolbar.module.css";

interface ToolbarProps {
  uploadImage: (event: ChangeEvent<HTMLInputElement>) => Promise<void>;
}

const Toolbar = ({ uploadImage }: ToolbarProps) => {
  return (
    <section className={styles.toolbar}>
      <ul className={styles.toolList}>
        <li className={styles.tool}>
          <label htmlFor="upload" className={styles.toolImage}>
            <HiOutlinePhotograph size={"1.625em"} />
          </label>
          <input
            id="upload"
            className={styles.toolUploader}
            type="file"
            onChange={uploadImage}
          />
        </li>
      </ul>
    </section>
  );
};

export default Toolbar;
