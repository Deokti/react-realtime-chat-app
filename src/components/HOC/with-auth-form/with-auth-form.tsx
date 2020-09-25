import React, { useState } from "react";

import './with-auth-form.scss';
import { RouteComponentProps } from "react-router-dom";

export type TWithAuthForm = {
  hasError?: string
  setHasError?: (error: string) => void
  loading?: boolean
  setLoading?: (state: boolean) => void
  history?: RouteComponentProps
  location?: RouteComponentProps
  match?: RouteComponentProps
  staticContext?: any
  children?: React.ReactNode;
}

const withAuthForm = () => (title: string, Wrapper: React.FC) => {
  return (props: TWithAuthForm) => {
    const [loading, setLoading] = useState<boolean>(false);
    const [hasError, setHasError] = useState<string>('');

    return (
      <section className="auth">
        <div className="auth-wrapper">
          <header className="auth-header">
            <span className="auth-header__label auth-header__login">{title}</span>
          </header>

          <div className="auth-form">
            <Wrapper
              hasError={hasError}
              setHasError={setHasError}
              loading={loading}
              setLoading={setLoading}
              {...props} />
          </div>
        </div>
      </section>
    )
  }
};

export default withAuthForm;