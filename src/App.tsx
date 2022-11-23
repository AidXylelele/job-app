import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import JobContainer from "./Job/JobContainer";
import JobDetailed from "./JobDetailed/JobDetailedContainer";
import PreLoader from "./Preloader/Preloader";
import { selectInitialized, thunkSetInitialized } from "./redux/initSlice";
import { AppDispatch, RootState } from "./redux/store";

type AppProps = {
  initialized: boolean;
  onSetInitialized: (flag: boolean) => void;
};

const App: React.FC<AppProps> = (props: AppProps) => {
  const { initialized, onSetInitialized } = props;

  const refContainer = useRef(initialized);

  useEffect(() => {
    onSetInitialized(refContainer.current);
  }, [onSetInitialized]);

  if (!initialized) {
    return <PreLoader />;
  }

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<JobContainer />} />
          <Route path="/:jobId" element={<JobDetailed />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};
const mapStatetoProps = (state: RootState) => ({
  initialized: selectInitialized(state),
});

const mapDispatchToProps = (dispatch: AppDispatch) => ({
  onSetInitialized: (flag: boolean) => {
    dispatch(thunkSetInitialized(flag));
  },
});

export default connect(mapStatetoProps, mapDispatchToProps)(App);
