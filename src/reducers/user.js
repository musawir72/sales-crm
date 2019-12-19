import {
  FETCH_USER_SUCCESS,
  FETCH_USER_FAIL,
  USER_DELETE_SUCCESS,
  USER_DELETE_FAIL,
  USER_UPDATE_FAIL,
  USER_UPDATE_SUCCESS,
  USER_MONTHLY_DETAILS_SUCCESS,
  USER_MONTHLY_DETAILS_FAIL,
  USER_WEEKLY_DETAILS_SUCCESS,
  USER_WEEKLY_DETAILS_FAIL
} from "../actions/types";

const initialState = {
  users: [],
  monthlyuserData: [],
  weeklyuserData: [],
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
    case USER_WEEKLY_DETAILS_SUCCESS:
      return {
        ...state,
        weeklyuserData: payload,
        loading: false,
        error: null
      };
    case USER_MONTHLY_DETAILS_SUCCESS:
      return {
        ...state,
        monthlyuserData: payload,
        loading: false,
        error: null
      };
    case USER_UPDATE_FAIL:
    case USER_DELETE_FAIL:
    case USER_MONTHLY_DETAILS_FAIL:
    case USER_WEEKLY_DETAILS_FAIL:
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
