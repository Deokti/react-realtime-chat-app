import { SET_CURRENT_CHANNEL } from "../../TYPES";
import { TChannel } from "../../../types";

export type TSetActivetChannel = {
  type: string,
  payload: TChannel
}

const setActiveChannel = (channel: TChannel): TSetActivetChannel => {
  return {
    type: SET_CURRENT_CHANNEL,
    payload: channel
  }
}

export default setActiveChannel;