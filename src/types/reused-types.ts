import firebase from "firebase";
import { History, LocationState } from 'history';

// Типы для описания firebase данных
export type TDatabaseRef = firebase.database.Reference
export type TDatabaseSnapshot = firebase.database.DataSnapshot;

// Описание того, что входит в один общий канал
export type TChannel = {
  channelCreator: {
    avatar: string
    username: string
  }
  channelName: string
  id: string
  type: string
}

// Описание того, какие данные входят в одно сообщение
export type TMessage = {
  id: string
  time: string
  messageContent: string
  fileMessageURL: string
  authorMessage: {
    username: string
    avatar: string
    id: string
    isOnline?: boolean
  }
}

// Тип для connect для получения выбранного изображения
export type TSelectedImage = {
  currentImage: { selectedImage: string | null }
}

// Тип для описания описания функции получения одной картинки при использовании mapDispatchToProps
export type TSelectedImageAction = {
  type: string
  payload: string | null
}

// history для react router
export type THistory = History<LocationState>
