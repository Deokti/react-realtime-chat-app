import React, { useState } from 'react';
import AuthInput from "../../auth-input";
import Button from '../../button';
import { withAuthForm } from "../../HOC";
import { Link } from 'react-router-dom';

import './login.scss';
import '../form-redirect.scss';

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
      <Button className="button-auth-form">Войти</Button>
      <Link to="/register-page" className="form-redirect">Ещё не зарегистрированы?</Link>
    </form>
  )
};

export default withAuthForm()('Войти', Login);