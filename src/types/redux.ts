import { TChannel } from "./reused-types"

// Тип пользователь аутентицикациии


export type TCurrentActiveChannel = {
  activeChannel: TChannel | null
}



// Тип, который описыает пользователя базы данных
export type TUser = {
  id: string,
  username: string
  avatar: string
  isOnline?: true | false
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
  usersOnline: null | Array<TUser>
}