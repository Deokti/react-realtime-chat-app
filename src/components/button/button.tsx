import React from 'react';
import { SpinnerLoader } from '../icon';

import './button.scss';

type TButton = {
  children: string
  className?: string
  loading?: boolean
}

const Button: React.FC<TButton> = ({ children, className, loading = false }: TButton) => {
  return <button className={`button ${className} ${loading ? 'button-loading' : ''}`}>
    {loading ? <SpinnerLoader /> : children}
  </button>
};

export default Button;