import { TUser } from "../../../types/redux";
import { LOG_IN_USER } from "../../TYPES";

const getLogInUser = (loggedIn: TUser) => {
  return {
    type: LOG_IN_USER,
    payload: loggedIn
  }
}

export default getLogInUser;

