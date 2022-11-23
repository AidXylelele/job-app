import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { thunkSetJobs } from "./jobSlice";
import { AppThunk, RootState } from "./store";

export type appState = {
  initialized: boolean;
};

const initialState: appState = {
  initialized: false,
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setInitialized: (state, action: PayloadAction<boolean>) => {
      state.initialized = action.payload;
    },
  },
});

export const { setInitialized } = appSlice.actions;

export const selectInitialized = (state: RootState) => state.app.initialized;

export const thunkSetInitialized =
  (flag: boolean): AppThunk =>
  async (dispatch) => {
    const promise = dispatch(thunkSetJobs());
    Promise.all([promise]).then(() => {
      dispatch(setInitialized(!flag));
    });
  };

export default appSlice.reducer;
