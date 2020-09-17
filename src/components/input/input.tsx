import React from "react";

import './input.scss';

type TypeInput = {
  icon: string,
  placeholder: string,
  onChange?: any,
  name: string,
  value?: string
  type: string
  className?: any,
}

const Input: React.FC<TypeInput> = ({icon, name, placeholder, onChange, value, type, className}: TypeInput) => {
  return (
    <div className={`input-template ${className}`}>
      <img src={icon} alt="icon" className="input-template__icon" />
      <input
        type={type}
        placeholder={placeholder}
        name={name}
        onChange={onChange}
        value={value}
        className="input-template__input" />
    </div>
  )
};

export default Input;
