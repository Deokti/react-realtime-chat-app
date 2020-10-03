import React, { useState } from 'react';

import './input.scss';

type TInput = {
  label: string
  onChange?: any
  type?: string
  name: string
  value?: string
  className?: string
}

const Input: React.FC<TInput> = ({ label, type = 'text', onChange, name, value, className }: TInput) => {
  const [emptyValue, setEmptyValue] = useState(false);
  const onCheckEmpty = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmptyValue(!!event.currentTarget.value.length);
  };

  return (
    <label className={`auth-input`}>
      <input type={type}
             className={`auth-input__write ${emptyValue ? 'auth-input__hollow' : ''} ${className}`}
             onInput={onCheckEmpty}
             name={name}
             value={value}
             onChange={onChange} />
      <span className="auth-input__description">{label}</span>
    </label>
  )
};

export default Input;

