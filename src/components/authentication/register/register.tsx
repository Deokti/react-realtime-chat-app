import React, { FormEvent, useState } from "react";

import userIcon from '../../../assets/icon/user.svg';
import mainIcon from '../../../assets/icon/mail.svg';
import passwordIcon from '../../../assets/icon/password.svg';
import passwordRepeatIcon from '../../../assets/icon/password-repeat.svg';

import { Link } from "react-router-dom";
import Input from "../../input";

import firebase from "../../../firebase";

import './register.scss';

type TypeUserRegister = {
  username: string,
  email: string,
  password: string,
  passwordRepeat: string
}

const Register: React.FC = () => {
  const [ userRegistration, setUserRegistration ] = useState<TypeUserRegister>({
    username: '',
    email: '',
    password: '',
    passwordRepeat: ''
  });
  const [ isValidFormError, setIsValidFormError ] = useState<string>('');
  const [disable, setDisable] = useState<boolean>(false);


  const onHandlerChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUserRegistration((currentState) => ({ ...currentState, [name]: value.trim() }));
  }

  const isValidEmpty = ({ username, email, password, passwordRepeat }: TypeUserRegister) => {
    return !username.trim().length || !email.trim().length || !password.trim().length || !passwordRepeat.trim().length
  }

  const isValidPassword = (password: string, passwordRepeat: string) => {
    if (password.length < 5 && passwordRepeat.length < 5) {
      setIsValidFormError('Пароль должен быть длиннее 5 символов');
      return false;
    } else if (password !== passwordRepeat) {
      setIsValidFormError('Пароли не совпадают');
      return false;
    }

    return true;
  }

  const isValidForm = () => {
    if (isValidEmpty(userRegistration)) {
      setIsValidFormError('Все поля должны быть заполнены');
      return false;
    } else if (!isValidPassword(userRegistration.password, userRegistration.passwordRepeat)) {
      return false;
    }

    return true;
  }

  const onHandlerSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isValidForm()) {
      setIsValidFormError('');
      setDisable(true);

      firebase
        .auth()
        .createUserWithEmailAndPassword(userRegistration.email, userRegistration.password)
        .then((response) => {
          console.log(response);
          setDisable(false);
        })
        .catch(error => {
          console.error(error);
          setIsValidFormError(error.message);
          setDisable(false);
        })
    }
  }

  return (
    <section className="register all-page">
      <form className='register-form' onSubmit={onHandlerSubmit}>
        <div className="register-form__header">
          <h2 className="register-form__title">Регистрация для ReactChat</h2>
        </div>

        <div className="register-form__container">
          <div className="register-form__content">
            <Input
              icon={userIcon}
              placeholder="Введите имя пользователя"
              name='username'
              type="text"
              value={userRegistration.username}
              onChange={onHandlerChange} />

            <Input
              icon={mainIcon}
              placeholder="Введите свой E-mail"
              name="email"
              type="email"
              value={userRegistration.email}
              onChange={onHandlerChange} />

            <Input
              icon={passwordIcon}
              placeholder="Придумайте пароль"
              name="password"
              type="password"
              value={userRegistration.password}
              onChange={onHandlerChange} />

            <Input
              icon={passwordRepeatIcon}
              placeholder="Повторите пароль"
              name="passwordRepeat"
              type="password"
              value={userRegistration.passwordRepeat}
              onChange={onHandlerChange} />
          </div>
          <button className="button button-register-form" disabled={disable}>Зарегистрироваться</button>
        </div>
      </form>

      {isValidFormError.length > 0 && (
        <div className="register-error">
          <p>{isValidFormError}</p>
        </div>
      )}

      <div className="register-redirect">
        <p className="register-redirect__text">
          Уже зарегистрированы? <Link to="/login-page">Войти</Link>
        </p>
      </div>
    </section>
  )
};

export default Register;

