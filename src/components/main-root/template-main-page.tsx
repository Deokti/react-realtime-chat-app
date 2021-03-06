import Spinner from "../spinner";
import { Route, Switch } from "react-router-dom";
import App from "../app";
import { Login, Register } from "../auth";
import React from "react";

type TTemplateMainPage = {
  isLoaded: boolean
}

const TemplateMainPage: React.FC<TTemplateMainPage> = ({ isLoaded }: TTemplateMainPage) => {
  return isLoaded
    ? <Spinner text="Подождите, идёт загрузка..."/>
    : (
      <Switch>
        <Route path='/' exact component={App}/>
        <Route path="/login-page" exact component={Login}/>
        <Route path="/register-page" exact component={Register}/>
      </Switch>
    )
}

export default TemplateMainPage;