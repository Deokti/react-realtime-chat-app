import { SET_CURRENT_CHANNEL } from '../actions/TYPES';
import { TCurrentActiveChannel } from '../types/redux';
import { TChannel } from "../types";

type TCurrentActiveChannelAction = {
  type: string
  payload: TChannel | null
}

const currentChannel = (state: TCurrentActiveChannel, action: TCurrentActiveChannelAction): TCurrentActiveChannel => {
  if (state === undefined) {
    return {
      activeChannel: null
    }
  }

  switch (action.type) {
    case SET_CURRENT_CHANNEL: {
      return {
        ...state,
        activeChannel: action.payload
      }
    }

    default: { return state }
  }
};

export default currentChannel;