import React, { FormEvent, useMemo, useState } from 'react';
import LoginTemplate from "./login-template";

import firebase from "../../../firebase";

import './login.scss';
import '../form.scss';

export type TypeInitialUserLogin = {
  email: string
  password: string
}

const LoginLogic: React.FC = () => {
  const initialUserLogin: TypeInitialUserLogin = useMemo(() => ({
    email: '',
    password: '',
  }), []);
  const [ userLogin, setUserLogin ] = useState<TypeInitialUserLogin>(initialUserLogin);
  const [ errorLogin, setErrorLogin ] = useState<string>('');
  const [ disable, setDisable ] = useState<boolean>(false);
  const [ loading, setLoading ] = useState<boolean>(false);

  const onHandlerChange = (event: FormEvent<HTMLInputElement>) => {
    const { name, value } = event.currentTarget;
    setUserLogin((prevState) => ({ ...prevState, [name]: value }))
  };

  const isFormValid = ({ email, password }: { email: string, password: string }) => {
    if (!email && !password) {
      setErrorLogin('Все поля должны быть заполнены');
      return false
    }
    return true
  };

  const signInWithEmailAndPassword = (email: string, password: string) => {
    return firebase.auth()
      .signInWithEmailAndPassword(email, password)
      .then((signedInUser) => {
        console.log(signedInUser);
      })
  }

  const onHandlerSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (isFormValid(userLogin)) {
      setDisable(true);
      setLoading(true)
      setErrorLogin('');
      signInWithEmailAndPassword(userLogin.email, userLogin.password)
        .then(() => {
          setDisable(false);
          setLoading(false);
        })
        .catch((error) => {
          setErrorLogin(error.message);
          setDisable(false);
          setLoading(false);
        });
    }
  }

  return (
    <LoginTemplate
      userLogin={userLogin}
      onHandlerChange={onHandlerChange}
      onHandlerSubmit={onHandlerSubmit}
      errorLogin={errorLogin}
      disable={disable}
      loading={loading} />
  )
};

export default LoginLogic;