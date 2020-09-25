import { TYPES } from "../actions";

export type TypeUpdateUser = {
  logInUser: object | null
  isLoaded: boolean
}

const updateLogInUser = (state: TypeUpdateUser, actions: any): TypeUpdateUser => {
  if (state === undefined) {
    return {
      logInUser: null,
      isLoaded: true
    }
  }

  switch (actions.type) {
    case TYPES.LOG_IN_USER: {
      return {
        logInUser: actions.payload,
        isLoaded: false
      }
    }

    default: { return state }
  }
}

export default updateLogInUser;