import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS
} from "../actions/types";

const initialState = {
  users: [],
  error: {},
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case FETCH_USER_SUCCESS:
      return {
        ...state,
        users: payload,
        loading: false,
        error: null
      };
    case USER_UPDATE_FAIL:
    case USER_DELETE_FAIL:
    case FETCH_USER_FAIL:
      return {
        ...state,
        error: payload,
        loading: true
      };
    case USER_UPDATE_SUCCESS:
    case USER_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: null
      };

    default:
      return state;
  }
}
