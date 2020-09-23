import React from "react";
import { Link } from "react-router-dom";

import './with-auth-form.scss';

const withAuthForm = () => (title: string, Wrapper: React.FC, redirect: string, to: string) => {
  return (props: any) => {
    return (
      <section className="auth">
        <div className="auth-wrapper">
          <header className="auth-header">
            <span className="auth-header__label auth-header__login">{title}</span>
          </header>

          <div className="auth-form">
            <Wrapper {...props} />
          </div>

          <Link className="auth-redirect" to={to}>{redirect}</Link>
        </div>
      </section>
    )
  }
};

export default withAuthForm;