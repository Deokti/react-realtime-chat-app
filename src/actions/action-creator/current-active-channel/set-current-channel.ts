import { TChannel } from "../../../components/channels-panel/channels-panel";
import { SET_CURRENT_CHANNEL } from "../../TYPES";

const setCurrentChannel = (channel: TChannel) => {
  return {
    type: SET_CURRENT_CHANNEL,
    payload: channel
  }
}

export default setCurrentChannel;