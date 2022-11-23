import React from "react";
import preLoader from "../images/preLoader.svg";
import styles from "./PreLoader.module.scss";

const PreLoader = () => {
  return (
    <div className={styles.preloader_container}>
      <img
        className={styles.preloader}
        alt="There must be a preloader!"
        src={preLoader}
      />
    </div>
  );
};

export default PreLoader;
