import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AppThunk, RootState } from "./store";
import getJobsRequest, { getAddressRequest } from "../requestAPI/requestAPI";
import { locations } from "../data/locations";

export type LocationType = {
  lat: number;
  lng: number;
};

export interface JobType {
  id: string;
  name: string;
  email: string;
  phone: string;
  title: string;
  salary: string;
  address: string;
  benefits: string[];
  location: LocationType;
  pictures: string[];
  createdAt: string;
  updatedAt: string;
  description: string;
  employment_type: string[];
}

export type JobsState = {
  list: Array<JobType>;
  currentJob: JobType | null;
  tags: Array<string>;
};

const initialState: JobsState = {
  list: [],
  currentJob: null,
  tags: [],
};

export const jobsSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobsList: (state, action: PayloadAction<Array<JobType>>) => {
      state.list = action.payload;
    },
    setCurrentJob: (state, action: PayloadAction<JobType>) => {
      state.currentJob = action.payload;
    },
    setTag: (state, action: PayloadAction<string>) => {
      const tag = action.payload;
      if (state.tags.includes(tag)) {
        state.tags = state.tags.filter((item) => item !== tag);
      } else {
        state.tags.push(tag);
      }
    },
  },
});

export const { setJobsList, setCurrentJob, setTag } = jobsSlice.actions;

export const selectJobsList = (state: RootState) => state.jobs.list;
export const selectCurrentJob = (state: RootState) => state.jobs.currentJob;
export const selectCurrnetTags = (state: RootState) => state.jobs.tags;

export const thunkSetJobs = (): AppThunk => async (dispatch) => {
  const list = await getJobsRequest();
  list.map((item, idx) => {
    item.location = locations[idx];
    return item;
  });

  for await (let item of list) {
    const res: string = await getAddressRequest(item.location);
    item.address = res;
  }

  dispatch(setJobsList(list));
};

export default jobsSlice.reducer;
