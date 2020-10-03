import React from 'react';
import { SpinnerLoader } from '../icon';

import './button.scss';

type TButton = {
  children: string
  className?: string
  loading?: boolean
  onClick?: any
}

const Button: React.FC<TButton> = ({ children, className, loading = false, onClick }: TButton) => {
  return <button
    className={`button ${className} ${loading ? 'button-loading' : ''}`}
    onClick={onClick}>
    {loading ? <SpinnerLoader /> : children}
  </button>
};

export default Button;