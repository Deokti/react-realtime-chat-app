import React, { FormEvent, useState, useMemo } from "react";
import RegisterTemplate from "./register-template";

import firebase from "../../../firebase";
import md5 from "md5";
import isValidForm from "./is-valid-form";
import addErrorClassForInput from "../add-error-class-for-input";

export type TypeUserRegister = {
  username: string,
  email: string,
  password: string,
  passwordRepeat: string
  usersDatabase: any
}

const RegisterLogic: React.FC<TypeUserRegister> = () => {
  const initialUserRegistration = useMemo(() => ({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
    usersDatabase: firebase.database().ref('users')
  }), []);

  const [ userRegistration, setUserRegistration ] = useState<TypeUserRegister>(initialUserRegistration);
  const [ isValidFormError, setIsValidFormError ] = useState<string>('');
  const [ disable, setDisable ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);

  const onHandlerChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUserRegistration((currentState) => ({ ...currentState, [name]: value.trim() }));
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
    if (isValidForm(userRegistration, setIsValidFormError)) {
      setIsValidFormError('');
      setDisable(true);
      setLoading(true);

      createUserWithEmailAndPassword(firebase)
        .then(() => console.log('Пользователь сохранен!'))
        .then(() => {
          setLoading(false);
          setDisable(false);
          setUserRegistration(initialUserRegistration);
        })
        .catch((error: { message: React.SetStateAction<string>; }) => {
          console.error(error);
          setIsValidFormError(error.message);
          setDisable(false);
          setLoading(false);
        })
    }
  }

  return (
    <RegisterTemplate
      onHandlerSubmit={onHandlerSubmit}
      addErrorClassForInput={addErrorClassForInput}
      isValidFormError={isValidFormError}
      userRegistration={userRegistration}
      onHandlerChange={onHandlerChange}
      disable={disable}
      loading={loading}/>
  )
}

export default RegisterLogic;

