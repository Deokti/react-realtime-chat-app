import { CHANGE_IMAGE_COMPRESS } from "../../TYPES";

const changeImageCompress = (state: boolean) => {
  return {
    type: CHANGE_IMAGE_COMPRESS,
    payload: state
  }
};

export default changeImageCompress;