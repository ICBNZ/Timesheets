/* Timesheet Actions */

import {
  GET_TIMESHEETS,
  ADD_TIMESHEET,
  UPDATE_TIMESHEET,
  DELETE_TIMESHEET,
  ADD_DAY,
  UPDATE_DAY,
  DELETE_DAY,
  SET_MESSAGE
} from "../actions/types";

import Timesheets from "../../services/hours";

export const getAllTimesheets = () => async dispatch => {
  try {
    const res = await Timesheets.getAllTimesheets();
    dispatch({
      type: GET_TIMESHEETS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: SET_MESSAGE,
      payload: error.message
    });
  }
};

export const getTimesheet = id => async dispatch => {
  try {
    const res = await Timesheets.getTimesheet(id);
    dispatch({
      type: GET_TIMESHEETS,
      payload: res.data
    });
  } catch (error) {
    dispatch({
      type: SET_MESSAGE,
      payload: error.message
    });
  }
};

export const addTimesheet = (data, user) => async dispatch => {
  try {
    const res = await Timesheets.addTimesheet(data, user);

    dispatch({
      type: ADD_TIMESHEET,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateTimesheet = (id, data) => async dispatch => {
  try {
    const res = await Timesheets.updateTimesheet(id, data);

    dispatch({
      type: UPDATE_TIMESHEET,
      payload: data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteTimesheet = id => async dispatch => {
  try {
    await Timesheets.deleteTimesheet(id);

    dispatch({
      type: DELETE_TIMESHEET,
      payload: { id }
    });
  } catch (err) {
    console.log(err);
  }
};

export const addDay = (id, data) => async dispatch => {
  try {
    const res = await Timesheets.addDay(id, data);

    dispatch({
      type: ADD_DAY,
      payload: res.data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const updateDay = (id, data) => async dispatch => {
  try {
    const res = await Timesheets.updateDay(id, data);

    dispatch({
      type: UPDATE_DAY,
      payload: data
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const deleteDay = id => async dispatch => {
  try {
    await Timesheets.deleteDay(id);

    dispatch({
      type: DELETE_DAY,
      payload: { id }
    });
  } catch (err) {
    console.log(err);
  }
};
