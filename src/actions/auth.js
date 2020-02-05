import axios from "axios";
import { Redirect } from "react-router-dom";
import { setAlert } from "../actions/alert";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGOUT
} from "../actions/types";
import setAuthToken from "../utills/setAuthToken";
const BASE_URL = REACT_APP_BASE_URL;
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get(BASE_URL + "/api/auth");

    dispatch({
      type: USER_LOADED,
      payload: res.data
    });
  } catch (err) {
    dispatch({
      type: AUTH_ERROR
    });
  }
};

export const signUp = (
  registration_number,
  name,
  designation,
  password,
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    registration_number,
    name,
    designation,
    password
  });

  try {
    console.log(BASE_URL + "/api/user");
    debugger;
    const res = await axios.post(BASE_URL + "/api/user", body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data
    });

    dispatch(loadUser());
    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    const error = error.response.data.msg;
    if (error) {
      dispatch(setAlert(error));
    }
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }

    dispatch({
      type: REGISTER_FAIL
    });
  }
};

export const logIn = (
  registration_number,
  password,
  history
) => async dispatch => {
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };

  const body = JSON.stringify({
    registration_number,
    password
  });

  try {
    const res = await axios.post(BASE_URL + "/api/auth", body, config);

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data
    });
    dispatch(loadUser());

    history.push("/dashboard");
  } catch (error) {
    const errors = error.response.data.errors;
    const error = error.response.data.msg;
    if (error) {
      dispatch(setAlert(error));
    }
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }

    dispatch({
      type: LOGIN_FAIL
    });
  }
};

// Logout
export const logout = () => dispatch => {
  dispatch({ type: LOGOUT });
};
