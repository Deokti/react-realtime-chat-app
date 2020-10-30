import React from "react";
import ControlPanel from "../control-panel";
import ChannelsPanel from "../channels-panel";
import MessagePanel from "../message-panel";
import { connect } from "react-redux";

import './app.scss';
import { TSelectedImage } from "../../types/reused-types";
import MessagePanelModal from "../message-panel/message-panel-modal/message-panel-modal";

type TApp = {
  selectedImage: string | null;
}

const App: React.FC<TApp> = ({ selectedImage }: TApp) => {
  return (
    <section className="app">
      <ControlPanel />
      <ChannelsPanel />
      <MessagePanel />
      {selectedImage !== null ? <MessagePanelModal previewImage={selectedImage} /> : null}
    </section>
  )
};

const mapStateToProps = ({ currentImage: { selectedImage } }: TSelectedImage) => {
  return { selectedImage };
}

export default connect(mapStateToProps)(App);
