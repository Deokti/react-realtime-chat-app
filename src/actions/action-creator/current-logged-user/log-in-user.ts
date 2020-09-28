import { TYPESFORUSER } from "../../TYPES";

const getLogInUser = (user: any) => {
  return {
    type: TYPESFORUSER.LOG_IN_USER,
    payload: user
  }
}

export default getLogInUser;

