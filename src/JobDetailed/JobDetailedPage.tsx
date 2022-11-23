import { SvgIcon } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { JobType } from "../redux/jobSlice";
import iconPath from "../data/svgIcons";
import AdditionalInfo from "./AdditionalInfo/AdditionalInfo";
import Body from "./Body/Body";
import Header from "./Header/Header";
import styles from "./JobDetailed.module.scss";
import Map from "./Map/Map";
import { additionalStyles } from "../data/additionalStyles";
import { Utils } from "../utils/utils";

interface JobDetailedProps extends JobType {
  date: string;
  parsedDescription: string[][];
  onSetTag: (tag: string) => void;
}

const JobDetailedPage: React.FC<JobDetailedProps> = (
  props: JobDetailedProps
) => {
  const {
    title,
    salary,
    parsedDescription,
    pictures,
    date,
    employment_type,
    benefits,
    onSetTag,
    location,
    phone,
    email,
    name,
    address,
  } = props;
  const formattedPhone = Utils.createPhoneNumber(phone.replace("+", ""));

  return (
    <div className={styles.container}>
      <div className={styles.information}>
        <Header
          {...{
            title: "Job Details",
            subTitles: [
              [iconPath.save, "Save to my list"],
              [iconPath.share, "Share"],
            ],
          }}
        />
        <Body
          {...{
            title,
            salary,
            date,
            description: parsedDescription,
          }}
        />
        <AdditionalInfo
          {...{
            title: "Additional info",
            data: [
              {
                heading: "Employment type",
                elements: employment_type,
                style: additionalStyles.employment_types,
              },
              {
                heading: "Benefits",
                elements: benefits,
                style: additionalStyles.benefits,
              },
            ],
            onSetTag,
          }}
        />
        <AdditionalInfo
          {...{ title: "Attached images", data: pictures, onSetTag }}
        />
        <NavLink to="/job-app/">
          <div className={styles.return_btn}>
            <SvgIcon>
              <path d={iconPath.leftArrow} />
            </SvgIcon>
            <p>RETURN TO JOB BOARD</p>
          </div>
        </NavLink>
      </div>
      <div className={styles.contact}>
        <Header
          {...{
            title: "Job Details",
            subTitles: null,
          }}
        />
      </div>
      <div className={styles.map}>
        <div className={styles.details}>
          <h1>Departament name.</h1>
          <h1>{name}</h1>
          <span>
            <SvgIcon className={styles.location}>
              <path d={iconPath.location} />
            </SvgIcon>
            <p>{address}</p>
          </span>
          <span>
            <p>{formattedPhone}</p>
          </span>
          <span>
            <p>{email}</p>
          </span>
        </div>
        <div className={styles.map_item}>
          <Map
            {...{
              center: location,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default JobDetailedPage;
