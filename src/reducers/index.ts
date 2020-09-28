import updateCurrentLoggedUser from "./current-logged-user";
import { combineReducers } from "redux";

const rootReducers = combineReducers({
  currentLoggedUser: updateCurrentLoggedUser
});

export default rootReducers;

