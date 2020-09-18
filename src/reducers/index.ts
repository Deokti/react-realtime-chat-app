import updateCurrentUser from "./update-current-user";

import { combineReducers } from 'redux';

const rootReducers = combineReducers({
  currentUser: updateCurrentUser,
});

export default rootReducers;

