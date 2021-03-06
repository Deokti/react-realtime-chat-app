import React from 'react';
import Input from "../../input";
import Button from '../../button';

import { withAuthForm, withHandlerInput } from "../../HOC";
import { Link } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import compose from "../../../utils/compose";
import { routerPath } from "../../../config/router-path";

import './login.scss';
import '../form-redirect.scss';
import { TAuthError } from '../../../types';

type TUserLogin = {
  email: string
  password: string
}

type TLogin = {
  hasError: string
  setHasError: (error: string) => void
  loading: boolean
  setLoading: (state: boolean) => void
  input: TUserLogin
  setInput: (state: TUserLogin) => any
  onInput: (state: string) => void
}

const Login: React.FC<TLogin> = ({ loading, setLoading, hasError, setHasError, input, onInput, setInput }: TLogin) => {

  function onSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (onFormValid(input)) {
      setLoading(true);
      setHasError('');
      signInWithEmailAndPassword(input);
    }
  }

  function onFormValid({ email, password }: TUserLogin): boolean {
    if (!email && !password) {
      setHasError('Все поля должны быть заполнены!');
      return false;
    }

    return Boolean(email && password)
  }

  function signInWithEmailAndPassword({ email, password }: TUserLogin) {
    auth
      .signInWithEmailAndPassword(email, password)
      .then(onSucsess)
      .catch(onRejection)
  }

  function onSucsess() {
    setLoading(false);
    setInput({ email: '', password: '' });
  }

  function onRejection(error: TAuthError) {
    setLoading(false);
    setHasError(error.message);
  }

  return (
    <form className="login" onSubmit={onSubmit}>
      <Input
        label="Email"
        name="email"
        onChange={onInput}
        value={input.email}
      />

      <Input
        label="Пароль"
        name="password"
        type="password"
        onChange={onInput}
        value={input.password}
      />

      <Button
        className="button-auth-form"
        loading={loading}
        disabled={loading}
      >
        Войти
      </Button>
      <Link to={routerPath.registerPage} className="form-redirect">Ещё не зарегистрированы?</Link>

      {hasError && hasError.length > 0 ? <span className="form-error">{hasError}</span> : ''}
    </form>
  )
};

export default compose(
  withAuthForm('Войти'),
  withHandlerInput({ email: '', password: '' }),
)(Login);

