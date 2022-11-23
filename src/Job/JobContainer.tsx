import { SvgIcon } from "@mui/material";
import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { additionalStyles } from "../data/additionalStyles";
import iconPath from "../data/svgIcons";
import AdditionalInfo from "../JobDetailed/AdditionalInfo/AdditionalInfo";
import { usePagination } from "../redux/hooks";
import {
  JobType,
  selectCurrnetTags,
  selectJobsList,
  setCurrentJob,
  setTag,
} from "../redux/jobSlice";
import { AppDispatch, RootState } from "../redux/store";
import { Utils } from "../utils/utils";
import Job from "./Job";
import styles from "./Jobs.module.scss";

interface JobContainerProps {
  list: JobType[];
  tags: string[];
  onSetCurrentJob: (data: JobType) => void;
  onSetTag: (tag: string) => void;
}

const JobContainer: React.FC<JobContainerProps> = (
  props: JobContainerProps
) => {
  const [list, setList] = useState<JobType[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const sortedList = Utils.sortJobs(list, tags);
  const {
    firstContentIndex,
    lastContentIndex,
    nextPage,
    prevPage,
    setPage,
    totalPages,
  } = usePagination({
    contentPerPage: 4,
    count: tags ? sortedList.length : list.length,
  });

  useEffect(() => {
    setList(props.list);
    setTags(props.tags);
  }, [props.list, props.tags]);

  return (
    <div className={styles.background}>
      {!tags.length ? (
        <></>
      ) : (
        <AdditionalInfo
          {...{
            title: "Tags",
            data: [
              {
                heading: "Selected tags",
                elements: tags,
                style: additionalStyles.tags,
              },
            ],
            onSetTag: props.onSetTag,
          }}
        />
      )}
      {sortedList.length
        ? sortedList
            .slice(firstContentIndex, lastContentIndex)
            .map((item: JobType, idx) => (
              <Job
                data={{ ...item }}
                onSetCurrentJob={props.onSetCurrentJob}
                key={idx}
              />
            ))
        : list.map((item: JobType, idx) => (
            <Job
              data={{ ...item }}
              onSetCurrentJob={props.onSetCurrentJob}
              key={idx}
            />
          ))}
      <div className={styles.pagination_container}>
        <div className={styles.pagination_data}>
          <nav aria-label="Pagination">
            <a href="#" onClick={prevPage} className={styles.leftArrow}>
              <span className="sr-only">Previous</span>
              <SvgIcon>
                <path d={iconPath.leftArrow} />
              </SvgIcon>
            </a>
            {/* @ts-ignore */}
            {[...Array(totalPages).keys()].map((el) => (
              <a
                href="#"
                onClick={() => setPage(el + 1)}
                key={el}
                className={styles.item}
              >
                {el + 1}
              </a>
            ))}
            <a href="#" onClick={nextPage} className={styles.rightArrow}>
              <span className="sr-only">Next</span>
              <SvgIcon>
                <path d={iconPath.rightArrow} />
              </SvgIcon>
            </a>
          </nav>
        </div>
      </div>
    </div>
  );
};

const mapStatetoProps = (state: RootState) => ({
  list: selectJobsList(state),
  tags: selectCurrnetTags(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetCurrentJob: (data: JobType) => {
    dispatch(setCurrentJob(data));
  },
  onSetTag: (tag: string) => {
    dispatch(setTag(tag));
  },
});

export default connect(mapStatetoProps, mapDispatchToProps)(JobContainer);
