import React, { useCallback, useEffect } from 'react';
import { Switch, Route, RouteProps } from 'react-router-dom';

import App from "./components/app";
import { Login, Register } from './components/auth';
import { auth } from "./config/firebase";

import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { getLogInUser } from './actions';
import compose from "./utils/compose";

import './assets/styles/bootstrap-reboot.min.scss';
import './assets/styles/fonts.scss';
import './assets/styles/transition.scss';


type TMainRoot = {
  getLogInUser: (user: any) => void
  history: any
}

const MainRoot: React.FC<TMainRoot> = ({ getLogInUser, history }: TMainRoot) => {
  
  const onAuthStateChanged = useCallback(() => {
    auth.onAuthStateChanged((logInUser) => {
      console.log(logInUser);

      if (logInUser) {
        getLogInUser(logInUser);
        history.push('/');
      }
    });
  }, [getLogInUser, history])
  
  useEffect(() => {
    onAuthStateChanged();
    return () => {
      console.log('onAuthStateChanged in MainRoot DELETE')
      onAuthStateChanged();
    }
  }, [onAuthStateChanged]);

  return (
    <Switch>
      <Route path='/' exact component={App} />
      <Route path="/login-page" exact component={Login} />
      <Route path="/register-page" exact component={Register} />
    </Switch>
  )
};

export default compose(
  withRouter,
  connect(null, { getLogInUser }),
)(MainRoot)
