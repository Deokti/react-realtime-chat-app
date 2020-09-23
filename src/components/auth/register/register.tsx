import React, { useState } from 'react';
import AuthInput from "../../auth-input";
import { withAuthForm } from "../../HOC";

import './register.scss';

type TUserRegister = {
  username: string
  email: string
  password: string
  passwordRepeat: string
}

const Register = () => {
  const [userRegister, setUserRegister] = useState<TUserRegister>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: '',
  });

  const whenChangingText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUserRegister((prevState: TUserRegister) => ({ ...prevState, [name]: value }))
  }

  return (
    <form className="login">
      <AuthInput label="Имя пользователя" name="username" onChange={whenChangingText} value={userRegister.username} />
      <AuthInput label="Email" name="email" onChange={whenChangingText} value={userRegister.email} />
      <AuthInput label="Пароль" name="password" type="password" onChange={whenChangingText} value={userRegister.password} />
      <AuthInput label="Повторите пароль" name="passwordRepeat" type="password" onChange={whenChangingText} value={userRegister.passwordRepeat} />
      <button className="button button-auth-form">Зарегистрироваться</button>
    </form>
  )
};

export default withAuthForm()('Регистрация', Register, 'Уже зарегистрированы?', '/login-page');
