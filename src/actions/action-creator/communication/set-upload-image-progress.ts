import { UPLOAD_IMAGE_PROGRESS } from "../../TYPES"

const setUploadImageProgress = (progress: number) => {
  return {
    type: UPLOAD_IMAGE_PROGRESS,
    payload: progress
  }
}

export default setUploadImageProgress;