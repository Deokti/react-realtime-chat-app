import React from 'react';
import AuthInput from "../../auth-input";
import Button from '../../button';
import isFormValid from './is-valid-form';
import md5 from 'md5';

import { withAuthForm, withHandlerInput } from "../../HOC";
import { Link } from "react-router-dom";
import { auth, database } from "../../../config/firebase";
import compose from "../../../utils/compose";

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
  const onCreatedUserInDatabase = (createdUser: any) => {
    return database.ref('users').child(createdUser.user.uid).set({
      username: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  }

  const onCreateUserWithEmailAndPassword = () => {
    return auth
      .createUserWithEmailAndPassword(input.email, input.password)
      .then((createdUser: any) => {
        createdUser.user.updateProfile({
          displayName: input.username,
          photoURL: `https://www.gravatar.com/avatar/${md5(createdUser.user.email)}?d=mp&f=y`
        }).then(() => onCreatedUserInDatabase(createdUser))
      })
  }

  const whenSubmittingForm = (event: React.FormEvent) => {
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
        .catch((error: any) => {
          setHasError(error.message);
          setLoading(false);
        })
    }
  }

  return (
    <form className="login" onSubmit={whenSubmittingForm}>
      <AuthInput label="Имя пользователя" name="username" onChange={whenChangingInput} value={input.username} />
      <AuthInput label="Email" name="email" onChange={whenChangingInput} value={input.email} />
      <AuthInput label="Пароль" name="password" type="password" onChange={whenChangingInput}
                 value={input.password} />
      <AuthInput label="Повторите пароль" name="passwordRepeat" type="password" onChange={whenChangingInput}
                 value={input.passwordRepeat} />

      <Button className="button-auth-form" loading={loading}>Регистрация</Button>

      <Link to="/login-page" className="form-redirect">Уже зарегистрированы?</Link>

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

