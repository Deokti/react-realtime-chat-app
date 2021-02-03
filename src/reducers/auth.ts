import { LOG_IN_USER, LOG_OUT_USER } from "../actions/TYPES";
import { TAuthAction } from "../types/redux-action";
import { TAuth, TAuthProperty } from "../types/redux-state";

const auth = (state: TAuthProperty, action: TAuthAction): TAuthProperty => {
  if (state === undefined) {
    return {
      logInUser: null,
      isLoaded: true
    }
  }

  switch (action.type) {
    case LOG_IN_USER: {
      return {
        logInUser: action.payload,
        isLoaded: false
      }
    }

    case LOG_OUT_USER: {
      return {
        logInUser: null,
        isLoaded: false
      }
    }

    default: { return state }
  }
}

export default auth;