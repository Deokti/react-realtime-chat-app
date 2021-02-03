import React, { useCallback } from 'react';
import Input from "../../input";
import Button from '../../button';
import isFormValid from './is-valid-form';
import md5 from 'md5';

import { withAuthForm, withHandlerInput } from "../../HOC";
import { Link } from "react-router-dom";
import { auth, database } from "../../../config/firebase";
import compose from "../../../utils/compose";

import { routerPath } from "../../../config/router-path";
import { firebaseRef } from '../../../config/ref';

import './register.scss';
import '../form-redirect.scss';

export type TUserRegister = {
  username: string
  email: string
  password: string
  passwordRepeat: string
}

type TRegisterForm = {
  hasError: string
  setHasError: (error: string) => void
  loading: boolean
  setLoading: (state: boolean) => void
  input: TUserRegister
  setInput: (state: TUserRegister) => any
  whenChangingInput: (state: string) => void
}

const Register: React.FC<TRegisterForm> = ({ loading, setLoading, hasError, setHasError, input, setInput, whenChangingInput }: TRegisterForm) => {
  const onCreatedUserInDatabase = useCallback((createdUser) => {
    return database.ref(firebaseRef.USERS).child(createdUser.user.uid).set({
      uid: createdUser.user.uid,
      username: createdUser.user.displayName,
      avatar: createdUser.user.photoURL,
      isOnline: false
    });
  }, [])
  // firebase.auth.UserCredential
  const onCreateUserWithEmailAndPassword = useCallback(() => {
    return auth
      .createUserWithEmailAndPassword(input.email, input.password)
      .then((createdUser: any) => {
        createdUser.user.updateProfile({
          displayName: input.username,
          photoURL: `http://gravatar.com/avatar/${md5(createdUser.user.email)}?d=identicon`
        }).then(() => onCreatedUserInDatabase(createdUser))
      })
  }, [input, onCreatedUserInDatabase])

  const whenSubmittingForm = useCallback((event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid(input, setHasError)) {
      setLoading(true);
      setHasError('');

      onCreateUserWithEmailAndPassword()
        .then(() => console.log('Пользователь сохранён!'))
        .then(() => {
          setLoading(false);
          setInput({
            username: '',
            email: '',
            password: '',
            passwordRepeat: '',
          });
        })
        .catch((error) => {
          setHasError(error.message);
          setLoading(false);
        })
    }
  }, [input, onCreateUserWithEmailAndPassword, setHasError, setInput, setLoading])

  return (
    <form className="login" onSubmit={whenSubmittingForm}>
      <Input label="Имя пользователя" name="username" onChange={whenChangingInput} value={input.username} />
      <Input label="Email" name="email" onChange={whenChangingInput} type="email" value={input.email} />
      <Input label="Пароль" name="password" type="password" onChange={whenChangingInput}
        value={input.password} />
      <Input label="Повторите пароль" name="passwordRepeat" type="password" onChange={whenChangingInput}
        value={input.passwordRepeat} />

      <Button className="button-auth-form" loading={loading}>Регистрация</Button>

      <Link to={routerPath.loginPage} className="form-redirect">Уже зарегистрированы?</Link>

      {hasError && hasError.length > 0 ? <span className="form-error">{hasError}</span> : ''}
    </form>
  )
};

export default compose(
  withAuthForm('Регистрация'),
  withHandlerInput({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  })
)(Register)

