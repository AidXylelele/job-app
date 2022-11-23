import React from "react";
import Text from "../Text/Text";
import Title from "../Title/Titile";
import styles from "./Body.module.scss";

export interface BodyProps {
  title: string;
  salary: string;
  description: string[][];
  date: string;
}

const Body: React.FC<BodyProps> = (props: BodyProps) => {
  const { title, salary, description, date } = props;

  return (
    <div className={styles.body}>
      <button className={styles.apply_btn_1}>Apply now</button>
      <Title {...{ title, salary, date }} />
      <Text {...{ text: description[0], list: false }} />
      <Text {...{ text: description[1], list: false }} />
      <Text {...{ text: description[2], list: true }} />
      <button className={styles.apply_btn_2}>Apply now</button>
    </div>
  );
};

export default Body;
