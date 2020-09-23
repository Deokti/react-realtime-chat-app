import React, { useState } from 'react';
import AuthInput from "../../auth-input";
import { withAuthForm } from "../../HOC";

import '../auth.scss';
import './login.scss';

type TUserLogin = {
  email: string
  password: string
}

const Login = () => {
  const [userLogin, setUserLogin] = useState<TUserLogin>({ email: '', password: '' });

  const whenChangingText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUserLogin((prevState: TUserLogin) => ({ ...prevState, [name]: value }))
  }

  return (
    <form className="login">
      <AuthInput label="Email" name="email" onChange={whenChangingText} value={userLogin.email} />
      <AuthInput label="Пароль" name="password" type="password" onChange={whenChangingText} value={userLogin.password} />
      <button className="button button-auth-form">Войти</button>
    </form>
  )
};

export default withAuthForm()('Войти', Login, 'Ещё не зарегистрированы?', '/register-page');