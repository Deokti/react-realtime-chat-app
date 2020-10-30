import firebase from "firebase";

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
  authorMessage: {
    username: string
    avatar: string
    id: string
  }
}

// Тип для connect для получения текущей фильтрации отображения сообщений, личного чата, избранного
export type TCurrentControlFilter = {
  currentFilter: {
    filterHeading: string
    filterName: string
  }
}

// Тип для connect для получения выбранного изображения
export type TSelectedImage = {
  currentImage: { selectedImage: string | null }
}
