import React from "react";
import { connect } from "react-redux";
import { JobType, selectCurrentJob, setTag } from "../redux/jobSlice";
import { AppDispatch, RootState } from "../redux/store";
import JobDetailedPage from "./JobDetailedPage";
import { Utils } from "../utils/utils";
import { Navigate } from "react-router-dom";

type JobDetailedContainerProps = {
  currentJob: JobType | null;
  onSetTag: (tag: string) => void;
};

const JobDetailedContainer: React.FC<JobDetailedContainerProps> = (
  props: JobDetailedContainerProps
) => {
  const { currentJob, onSetTag } = props;

  if (!currentJob) {
    return <Navigate replace to="/" />;
  }

  const { salary, description, createdAt, updatedAt } = currentJob;

  const date = Utils.countDate(createdAt, updatedAt);
  const parsedSalary = Utils.parseSalary(salary);
  const parsedDescription = Utils.parseDescription(description);

  return (
    <JobDetailedPage
      {...{
        ...currentJob,
        salary: parsedSalary,
        date,
        description,
        onSetTag,
        parsedDescription,
      }}
    />
  );
};

const mapStatetoProps = (state: RootState) => ({
  currentJob: selectCurrentJob(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetTag: (tag: string) => {
    dispatch(setTag(tag));
  },
});

export default connect(
  mapStatetoProps,
  mapDispatchToProps
)(JobDetailedContainer);
