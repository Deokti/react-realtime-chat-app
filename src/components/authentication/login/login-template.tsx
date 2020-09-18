import React, { FormEvent } from "react";
import Input from "../../input";
import mainIcon from "../../../assets/icon/mail.svg";
import addErrorClassForInput from "../add-error-class-for-input";
import passwordIcon from "../../../assets/icon/password.svg";
import AuthButton from "../auth-button";
import AuthErrorMessage from "../auth-error-message";
import { Link } from "react-router-dom";
import { TypeInitialUserLogin } from "./login-logic";


type TypeLoginTemplate = {
  onHandlerSubmit(event: FormEvent): void
  onHandlerChange(event: FormEvent<HTMLInputElement>): void
  userLogin: TypeInitialUserLogin
  errorLogin: string
  disable: boolean
  loading: boolean
}

const LoginTemplate: React.FC<TypeLoginTemplate> = ({ userLogin, onHandlerSubmit, onHandlerChange, errorLogin, disable, loading}: TypeLoginTemplate) => {
  return (
    <section className="login all-page">
      <form className="form-auth login-form" onSubmit={onHandlerSubmit}>
        <div className="form-auth__header login-form__header">
          <h2 className="form-auth__title login-form__title">Войти в ReactChat</h2>
        </div>

        <div className="form-auth__container login-form__container">
          <div className="login-form__content">
            <Input
              icon={mainIcon}
              placeholder="Введите свой E-mail"
              name="email"
              type="email"
              value={userLogin.email}
              className={addErrorClassForInput(errorLogin, 'поля')}
              onChange={onHandlerChange} />
            <Input
              icon={passwordIcon}
              placeholder="Введите пароль"
              name="password"
              type="password"
              value={userLogin.password}
              className={`${addErrorClassForInput(errorLogin, 'поля')} ${addErrorClassForInput(errorLogin, 'password')}`}
              onChange={onHandlerChange} />
          </div>

          <AuthButton disable={disable} loading={loading} label="Войти" />
        </div>
      </form>

      { errorLogin.length > 0 && <AuthErrorMessage message={errorLogin} />}

      <div className="auth-redirect">
        <p className="auth-redirect__text">
          Ещё не зарегистрированы? <Link to="/registration-page">Регистрация</Link>
        </p>
      </div>
    </section>
  );
}

export default LoginTemplate;