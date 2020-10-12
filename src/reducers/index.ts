import updateCurrentLoggedUser from "./current-logged-user";
import updateCurrentControlFilter from "./current-control-filter";
import updateCurrentActiveChannel from "./current-active-channel";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  currentLoggedUser: updateCurrentLoggedUser,
  currentControlFilter: updateCurrentControlFilter,
  currentChannel: updateCurrentActiveChannel
});

export default rootReducers;

