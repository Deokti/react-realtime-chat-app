/**
 * В компоненте содержится логика проверки 
 * на какую сттаницу пересылать пользователя. 
 * Если он не авторизован, перевести на страницу логина 
 * Если авторизован, то получить данные пользоваетля из базы данных,
 * сохранить данные и перебросить пользователя на главную страницу 
 */

import React, { useEffect } from 'react'
import { Switch, Route } from 'react-router-dom';

import App from "./components/app";
import Spinner from "./components/spinner";
import { Login, Register } from './components/auth';
import { auth, database } from "./config/firebase";

import compose from "./utils/compose";
import { withRouter } from 'react-router-dom';

import { connect } from "react-redux";
import { getLogInUser, logOutUser, setActiveChannel } from './actions';
import { TChannel, THistory } from "./types/reused-types";
import { routerPath } from "./config/router-path";

import { TAuthIsLoaded } from './types/redux-state';

import { firebaseRef } from './config/ref';
import { TUser } from './types/redux';

import './assets/styles/bootstrap-reboot.min.scss';
import './assets/styles/fonts.scss';
import './assets/styles/transition.scss';


type TMainRoot = {
  getLogInUser: (user: TUser) => void
  history: THistory
  logOutUser: () => void
  isLoaded: boolean
  setActiveChannel: (channel: TChannel | null) => any;
}

const MainRoot: React.FC<TMainRoot> = ({ getLogInUser, history, logOutUser, isLoaded, setActiveChannel }: TMainRoot) => {

  useEffect(onAuthStateChanged, [onAuthStateChanged]);

  function onAuthStateChanged() {
    auth.onAuthStateChanged((logInUser) => {
      if (logInUser) {
        getUserFromDatabaseByUid(logInUser && logInUser.uid);
        return false;
      }

      else {
        isLoggedOut();
      }
    });
  }

  function getUserFromDatabaseByUid(uid: string) {
    database.ref(firebaseRef.USERS)
      .child(uid)
      .on('value', (snap) => {
        const user: TUser = snap.val();
        isLoggedIn(user);
      })
  }

  function isLoggedIn(user: TUser) {
    getLogInUser(user);
    pushPathToHistory(routerPath.main);
  }

  function isLoggedOut() {
    logOutUser();
    pushPathToHistory(routerPath.loginPage);
    setActiveChannel(null);
  }

  function pushPathToHistory(path: string) {
    if (history.location.pathname !== path) {
      history.push(path);
    }
  }

  return isLoaded
    ? <Spinner text="Подождите, идёт загрузка..." />
    : (
      <Switch>
        <Route path='/' exact component={App} />
        <Route path="/login-page" exact component={Login} />
        <Route path="/register-page" exact component={Register} />
      </Switch>
    )
};


const mapStateToProps = ({ auth: { isLoaded } }: TAuthIsLoaded) => {
  return { isLoaded };
}

export default compose(
  withRouter,
  connect(mapStateToProps, { getLogInUser, logOutUser, setActiveChannel }),
)(MainRoot)
