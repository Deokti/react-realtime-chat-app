import React, { FormEvent, useState } from "react";
import RegisterTemplate from "./register-template";

import firebase from "../../../firebase";
import md5 from "md5";

export type TypeUserRegister = {
  username: string,
  email: string,
  password: string,
  passwordRepeat: string
  usersDatabase: any
}

const RegisterLogic: React.FC<TypeUserRegister> = () => {
  const [ userRegistration, setUserRegistration ] = useState<TypeUserRegister>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    usersDatabase: firebase.database().ref('users')
  });
  const [ isValidFormError, setIsValidFormError ] = useState<string>('');
  const [ disable, setDisable ] = useState<boolean>(false);

  const onHandlerChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUserRegistration((currentState) => ({ ...currentState, [name]: value.trim() }));
  }

  // Проверяем форму на пустоту
  const isValidEmpty = ({ username, email, password, passwordRepeat }: TypeUserRegister) => {
    return !username.trim().length || !email.trim().length || !password.trim().length || !passwordRepeat.trim().length
  }

  // Проверяем пароль на соблюдение некоторых правил
  const isValidPassword = (password: string, passwordRepeat: string) => {
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
  const isValidForm = () => {
    if (isValidEmpty(userRegistration)) {
      setIsValidFormError('Все поля должны быть заполнены');
      return false;
    } else if (!isValidPassword(userRegistration.password, userRegistration.passwordRepeat)) {
      return false;
    }

    return true;
  }

  const saveUserInRealtimeDatabase = (createdUser: any) => {
    return setUserRegistration((prevState) => ({
      ...prevState,
      usersDatabase: prevState.usersDatabase.child(createdUser.user.uid).set({
        name: createdUser.user.displayName,
        avatar: createdUser.user.photoURL
      })
    }))
  }

  const createUserWithEmailAndPassword = (firebase: any) => {
    return firebase.auth()
      .createUserWithEmailAndPassword(userRegistration.email, userRegistration.password)
      .then((createdUser: any) => {
        // Устанавливаем имя пользователя и его фотографию, которая шифруется с помощью md5
        createdUser.user?.updateProfile({
          displayName: userRegistration.username,
          photoURL: `https://www.gravatar.com/avatar/${md5(createdUser.user?.email!)}?d=mp&f=y`
        }).then(() => saveUserInRealtimeDatabase(createdUser))
      })
  }

  // Отправляем данные в Firebase, устанавливаем имя пользователя (displayName)
  // и его фотографию photoURL, после чего сохраняем данные
  const onHandlerSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isValidForm()) {
      setIsValidFormError('');
      setDisable(true);
      createUserWithEmailAndPassword(firebase)
        .then(() => console.log('Пользователь сохранен!'))
        .then(() => setDisable(false))
        .catch((error: { message: React.SetStateAction<string>; }) => {
          console.error(error);
          setIsValidFormError(error.message);
          setDisable(false);
        })
    }
  }

  const addErrorClassForInput = (validFormError: string, includes: string) => {
    return validFormError.toLowerCase().includes(includes) ? 'input-error' : '';
  }

  return (
    <RegisterTemplate
      onHandlerSubmit={onHandlerSubmit}
      addErrorClassForInput={addErrorClassForInput}
      isValidFormError={isValidFormError}
      userRegistration={userRegistration}
      onHandlerChange={onHandlerChange}
      disable={disable} />
  )
}

export default RegisterLogic;

