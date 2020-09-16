import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/app';
import { Register, Login } from './components/authentication';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import * as serviceWorker from './serviceWorker';


const MainRoot: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={App} />
        <Route path="/registration-page" component={Register} />
        <Route path="/login-page" component={Login} />
      </Switch>
    </BrowserRouter>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <MainRoot />
  </React.StrictMode>,
  document.getElementById('root')
);


serviceWorker.unregister();
