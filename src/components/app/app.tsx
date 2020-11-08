import React, { memo } from "react";


import ControlPanel from "../control-panel";
import ChannelsPanel from "../channels-panel";
import MessagePanel from "../message-panel";

import './app.scss';


const App: React.FC = () => {
  return (
    <section className="app">
      <ControlPanel />
      <ChannelsPanel />
      <MessagePanel />
    </section>
  )
};

export default memo(App);
