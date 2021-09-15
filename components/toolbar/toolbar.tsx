import React, { ChangeEvent, SetStateAction, Dispatch } from "react";
import { HiOutlinePhotograph } from "react-icons/hi";
import styles from "./toolbar.module.css";

interface ToolbarProps {
  setMarkdown: Dispatch<SetStateAction<string>>;
}

const Toolbar = ({ setMarkdown }: ToolbarProps) => {
  const fileSelect = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    if (event.target.files) {
      const file = event.target.files[0];
      {
        /*TODO file upload 한 후 응답으로 받은  url로 markdown 구성 */
      }
      // setMarkdown((prevState) => prevState + `![](${url})`);
    }
  };

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
            onChange={fileSelect}
          />
        </li>
        <li className={styles.tool}>asdf</li>
      </ul>
    </section>
  );
};

export default Toolbar;
