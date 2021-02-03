import { TUser } from "./redux"

// Поля аутентификации
export type TAuthProperty = {
  logInUser: TUser | null
  isLoaded?: boolean
}

// Тип аутентификации для получения в connect
export type TAuth = {
  auth: TAuthProperty
}

export type TAuthIsLoaded = {
  auth: {
    isLoaded: boolean
  }
}
export type TAuthLogInUser = {
  auth: {
    logInUser: TUser | null
  }
}

export type TLogInUser = {
  logInUser: TUser | null
}

// Объект фильрации с его свойствовами
export type TCurrentFilter = {
  currentFilter: {
    filterHeading: string
    filterName: string
  }
}

// Тип фильтра для получения в connect
export type TFilter = {
  filter: TCurrentFilter
}
