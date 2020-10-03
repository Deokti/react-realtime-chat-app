import updateCurrentLoggedUser from "./current-logged-user";
import updateCurrentControlFilter from "./current-control-filter";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  currentLoggedUser: updateCurrentLoggedUser,
  currentControlFilter: updateCurrentControlFilter
});

export default rootReducers;

