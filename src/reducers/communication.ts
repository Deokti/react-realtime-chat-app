import { CHANGE_IMAGE_COMPRESS, CHANGE_MESSAGE, PASTE_IMAGE, PREVIEW_IMAGE, SENDING_MESSAGE, SET_PATH_SELECTED_MEDIA, UPLOAD_IMAGE_PROGRESS } from "../actions/TYPES";
import { TCommunication } from "../types/redux";


const communication = (state: TCommunication, action: any): TCommunication => {
  if (state === undefined) {
    return {
      message: '',
      loading: false,
      pathSelectedMedia: '',
      previewImage: null,
      pasteImage: '',
      uploadingSelectedFile: false,
      imageCompress: false,
      uploadImageProgress: null
    }
  }

  switch (action.type) {
    case CHANGE_MESSAGE: {
      return {
        ...state,
        message: action.payload
      };
    }

    case SENDING_MESSAGE: {
      return {
        ...state,
        loading: action.payload
      }
    }

    case SET_PATH_SELECTED_MEDIA: {
      return {
        ...state,
        pathSelectedMedia: action.payload
      }
    }

    case PASTE_IMAGE: {
      return {
        ...state,
        pasteImage: action.payload
      }
    }

    case PREVIEW_IMAGE: {
      return {
        ...state,
        previewImage: action.payload
      }
    }

    case CHANGE_IMAGE_COMPRESS: {
      return {
        ...state,
        imageCompress: action.payload
      }
    }

    case UPLOAD_IMAGE_PROGRESS: {
      return {
        ...state,
        uploadImageProgress: action.payload
      }
    }

    default: { return state; }
  }
}

export default communication;