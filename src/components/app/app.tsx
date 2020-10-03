import React from "react";
import ControlPanel from "../control-panel";
import ChannelsPanel from "../channels-panel";

import './app.scss';

const App = () => {
  return (
    <section className="app">
      <ControlPanel />
      <ChannelsPanel />
    </section>
  )
};

export default App;