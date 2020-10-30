import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from "./store";

import MainRoot from "./main-root";

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <MainRoot />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

