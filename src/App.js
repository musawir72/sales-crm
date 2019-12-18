import React from "react";

import AppRouter from "./routers/AppRouter";
import setAuthToken from "../src/utills/setAuthToken";
import store from "./store/store";
import { loadUser } from "./actions/auth";
import { positions, Provider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const options = {
  timeout: 5000,
  position: positions.TOP_RIGHT
};

export default () => {
  React.useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider template={AlertTemplate} {...options}>
      <AppRouter />
    </Provider>
  );
};
