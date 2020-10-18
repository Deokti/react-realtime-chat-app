import { TChannel } from "../components/channels-panel/channels-panel";
import { SET_CURRENT_CHANNEL } from '../actions/TYPES';

type TCurrentActiveChannel = {
  currentActiveChannel: TChannel | null
}

type TCurrentActiveChannelAction = {
  type: string
  payload: TChannel | null
}

const updateCurrentActiveChannel = (state: TCurrentActiveChannel, action: TCurrentActiveChannelAction): TCurrentActiveChannel => {
  if (state === undefined) {
    return {
      currentActiveChannel: null
    }
  }

  switch (action.type) {
    case SET_CURRENT_CHANNEL: {
      return {
        ...state,
        currentActiveChannel: action.payload
      }
    }

    default: { return state }
  }
};

export default updateCurrentActiveChannel;