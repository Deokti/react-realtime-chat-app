import { SET_SELECTED_IMAGE } from "../actions/TYPES";
import { TSelectedImageAction } from "../types/reused-types";

export type TCurrentSelectedImage = {
  selectedImage: string | null;
}


const updateCurrentSelectedImage = (state: TCurrentSelectedImage, action: TSelectedImageAction): TCurrentSelectedImage => {
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
