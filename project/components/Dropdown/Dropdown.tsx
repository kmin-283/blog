import React, { useEffect, useState, useRef, FC } from "react";
import { BsThreeDots } from "react-icons/bs";
import styles from "./Dropdown.module.css";

const Dropdown: FC = ({ children }) => {
  const [show, setShow] = useState<boolean>(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const checkIfClickedOutside = (event: MouseEvent) => {
      if (show && ref.current && !ref.current?.contains(event.target as Node)) {
        setShow(!show);
      }
    };
    document.addEventListener("click", checkIfClickedOutside);
    return () => {
      document.removeEventListener("click", checkIfClickedOutside);
    };
  }, [show]);

  const showDropdown = () => {
    setShow(!show);
  };

  return (
    <section className={styles.dropdown} ref={ref}>
      <BsThreeDots
        className={styles.dropdownIcon}
        onClick={showDropdown}
        size={"2em"}
      />
      {show && <div className={styles.dropdownContent}>{children}</div>}
    </section>
  );
};
export default Dropdown;
