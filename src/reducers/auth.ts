import { LOG_IN_USER, LOG_OUT_USER } from "../actions/TYPES";
import { TAuthUser } from "../types/redux";

type TUpdateUserAction = {
  type: string
  payload: {
    logInUser: null | any
    isLoaded: boolean
  }
}

const auth = (state: TAuthUser, action: TUpdateUserAction): TAuthUser => {
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