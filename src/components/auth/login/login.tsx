import React, { useMemo, useState } from 'react';
import AuthInput from "../../auth-input";
import Button from '../../button';

import { withAuthForm } from "../../HOC";
import { Link } from 'react-router-dom';
import { auth } from '../../../config/firebase';
import { TWithAuthForm } from "../../HOC/with-auth-form/with-auth-form";

import './login.scss';
import '../form-redirect.scss';

type TUserLogin = {
  email: string
  password: string
}

const Login: React.FC<TWithAuthForm> = ({ loading, setLoading, hasError, setHasError }: TWithAuthForm) => {
  const initialUserLogin = useMemo<TUserLogin>(() => ({ email: '', password: '' }), [])
  const [ userLogin, setUserLogin ] = useState<TUserLogin>(initialUserLogin);

  const whenChangingText = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUserLogin((prevState: TUserLogin) => ({ ...prevState, [name]: value }))
  }

  const onFormValid = ({ email, password }: TUserLogin) => {
    if (setHasError && (!email && !password)) {
      setHasError('Все поля должны быть заполнены!')
    }
    return email && password;
  }

  const whenSubmittingForm = (event: React.FormEvent) => {
    event.preventDefault();

    if (onFormValid(userLogin)) {
      if (setLoading) setLoading(true);
      if (setHasError) setHasError('');
      auth.signInWithEmailAndPassword(userLogin.email, userLogin.password)
        .then((signInUser) => {
          console.log('signInUser:', signInUser);
        })
        .then(() => {
          if (setLoading) setLoading(false);
          setUserLogin(initialUserLogin);
        })
        .catch((error) => {
          if (setLoading) setLoading(false);
          if (setHasError) setHasError(error.message);
        })
    }
  }

  return (
    <form className="login" onSubmit={whenSubmittingForm}>
      <AuthInput label="Email" name="email" onChange={whenChangingText} value={userLogin.email} />
      <AuthInput label="Пароль" name="password" type="password" onChange={whenChangingText}
                 value={userLogin.password} />
      <Button className="button-auth-form" loading={loading}>Войти</Button>
      <Link to="/register-page" className="form-redirect">Ещё не зарегистрированы?</Link>

      {hasError && hasError.length > 0 ? <span className="form-error">{hasError}</span> : ''}
    </form>
  )
};

export default withAuthForm()('Войти', Login);