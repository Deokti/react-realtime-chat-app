import { TYPESFORUSER } from "../actions";

export type TypeUpdateUser = {
  logInUser: object | null
  isLoaded: boolean
}

const updateCurrentLoggedUser = (state: TypeUpdateUser, actions: any): TypeUpdateUser => {
  if (state === undefined) {
    return {
      logInUser: null,
      isLoaded: true
    }
  }

  switch (actions.type) {
    case TYPESFORUSER.LOG_IN_USER: {
      return {
        logInUser: actions.payload,
        isLoaded: false
      }
    }

    case TYPESFORUSER.LOG_OUT_USER: {
      return {
        logInUser: null,
        isLoaded: false
      }
    }

    default: { return state }
  }
}

export default updateCurrentLoggedUser;