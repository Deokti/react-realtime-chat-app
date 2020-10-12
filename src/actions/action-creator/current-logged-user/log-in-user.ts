import { LOG_IN_USER } from "../../TYPES";

const getLogInUser = (user: any) => {
  return {
    type: LOG_IN_USER,
    payload: user
  }
}

export default getLogInUser;

