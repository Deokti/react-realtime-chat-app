import { SENDING_MESSAGE } from "../../TYPES";

const sendingMessage = (load: boolean) => {
  return {
    type: SENDING_MESSAGE,
    payload: load
  }
};

export default sendingMessage;