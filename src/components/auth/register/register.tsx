import React, { useMemo, useState } from 'react';
import AuthInput from "../../auth-input";
import Button from '../../button';
import isFormValid from './is-valid-form';
import md5 from 'md5';

import { withAuthForm } from "../../HOC";
import { Link } from "react-router-dom";
import { auth, database } from "../../../config/firebase";

import './register.scss';
import '../form-redirect.scss';

export type TUserRegister = {
  username: string
  email: string
  password: string
  passwordRepeat: string
}

const Register: React.FC = () => {
  const initialUserRegister = useMemo<TUserRegister>(() => ({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  }), []);

  const [userRegister, setUserRegister] = useState<TUserRegister>(initialUserRegister);
  const [registerError, setRegisterError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);

  const whenChangingText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUserRegister((prevState: TUserRegister) => ({ ...prevState, [name]: value.trim() }))
  }

  const onCreatedUserWithDatabase = (createdUser: any) => {
    return database.ref('users').child(createdUser.user.uid).set({
      username: createdUser.user.displayName,
      avatar: createdUser.user.photoURL
    });
  }

  const onCreateUserWithEmailAndPassword = () => {
    return auth
      .createUserWithEmailAndPassword(userRegister.email, userRegister.password)
      .then((createdUser: any) => {
        createdUser.user.updateProfile({
          displayName: userRegister.username,
          photoURL: `https://www.gravatar.com/avatar/${md5(createdUser.user.email)}?d=mp&f=y`
        }).then(() => onCreatedUserWithDatabase(createdUser))
      })
  }

  const whenSubmittingForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid(userRegister, setRegisterError)) {
      setLoading(true);
      setRegisterError('');
      onCreateUserWithEmailAndPassword()
        .then(() => console.log('Пользователь сохранён!'))
        .then(() => {
          setLoading(false);
          setUserRegister(initialUserRegister);
        })
        .catch((error: any) => {
          setRegisterError(error.message);
          setLoading(false);
        })
    }
  }

  return (
    <form className="login" onSubmit={whenSubmittingForm}>
      <AuthInput label="Имя пользователя" name="username" onChange={whenChangingText} value={userRegister.username} />
      <AuthInput label="Email" name="email" onChange={whenChangingText} value={userRegister.email} />
      <AuthInput label="Пароль" name="password" type="password" onChange={whenChangingText}
        value={userRegister.password} />
      <AuthInput label="Повторите пароль" name="passwordRepeat" type="password" onChange={whenChangingText}
        value={userRegister.passwordRepeat} />

      <Button className="button-auth-form" loading={loading}>Регистрация</Button>

      <Link to="/login-page" className="form-redirect">Уже зарегистрированы?</Link>

      { registerError.length > 0 ? <span className="form-error">{registerError}</span> : '' }
    </form>
  )
};

export default withAuthForm()('Регистрация', Register);
