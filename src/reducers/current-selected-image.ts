import { SET_SELECTED_IMAGE } from "../actions/TYPES";

export type TCurrentSelectedImage = {
  selectedImage: string | null;
}


type TAction = {
  type: string
  payload: string | null
}


const updateCurrentSelectedImage = (state: TCurrentSelectedImage, action: TAction): TCurrentSelectedImage => {
  if (state === undefined) {
    return {
      selectedImage: null,
    }
  }

  switch (action.type) {
    case SET_SELECTED_IMAGE: {
      return {
        ...state,
        selectedImage: action.payload
      };
    }

    default: { return state }
  }
}

export default updateCurrentSelectedImage;
