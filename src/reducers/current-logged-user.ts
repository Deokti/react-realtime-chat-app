import { LOG_IN_USER, LOG_OUT_USER } from "../actions/TYPES";

export type TUpdateUser = {
  logInUser: object | null
  isLoaded: boolean
}

type TUpdateUserAction = {
  type: string
  payload: {
    logInUser: null | any
    isLoaded: boolean
  }
}

const updateCurrentLoggedUser = (state: TUpdateUser, action: TUpdateUserAction): TUpdateUser => {
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

export default updateCurrentLoggedUser;