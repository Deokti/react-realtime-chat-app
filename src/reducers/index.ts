import auth from "./auth";
import currentChannel from "./current-channel";
import communication from "./communication";

import { combineReducers } from "redux";

const rootReducers = combineReducers({
  auth: auth,
  currentChannel: currentChannel,
  communication: communication
});

export default rootReducers;

