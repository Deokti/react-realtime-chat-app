import { TUserRegister } from "./register";

const isFormEmpty = ({ username, email, password, passwordRepeat }: TUserRegister) => {
  return !username.trim().length
    || !email.trim().length
    || !password.trim().length
    || !passwordRepeat.trim().length
}

const isPasswordValid = (password: string, passwordRepeat: string, setRegisterError: any) => {
  if (password.length < 6 && passwordRepeat.length < 6) {
    setRegisterError('Длина пароля должна быть больше 6 символов!');
  } else if (password !== passwordRepeat) {
    setRegisterError('Пароли не совпадают!');
  }

  return true;
}

const isFormValid = (userRegister: TUserRegister, setRegisterError: any) => {
  if (isFormEmpty(userRegister)) {
    setRegisterError('Все поля должны быть заполнены!');
  } else if (!isPasswordValid(userRegister.password, userRegister.passwordRepeat, setRegisterError)) {
    return false
  }

  return true;
}

export default isFormValid;