import React from "react";

import './spinner.scss';
import { SpinnerLoader } from "../icon";

const Spinner = ({ position = 'fixed' }: any) => {
  return (
    <div className="spinner" style={{ position: position }}>
      <SpinnerLoader width={100} height={100} />
      <span className="spinner-text">Подождите, идёт загрузка...</span>
    </div>
  )
};

export default Spinner;