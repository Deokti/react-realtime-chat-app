import React from "react";

import './spinner.scss';
import { SpinnerLoader } from "../icon";

type TSpinner = {
  position?: 'absolute' | 'static' | 'fixed'
  text?: string
  backgroundColor?: 'transparent' | string
}

const Spinner: React.FC<TSpinner> = ({ backgroundColor = '#16191C', position = 'fixed', text = '' }: TSpinner) => {
  return (
    <div className="spinner" style={{ position, backgroundColor }}>
      <SpinnerLoader width={100} height={100} />
      <span className="spinner-text">{text}</span>
    </div>
  )
};

export default Spinner;
