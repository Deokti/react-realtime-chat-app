import React from 'react';
import Input from "../../input";
import Button from '../../button';

import { withAuthForm, withHandlerInput } from "../../HOC";
import { Link } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import compose from "../../../utils/compose";

import './login.scss';
import '../form-redirect.scss';

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
  whenChangingInput: (state: string) => void
}

const Login: React.FC<TLogin> = ({ loading, setLoading, hasError, setHasError, input, whenChangingInput, setInput }: TLogin) => {
  const onFormValid = ({ email, password }: TUserLogin) => {
    if (setHasError && (!email && !password)) {
      setHasError('Все поля должны быть заполнены!')
    }
    return email && password;
  }

  const whenSubmittingForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (onFormValid(input)) {
      setLoading(true);
      setHasError('');
      auth.signInWithEmailAndPassword(input.email, input.password)
        .then((signInUser) => console.log('Пользователь вошёл в систему:', signInUser))
        .then(() => {
          setLoading(false);
          setInput({ email: '', password: '' });
        })
        .catch((error) => {
          setLoading(false);
          setHasError(error.message);
        })
    }
  }

  return (
    <form className="login" onSubmit={whenSubmittingForm}>
      <Input label="Email" name="email" onChange={whenChangingInput} value={input.email} />
      <Input label="Пароль" name="password" type="password" onChange={whenChangingInput}
             value={input.password} />
      <Button className="button-auth-form" loading={loading} disabled={loading}>Войти</Button>
      <Link to="/register-page" className="form-redirect">Ещё не зарегистрированы?</Link>

      {hasError && hasError.length > 0 ? <span className="form-error">{hasError}</span> : ''}
    </form>
  )
};

export default compose(
  withAuthForm('Войти'),
  withHandlerInput({ email: '', password: '' })
)(Login);

