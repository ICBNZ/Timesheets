/* Store - Application state */

import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk"; // for using async
import rootReducer from "./reducers";

const middleware = [thunk];

const store = createStore(
  rootReducer, // root reducer - combined
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
