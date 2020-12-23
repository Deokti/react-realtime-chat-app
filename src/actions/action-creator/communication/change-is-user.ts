import { CHANGE_IS_USER } from "../../TYPES"

const changeIsUser = (isUser: boolean) => {
  return {
    type: CHANGE_IS_USER,
    payload: isUser,
  };
};

export default changeIsUser;