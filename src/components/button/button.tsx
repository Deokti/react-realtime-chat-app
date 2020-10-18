import React from 'react';
import { SpinnerLoader } from '../icon';

import './button.scss';

type TButton = {
  children: string | JSX.Element
  className?: string
  loading?: boolean
  onClick?: any
  disabled?: boolean
}

const Button: React.FC<TButton> = ({ children, className = '', loading = false, onClick, disabled = false }: TButton) => {
  return <button
    className={`button ${className} ${loading ? 'button-loading' : ''}`}
    onClick={onClick}
    disabled={disabled}>
    {loading ? <SpinnerLoader /> : children}
  </button>
};

export default Button;