import { TYPES } from "../TYPES";

const getLogInUser = (user: any) => {
  return {
    type: TYPES.LOG_IN_USER,
    payload: user
  }
}

export default getLogInUser;

