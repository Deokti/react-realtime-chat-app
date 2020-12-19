import { CHANGE_MESSAGE } from "../../TYPES"

const changeMessage = (message: string) => {
  return {
    type: CHANGE_MESSAGE,
    payload: message
  }
};

export default changeMessage;