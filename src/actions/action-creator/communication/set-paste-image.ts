import { PASTE_IMAGE } from "../../TYPES";

const setPasteImage = (url: string) => {
  return {
    type: PASTE_IMAGE,
    payload: url
  }
};

export default setPasteImage;