import { TUser } from "../../../types/redux";
import { USERS_ONLINE } from "../../TYPES";

const setUsersOnline = (usersOnline: Array<TUser> | null) => {
  return {
    type: USERS_ONLINE,
    payload: usersOnline
  }
};

export default setUsersOnline;