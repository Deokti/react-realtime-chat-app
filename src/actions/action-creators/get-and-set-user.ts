import { TYPES } from "../TYPES";

const getAndSetUser = (user: any) => {
  return {
    type: TYPES.GET_AND_SET_USER,
    payload: user
  }
}

export default getAndSetUser