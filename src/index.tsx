import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import MainRoot from "./main-root";

import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <BrowserRouter>
    <MainRoot />
  </BrowserRouter>,
  document.getElementById('root')
);

serviceWorker.unregister();
