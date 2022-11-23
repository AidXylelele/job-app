import { configureStore, ThunkAction, AnyAction } from "@reduxjs/toolkit";
import setInitializedReducer from "./initSlice";
import setJobsListReducer from "./jobSlice";

export const store = configureStore({
  reducer: {
    jobs: setJobsListReducer,
    app: setInitializedReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  AnyAction
>;

(window as any).store = store;
