import { TChannels } from "../components/channels-panel/channels-panel";
import { SET_CURRENT_CHANNEL } from '../actions/TYPES';

type TCurrentActiveChannel = {
  currentActiveChannel: TChannels | null
}

type TCurrentActiveChannelAction = {
  type: string
  payload: TChannels | null
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