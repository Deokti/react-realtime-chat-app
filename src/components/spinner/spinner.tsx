import React from "react";

import './spinner.scss';
import '../../components/app/app.scss';

const Spinner: React.FC = () => {
  return (
    <div className="spinner-container all-page">
      <div className="spinner">
        <div className="double-bounce1" />
        <div className="double-bounce2" />
      </div>
      <p className="spinner-text">Чат загружается...</p>
    </div>
  )
};

export default Spinner