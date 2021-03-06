import { TChannel } from "."

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
