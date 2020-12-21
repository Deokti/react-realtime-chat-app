// Тип для connect для получения текущей фильтрации отображения сообщений, личного чата, избранного
export type TFilter = {
  currentFilter: {
    filterHeading: string
    filterName: string
  }
}

// Тип пользователь аутентицикациии
export type TAuth = {
  auth: {
    logInUser: any
    inLoaded: boolean
  };
}


export type TCommunication = {
  message: string
  loading: boolean
  pasteImage: string
  pathSelectedMedia: string
  previewImage: string | null
  uploadingSelectedFile: boolean
  imageCompress: boolean
  uploadImageProgress: number | null
}