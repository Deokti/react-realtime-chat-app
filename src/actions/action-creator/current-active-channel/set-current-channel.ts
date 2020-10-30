import { SET_CURRENT_CHANNEL } from "../../TYPES";
import { TChannel } from "../../../types/reused-types";

export type TSetCurrentChannel = {
  type: string,
  payload: TChannel
}

const setCurrentChannel = (channel: TChannel): TSetCurrentChannel => {
  return {
    type: SET_CURRENT_CHANNEL,
    payload: channel
  }
}

export default setCurrentChannel;