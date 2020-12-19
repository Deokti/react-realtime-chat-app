import { PREVIEW_IMAGE } from "../../TYPES"

const setPreviewImage = (url: string | null) => {
  return {
    type: PREVIEW_IMAGE,
    payload: url
  }
};

export default setPreviewImage;