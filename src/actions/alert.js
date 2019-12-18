import uuid from "uuid";
import { SET_ALERT, REMOVE_ALERT } from "../actions/types";
export const setAlert = (msg, alert_type) => dispatch => {
  const id = uuid.v4();
  dispatch({
    type: SET_ALERT,
    payload: { msg, alert_type, id }
  });

  setTimeout(
    () =>
      dispatch({
        type: REMOVE_ALERT,
        payload: id
      }),
    2000
  );
};
