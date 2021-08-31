import { GET_USER } from "../actions/types";
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {};

export default function userProfile(state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_USER:
      return {
        ...state,
        user: payload
      };
    default:
      return state;
  }
}
