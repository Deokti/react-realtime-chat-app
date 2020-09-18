import React from 'react';

import './auth-error-message.scss';

const AuthErrorMessage = ({ message }: { message: string }) => {
  return (
    <div className="auth-error-message">
      <p>{message}</p>
    </div>
  )
}

export default AuthErrorMessage;

