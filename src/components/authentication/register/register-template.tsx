import React, { FormEvent } from "react";
import Input from "../../input";

import userIcon from "../../../assets/icon/user.svg";
import mainIcon from "../../../assets/icon/mail.svg";
import passwordIcon from "../../../assets/icon/password.svg";
import passwordRepeatIcon from "../../../assets/icon/password-repeat.svg";

import { Link } from "react-router-dom";
import { TypeUserRegister } from "./register-logic";

import './register.scss';
import '../form.scss';
import AuthButton from "../auth-button";
import AuthErrorMessage from "../auth-error-message";

type TypeUserRegisterTemplate = {
  userRegistration: TypeUserRegister,
  disable: boolean
  addErrorClassForInput(validFormError: string, includes: string): string
  isValidFormError: string
  onHandlerChange(event: FormEvent<HTMLInputElement>): void
  onHandlerSubmit(event: FormEvent): void
  loading: boolean
}

const RegisterTemplate: React.FC<TypeUserRegisterTemplate> = (
  {
    onHandlerSubmit, addErrorClassForInput, isValidFormError,
    userRegistration, onHandlerChange, disable, loading
  }: TypeUserRegisterTemplate) => {
  return (
    <section className="register all-page">
      <form className='form-auth register-form' onSubmit={onHandlerSubmit}>
        <div className="form-auth__header register-form__header">
          <h2 className="form-auth__title register-form__title">Регистрация для ReactChat</h2>
        </div>

        <div className="form-auth__container register-form__container">
          <div className="register-form__content">
            <Input
              icon={userIcon}
              placeholder="Введите имя пользователя"
              name='username'
              type="text"
              className={addErrorClassForInput(isValidFormError, 'заполнены')}
              value={userRegistration.username}
              onChange={onHandlerChange} />

            <Input
              icon={mainIcon}
              placeholder="Введите свой E-mail"
              name="email"
              type="email"
              value={userRegistration.email}
              className={addErrorClassForInput(isValidFormError, 'заполнены')}
              onChange={onHandlerChange} />

            <Input
              icon={passwordIcon}
              placeholder="Придумайте пароль"
              name="password"
              type="password"
              value={userRegistration.password}
              className={`${addErrorClassForInput(isValidFormError, 'заполнены')} ${addErrorClassForInput(isValidFormError, 'парол')}`}
              onChange={onHandlerChange} />

            <Input
              icon={passwordRepeatIcon}
              placeholder="Повторите пароль"
              name="passwordRepeat"
              type="password"
              value={userRegistration.passwordRepeat}
              className={`${addErrorClassForInput(isValidFormError, 'заполнены')} ${addErrorClassForInput(isValidFormError, 'парол')}`}
              onChange={onHandlerChange} />
          </div>

          <AuthButton disable={disable} loading={loading} label="Зарегистрироваться" />
        </div>
      </form>

      {isValidFormError.length > 0 && <AuthErrorMessage message={isValidFormError} />}

      <div className="auth-redirect">
        <p className="auth-redirect__text">
          Уже зарегистрированы? <Link to="/login-page">Войти</Link>
        </p>
      </div>
    </section>
  )
}


export default RegisterTemplate;