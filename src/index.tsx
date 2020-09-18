import React from 'react';
import ReactDOM from 'react-dom';
import MainRoot from "./main-root";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store";

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainRoot />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
