import React from 'react';
import ReactDOM from 'react-dom';

import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";

import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './store';

import "assets/scss/material-kit-react.scss?v=1.9.0";

import Login from './views/Login.js';
import App from './views/App.js';
var history = createBrowserHistory();

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/" exact component={App} />
      </Switch>
    </Router>,
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
