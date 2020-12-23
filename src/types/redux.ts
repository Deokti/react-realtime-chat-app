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
    logInUser: object
    inLoaded: boolean
  };
}

// Тип для получения данных из Redux
export type TAuthUser = {
  logInUser: object | null
  isLoaded: boolean
}

// Тип, который описыает пользователя базы данных
export type TUser = {
  id: string,
  username: string
  avatar: string
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
  isUser: boolean,
}