/* Hours Reducer */

import {
  GET_TIMESHEETS,
  ADD_TIMESHEET,
  UPDATE_TIMESHEET,
  DELETE_TIMESHEET,
  ADD_DAY,
  UPDATE_DAY,
  DELETE_DAY
} from "../actions/types";

const initialState = {};

export function timesheets(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_TIMESHEETS:
      return {
        ...state,
        payload
      };
    case ADD_TIMESHEET:
      return {
        ...state,
        payload
      };
    case UPDATE_TIMESHEET:
      return {
        ...state,
        payload
      };
    case DELETE_TIMESHEET:
      return {
        ...state,
        payload
      };
    default:
      return state;
  }
}

const initialStateDays = {};
export function days(state = initialStateDays, action) {
  const { type, payload } = action;

  switch (type) {
    case ADD_DAY:
      return {
        ...state,
        payload
      };
    case UPDATE_DAY:
      return {
        ...state,
        payload
      };
    case DELETE_DAY:
      return {
        ...state,
        payload
      };
    default:
      return state;
  }
}
