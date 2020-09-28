import React, { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import App from "./components/app";
import { Login, Register } from './components/auth';
import { auth } from "./config/firebase";

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getLogInUser, logOutUser } from './actions';
import compose from "./utils/compose";
import Spinner from "./components/spinner";

import './assets/styles/bootstrap-reboot.min.scss';
import './assets/styles/fonts.scss';
import './assets/styles/transition.scss';


type TMainRoot = {
  getLogInUser: (user: any) => void
  history: any
  logOutUser: () => void
  isLoaded: boolean
}

const MainRoot: React.FC<TMainRoot> = ({ getLogInUser, history, logOutUser, isLoaded }: TMainRoot) => {

  const onAuthStateChanged = useCallback(() => {
    auth.onAuthStateChanged((logInUser) => {
      console.log("MAIN-ROOT:", logInUser);
      if (logInUser) {
        getLogInUser(logInUser);
        history.push('/');
      } else {
        logOutUser();
        history.push('/login-page');
      }
    });
  }, [ getLogInUser, history, logOutUser ])

  useEffect(() => {
    onAuthStateChanged();
    return () => onAuthStateChanged();
  }, [ onAuthStateChanged ]);

  return isLoaded
    ? <Spinner />
    : (
      <Switch>
        <Route path='/' exact component={App} />
        <Route path="/login-page" exact component={Login} />
        <Route path="/register-page" exact component={Register} />
      </Switch>
    )
};


type TMapStateToProps = {
  currentLoggedUser: { isLoaded: boolean };
}

const mapStateToProps = ({ currentLoggedUser: { isLoaded } }: TMapStateToProps) => {
  return { isLoaded };
}

export default compose(
  withRouter,
  connect(mapStateToProps, { getLogInUser, logOutUser }),
)(MainRoot)
