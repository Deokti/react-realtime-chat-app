import { TYPES } from "../actions/TYPES";

export type TypeUpdateUser = {
  currentUser: object | null
  isLoaded: boolean
}

const updateCurrentUser = (state: TypeUpdateUser, actions: any): TypeUpdateUser => {
  if (state === undefined) {
    return {
      currentUser: null,
      isLoaded: true
    }
  }

  switch (actions.type) {
    case TYPES.GET_AND_SET_USER: {
      return {
        currentUser: actions.payload,
        isLoaded: false
      }
    }

    default: { return state }
  }
}

export default updateCurrentUser;
