import { TypeUserRegister } from "./register-logic";

// Проверяем форму на пустоту
const isValidEmpty = ({ username, email, password, passwordRepeat }: TypeUserRegister) => {
  return !username.trim().length || !email.trim().length || !password.trim().length || !passwordRepeat.trim().length
}

// Проверяем пароль на соблюдение некоторых правил
const isValidPassword = (password: string, passwordRepeat: string, setIsValidFormError: any) => {
  if (password.length < 6 && passwordRepeat.length < 6) {
    setIsValidFormError('Пароль должен быть длиннее 6 символов');
    return false;
  } else if (password !== passwordRepeat) {
    setIsValidFormError('Пароли не совпадают');
    return false;
  }

  return true;
}

// Валидируем форму, вызвав ранее созданные функции для валидации
const isValidForm = (userRegistration: TypeUserRegister, setIsValidFormError: any) => {
  const { password, passwordRepeat} = userRegistration;

  if (isValidEmpty(userRegistration)) {
    setIsValidFormError('Все поля должны быть заполнены');
    return false;
  } else if (!isValidPassword(password, passwordRepeat, setIsValidFormError)) {
    return false;
  }

  return true;
}

export default isValidForm;