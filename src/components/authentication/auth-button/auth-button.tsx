import React from 'react';
import spinner from "../../../assets/spinner.svg";

import './auth-button.scss';


type TypeAuthButton = {
  disable: boolean
  loading: boolean
  label: string
  style?: any
}

const AuthButton = ({ disable, loading, label, style }: TypeAuthButton) => {

  return (
    <button style={style}
            className="button button-auth-form"
            disabled={disable}>
      {loading
        ? <img src={spinner} alt="spinner" />
        : label}
    </button>
  );
};

export default AuthButton;