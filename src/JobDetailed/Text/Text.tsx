import React from "react";
import styles from "./Text.module.scss";

interface TextProps {
  text: string[];
  list: boolean;
}

const Text: React.FC<TextProps> = (props: TextProps) => {
  const { text, list } = props;

  const textWithTitle = (array: Array<string>, listed: boolean) => {
    const [title, body] = array;
    const slicedBody = body.split(".");
    if (!listed) {
      return (
        <div className={styles.text}>
          <h1>{title}</h1>
          <p>{body}</p>
        </div>
      );
    }

    return (
      <div className={styles.text}>
        <h1>{title}</h1>
        <ul>
          {slicedBody.map((item) => {
            if (item !== "") return <li>{item}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <div className={styles.text}>
      {text.length > 1 ? textWithTitle(text, list) : <p>{text[0]}</p>}
    </div>
  );
};

export default Text;
