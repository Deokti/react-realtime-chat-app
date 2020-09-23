import React, { useState } from 'react';

import './auth-input.scss';

type TAuthInput = {
  label: string
  onChange?: any
  type?: string
  name: string
  value: string
}

const AuthInput: React.FC<TAuthInput> = ({ label, type = 'text', onChange, name, value }: TAuthInput) => {
  const [emptyValue, setEmptyValue] = useState(false);
  const onCheckEmpty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmptyValue(!!event.currentTarget.value.length);
  };

  return (
    <label className="auth-input">
      <input type={type}
             className={`auth-input__write ${emptyValue ? 'auth-input__hollow' : ''}`}
             onInput={onCheckEmpty}
             name={name}
             value={value}
             onChange={onChange} />
      <span className="auth-input__description">{label}</span>
    </label>
  )
};

export default AuthInput;

