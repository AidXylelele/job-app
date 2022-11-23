import { SvgIcon } from "@mui/material";
import React from "react";
import styles from "./Header.module.scss";

interface HeaderProps {
  title: string;
  subTitles: string[][] | null;
}

const Header: React.FC<HeaderProps> = (props: HeaderProps) => {
  const { title, subTitles } = props;
  return (
    <div className={styles.header}>
      <h1>{title}</h1>
      <div className={styles.header_data}>
        {subTitles
          ? subTitles.map((array) => {
              const [source, text] = array;
              return (
                <div className={styles.header_data}>
                  <span>
                    <SvgIcon className={styles.save}>
                      <path d={source} />
                    </SvgIcon>
                    <p>{text}</p>
                  </span>
                </div>
              );
            })
          : null}
      </div>
      <span className={styles.under_line}></span>
    </div>
  );
};

export default Header;
