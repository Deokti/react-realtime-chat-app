import React, { useCallback, useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';

import App from "./components/app";
import Spinner from "./components/spinner";
import { Login, Register } from './components/auth';
import { auth } from "./config/firebase";

import compose from "./utils/compose";
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getLogInUser, logOutUser, setActiveChannel } from './actions';
import { TChannel } from "./types/reused-types";
import { routerPath } from "./config/router-path";

import './assets/styles/bootstrap-reboot.min.scss';
import './assets/styles/fonts.scss';
import './assets/styles/transition.scss';


type TMainRoot = {
  getLogInUser: (user: any) => void
  history: any
  logOutUser: () => void
  isLoaded: boolean
  setActiveChannel: (channel: TChannel | null) => any;
}

const MainRoot: React.FC<TMainRoot> = ({ getLogInUser, history, logOutUser, isLoaded, setActiveChannel }: TMainRoot) => {

  const onAuthStateChanged = useCallback(() => {
    auth.onAuthStateChanged((logInUser) => {
      if (logInUser) {
        getLogInUser(logInUser);
        history.push(routerPath.main);
      } else {
        logOutUser();
        history.push(routerPath.loginPage);
        setActiveChannel(null);
      }
    });
  }, [getLogInUser, history, logOutUser, setActiveChannel])

  useEffect(() => {
    onAuthStateChanged();
    return () => onAuthStateChanged();
  }, [onAuthStateChanged]);

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


type TMapStateToProps = {
  auth: {
    isLoaded: boolean
  };
}

const mapStateToProps = ({ auth: { isLoaded } }: TMapStateToProps) => {
  return { isLoaded };
}

export default compose(
  withRouter,
  connect(mapStateToProps, { getLogInUser, logOutUser, setActiveChannel }),
)(MainRoot)
