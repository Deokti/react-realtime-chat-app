import React from 'react';
import Input from "../../input";

import mainIcon from "../../../assets/icon/mail.svg";
import passwordIcon from "../../../assets/icon/password.svg";

import { Link } from "react-router-dom";

import './login.scss';
import '../form.scss';

const Login: React.FC = () => {
  return (
    <section className="login all-page">
      <form className="form-auth login-form">
        <div className="form-auth__header login-form__header">
          <h2 className="form-auth__title login-form__title">Войти в ReactChat</h2>
        </div>

        <div className="form-auth__container login-form__container">
          <div className="login-form__content">
            <Input icon={mainIcon} placeholder="Введите свой E-mail" name="email" type="email" />
            <Input icon={passwordIcon} placeholder="Введите пароль" name="password" type="password" />
          </div>
          <button className="button button-auth-form">Войти</button>
        </div>
      </form>

      <div className="auth-redirect">
        <p className="auth-redirect__text">
          Ещё не зарегистрированы? <Link to="/registration-page">Регистрация</Link>
        </p>
      </div>
    </section>
  )
};

export default Login;