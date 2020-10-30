import React, { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import App from "./components/app";
import Spinner from "./components/spinner";
import { Login, Register } from './components/auth';
import { auth } from "./config/firebase";

import compose from "./utils/compose";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getLogInUser, logOutUser, setCurrentChannel } from './actions';
import { TChannel } from "./types/reused-types";

import './assets/styles/bootstrap-reboot.min.scss';
import './assets/styles/fonts.scss';
import './assets/styles/transition.scss';


type TMainRoot = {
  getLogInUser: (user: any) => void
  history: any
  logOutUser: () => void
  isLoaded: boolean
  setCurrentChannel: (channel: TChannel | null) => any;
  logInUser: any
}

const MainRoot: React.FC<TMainRoot> = ({ getLogInUser, history, logOutUser, isLoaded, setCurrentChannel, logInUser }: TMainRoot) => {

  const onAuthStateChanged = useCallback(() => {
    auth.onAuthStateChanged((logInUser) => {
      if (logInUser) {
        getLogInUser(logInUser);
        history.push('/');
      } else {
        logOutUser();
        history.push('/login-page');
        setCurrentChannel(null);
      }
    });
  }, [ getLogInUser, history, logOutUser, setCurrentChannel ])

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
  currentLoggedUser: {
    isLoaded: boolean
    logInUser: any
  };
}

const mapStateToProps = ({ currentLoggedUser: { isLoaded, logInUser } }: TMapStateToProps) => {
  return { isLoaded, logInUser };
}

export default compose(
  withRouter,
  connect(mapStateToProps, { getLogInUser, logOutUser, setCurrentChannel }),
)(MainRoot)
