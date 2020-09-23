import React, { useState } from 'react';
import AuthInput from "../../auth-input";
import { withAuthForm } from "../../HOC";
import { Link } from "react-router-dom";
import { auth } from "../../../config/firebase";
import md5 from 'md5';

import './register.scss';
import '../form-redirect.scss';

type TUserRegister = {
  username: string
  email: string
  password: string
  passwordRepeat: string
}

const Register: React.FC = () => {
  const [ userRegister, setUserRegister ] = useState<TUserRegister>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });
  const [ registerError, setRegisterError ] = useState<string>('');

  const whenChangingText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUserRegister((prevState: TUserRegister) => ({ ...prevState, [name]: value.trim() }))
  }

  const isFormEmpty = ({ username, email, password, passwordRepeat }: TUserRegister) => {
    return !username.trim().length
      || !email.trim().length
      || !password.trim().length
      || !passwordRepeat.trim().length
  }

  const isPasswordValid = (password: string, passwordRepeat: string) => {
    if (password.length < 6 && passwordRepeat.length < 6) {
      setRegisterError('Длина пароля должна быть больше 6 символов!');
      return false;
    } else if (password !== passwordRepeat) {
      setRegisterError('Пароли не совпадают!');
      return false;
    }

    return true;
  }

  const isFormValid = () => {
    if (isFormEmpty(userRegister)) {
      setRegisterError('Все поля должны быть заполнены!');
      return false
    } else if (!isPasswordValid(userRegister.password, userRegister.passwordRepeat)) {
      return false
    }

    return true;
  }

  const onCreateUserWithEmailAndPassword = () => {
    return auth
      .createUserWithEmailAndPassword(userRegister.email, userRegister.password)
      .then((createUser: any) => {
        createUser.user.updateProfile({
          displayName: userRegister.username,
          photoURL: `https://www.gravatar.com/avatar/${md5(createUser.user.email)}?d=mp&f=y`
        })
        return createUser;
      })
  }

  const whenSubmittingForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (isFormValid()) {
      onCreateUserWithEmailAndPassword()
        .catch((error: any) => {
          setRegisterError(error.message);
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
      <button className="button button-auth-form">Зарегистрироваться</button>
      <Link to="/login-page" className="form-redirect">Уже зарегистрированы?</Link>
    </form>
  )
};

export default withAuthForm()('Регистрация', Register);
