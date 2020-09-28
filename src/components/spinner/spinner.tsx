import React from "react";

import './spinner.scss';
import { SpinnerLoader } from "../icon";

const Spinner = () => {
  return (
    <div className="spinner">
      <SpinnerLoader width={100} height={100} />
      <span className="spinner-text">Подождите, идёт загрузка...</span>
    </div>
  )
};

export default Spinner;