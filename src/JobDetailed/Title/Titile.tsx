import { SvgIcon } from "@mui/material";
import React from "react";
import iconPath from "../../data/svgIcons";
import styles from "./Title.module.scss";

interface TitleProps {
  title: string;
  salary: string;
  date: string;
}

const Title: React.FC<TitleProps> = (props: TitleProps) => {
  const { title, salary, date } = props;

  return (
    <div className={styles.data}>
      <div className={styles.main_data}>
        <h1>{title}</h1>
        <div className={styles.salary}>
          <h1>
            <SvgIcon className={styles.euro}>
              <path d={iconPath.euro} />
            </SvgIcon>
            {salary}
          </h1>
          <p>Brutto, per year</p>
        </div>
        <div className={styles.break}></div>
        <p>
          {`Posted
          ${date} ago`}
        </p>
      </div>
    </div>
  );
};

export default Title;
