import { Rating, SvgIcon } from "@mui/material";
import React from "react";
import { NavLink } from "react-router-dom";
import { JobType } from "../redux/jobSlice";
import iconPath from "../data/svgIcons";
import styles from "./Jobs.module.scss";
import { Utils } from "../utils/utils";

type JobProps = {
  data: JobType;
  onSetCurrentJob: (data: JobType) => void;
};

const Job: React.FC<JobProps> = (props: JobProps) => {
  const { data, onSetCurrentJob } = props;
  const { location, address } = data;

  return (
    <div className={styles.container}>
      <img className={styles.image} alt={"Here photo"} src={data.pictures[0]} />
      <div className={styles.main}>
        <div className={styles.description}>
          <NavLink
            end
            to={`./../jobs/${data.id}`}
            onClick={() => onSetCurrentJob({ ...data, location })}
          >
            <h1>{data.title}</h1>
          </NavLink>
          <div className={styles.departament}>
            <p>Departament name</p>
            <li>{data.name}</li>
          </div>
          <div className={styles.location}>
            <SvgIcon>
              <path d={iconPath.location} />
            </SvgIcon>
            <p>{address}</p>
          </div>
        </div>
        <div className={styles.data_column}>
          <div className={styles.rating}>
            <Rating
              size="small"
              name="simple-controlled"
              value={Math.ceil(Math.random() * 5)}
              onChange={(event, newValue) => {}}
            />
          </div>
          <div className={styles.data}>
            <SvgIcon className={styles.save}>
              <path d={iconPath.save} />
            </SvgIcon>
            <p>{`Posted ${Utils.countDate(
              data.createdAt,
              data.updatedAt
            )} ago`}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Job;
