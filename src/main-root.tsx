import React, { useEffect } from "react";
import { Route, Switch, withRouter } from "react-router-dom";
import App from "./components/app";
import { LoginLogic, RegisterLogic } from "./components/authentication";

import { connect } from "react-redux";
import { getAndSetUser } from './actions';

import Spinner from "./components/spinner";

import firebase from "./firebase";


type TypeMainRoot = {
  getAndSetUser(currentUser: any): void
  history: any
  isLoaded: boolean
  location: any
  match: any
}

const MainRoot: React.FC<TypeMainRoot> = (props ) => {
  const { history, isLoaded, getAndSetUser } = props;

  useEffect(() => {
    firebase.auth()
      .onAuthStateChanged((currentUser) => {
        if (currentUser) {
          getAndSetUser(currentUser);
          // Для того, чтобы убрать ошибку, которая возникает при регистрации и отправке на главную
          setTimeout(() => history.push('/'), 400);
        } else {
          history.push('/login-page');
        }
      })
  }, [getAndSetUser, history]);

  return (
      <Switch>
        <Route path="/login-page" component={LoginLogic} />
        <Route path="/registration-page" component={RegisterLogic} />
        { isLoaded
            ? <Spinner />
            : <Route path="/" exact component={App} />
        }
      </Switch>
    )
}

type TypMapStateMainRoot = {
  currentUser: {
    isLoaded: boolean
  }
}

const mapStateToProps = ({ currentUser: { isLoaded } }: TypMapStateMainRoot) => {
 return { isLoaded }
}

export default connect(mapStateToProps, { getAndSetUser })(withRouter(MainRoot));
