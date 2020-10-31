import React from "react";

import './spinner.scss';
import { SpinnerLoader } from "../icon";

type TSpinner = {
  position?: any
  text?: string
  backgroundColor?: string
}

const Spinner: React.FC<TSpinner> = ({ backgroundColor = '#16191C', position = 'fixed', text = 'Подождите, идёт загрузка...',  }: TSpinner) => {
  return (
    <div className="spinner" style={{ position: position, backgroundColor: backgroundColor }}>
      <SpinnerLoader width={100} height={100} />
      <span className="spinner-text">{text}</span>
    </div>
  )
};

export default Spinner;
