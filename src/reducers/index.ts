import updateLogInUser from "./log-in-user";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  logInUser: updateLogInUser
});

export default rootReducers;

