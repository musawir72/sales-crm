import axios from "axios";
import { setAlert } from "../actions/alert";

import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_SUCCESS
} from "../actions/types";

export const fetchUser = () => async dispatch => {
  try {
    const res = await axios.get("http://localhost:5000/api/user");

    dispatch({
      type: FETCH_USER_SUCCESS,
      payload: res.data.result
    });
  } catch (error) {
    dispatch({
      type: FETCH_USER_FAIL
    });
  }
};

export const deleteUser = id => async dispatch => {
  try {
    const res = await axios.delete(`http://localhost:5000/api/user/${id}`);

    dispatch({
      type: USER_DELETE_SUCCESS
    });
  } catch (error) {
    dispatch({
      type: USER_DELETE_FAIL
    });
  }
};

export const updateUser = (
  registration_number,
  name,
  designation,
  id,
  role,
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
    id,
    role
  });

  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/edit",
      body,
      config
    );

    dispatch({
      type: USER_UPDATE_SUCCESS
    });
    history.push("/user_list/");
  } catch (error) {
    const errors = error.response.data.errors;
    if (errors) {
      errors.forEach(error => {
        dispatch(setAlert(error.msg));
      });
    }

    dispatch({
      type: USER_UPDATE_FAIL
    });
  }
};
