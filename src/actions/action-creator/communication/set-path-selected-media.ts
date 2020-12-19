import { SET_PATH_SELECTED_MEDIA } from "../../TYPES";

const setPathSelectedMedia = (path: string) => {
  return {
    type: SET_PATH_SELECTED_MEDIA,
    payload: path
  }
};

export default setPathSelectedMedia;