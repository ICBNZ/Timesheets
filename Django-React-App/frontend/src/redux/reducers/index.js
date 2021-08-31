/* Index - Combine Reducers **/

import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import { timesheets } from "./hours";
import userProfile from "./user";

export default combineReducers({
  auth,
  message,
  timesheets,
  userProfile
});
