import auth from "./auth";
import filter from "./filter";
import currentChannel from "./current-channel";
import communication from "./communication";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  auth: auth,
  filter: filter,
  currentChannel: currentChannel,
  communication: communication
});

export default rootReducers;

