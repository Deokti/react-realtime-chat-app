import { SET_SELECTED_IMAGE } from "../../TYPES";

const currentSelectedImage = (selectedImage: string | null) => {
  return {
    type: SET_SELECTED_IMAGE,
    payload: selectedImage
  }
};

export default currentSelectedImage;
