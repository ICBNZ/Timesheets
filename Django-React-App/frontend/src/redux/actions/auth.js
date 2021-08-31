/* Auth Actions */
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAIL,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  SET_MESSAGE,
  GET_USER
} from "./types"; // get action types

import Auth from "../../services/auth"; // get axios functions
import { getUser } from "../../services/user";

export const register = (
  username,
  first_name,
  last_name,
  email,
  password
) => dispatch => {
  return Auth.register(username, first_name, last_name, email, password).then(
    response => {
      dispatch({
        type: SIGNUP_SUCCESS
      });

      dispatch({
        type: SET_MESSAGE,
        payload: response.data.message
      });

      return Promise.resolve();
    },
    error => {
      let message;
      switch (Object.keys(error.response.data)[0].toString()) {
        case "username":
          message = "Username already exists";
          break;
        case "email":
          message = "This email already exists";
          break;
        default:
          message = "Account not created, please try again";
      }

      dispatch({
        type: SIGNUP_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: message
      });

      return Promise.reject();
    }
  );
};

export const login = (username, password) => dispatch => {
  return Auth.login(username, password).then(
    data => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: { user: data }
      });

      return Promise.resolve();
    },
    error => {
      dispatch({
        type: LOGIN_FAIL
      });

      dispatch({
        type: SET_MESSAGE,
        payload: "username or password incorrect"
      });

      return Promise.reject();
    }
  );
};

export const logout = () => dispatch => {
  Auth.logout();

  dispatch({
    type: LOGOUT
  });
};

export const getUserProfile = id => dispatch => {
  return getUser(id).then(
    user => {
      dispatch({
        type: GET_USER,
        payload: user
      });

      return Promise.resolve();
    },
    error => {
      dispatch({
        type: SET_MESSAGE,
        payload: error
      });

      return Promise.reject();
    }
  );
};
