import React from 'react';
import { Switch, Route } from 'react-router-dom';

import App from "./components/app";
import { Login, Register } from './components/auth';

import './assets/styles/bootstrap-reboot.min.scss';
import './assets/styles/fonts.scss';
import './assets/styles/transition.scss';


const MainRoot = () => {
  return (
    <Switch>
      <Route path='/' exact component={App} />
      <Route path="/login-page" exact component={Login} />
      <Route path="/register-page" exact component={Register} />
    </Switch>
  )
};

export default MainRoot;