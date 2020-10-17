import React from 'react';
import MessagePanelHeader from "./message-panel-header";

import './message-panel.scss';
import { connect } from "react-redux";
import { TChannels } from "../channels-panel/channels-panel";

type TMessagePanel = {
  currentActiveChannel: TChannels
}

const MessagePanel: React.FC<TMessagePanel> = ({ currentActiveChannel }: TMessagePanel) => {

  return (
    <div className="message-panel">
      <MessagePanelHeader channelName={currentActiveChannel && currentActiveChannel.channelName} />
    </div>
  );
};

export type TCurrentChannel = {
  currentChannel: {
    currentActiveChannel: TChannels
  }
}

const mapStateToProps = ({ currentChannel: { currentActiveChannel } }: TCurrentChannel) => {
  return { currentActiveChannel }
}

export default connect(mapStateToProps)(MessagePanel);