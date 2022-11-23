import React from "react";
import Header from "../Header/Header";
import styles from "./AdditionalInfo.module.scss";

type Tag = {
  heading: string;
  elements: string[];
  style: string;
};

interface AdditionalInfoProps {
  title: string;
  data: Tag[] | string[];
  onSetTag: (tag: string) => void;
}

const AdditionalInfo: React.FC<AdditionalInfoProps> = (
  props: AdditionalInfoProps
) => {
  const { title, data, onSetTag } = props;

  return (
    <div>
      <Header
        {...{
          title,
          subTitles: null,
        }}
      />
      <div className={styles.blockOfInfo}>
        {data.map((item) => {
          if (typeof item !== "string") {
            const { heading, elements, style } = item;
            return (
              <div>
                <p>{heading}</p>
                <div className={styles.blockOfData}>
                  {elements.map((text) => (
                    <button className={style} onClick={() => onSetTag(text)}>
                      {text}
                    </button>
                  ))}
                </div>
              </div>
            );
          }
          return <></>;
        })}
        <div className={styles.blockOfData}>
          {data.map((source) => {
            if (typeof source === "string") {
              return (
                <img src={source} alt="There must be something interesting!" />
              );
            }
            return <></>;
          })}
        </div>
      </div>
    </div>
  );
};

export default AdditionalInfo;
