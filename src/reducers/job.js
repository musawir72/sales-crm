import {
  JOB_ADD_SUCCESS,
  JOB_ADD_FAIL,
  FETCH_JOB_DATA_SUCCESS,
  FETCH_JOB_DATA_FAIL,
  JOB_DELETE_FAIL,
  JOB_DELETE_SUCCESS,
  JOB_UPDATE_SUCCESS,
  JOB_UPDATE_FAIL,
  LEAD_UPDATE_FAIL,
  LEAD_UPDATE_SUCCESS
} from "../actions/types";
const initialState = {
  job: [],
  error: {},
  newjob: [],
  loading: true
};

export default function(state = initialState, action) {
  const { type, payload } = action;
  switch (type) {
    case JOB_ADD_SUCCESS:
      return {
        ...state,
        newjob: null,
        loading: false
      };
    case FETCH_JOB_DATA_SUCCESS:
      return {
        ...state,
        job: payload,
        loading: false
      };
    case LEAD_UPDATE_FAIL:
    case JOB_UPDATE_FAIL:
    case FETCH_JOB_DATA_FAIL:
    case JOB_DELETE_FAIL:
    case JOB_ADD_FAIL:
      return {
        ...state,
        loading: true,
        error: payload
      };
    case JOB_UPDATE_SUCCESS:
    case LEAD_UPDATE_SUCCESS:
    case JOB_DELETE_SUCCESS:
      return {
        ...state,
        loading: true,
        error: false
      };
    default:
      return state;
  }
}
