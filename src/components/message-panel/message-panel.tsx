import React, { useMemo } from 'react';
import MessagePanelHeader from "./message-panel-header";
import MessagePanelContents from "./message-panel-contents";
import MessagePanelForm from "./message-panel-form";

import { TChannel } from "../channels-panel/channels-panel";
import { connect } from "react-redux";

import './message-panel.scss';
import { TMapStateCurrentUser } from "../control-panel/control-panel";
import { database } from "../../config/firebase";

type TMessagePanel = {
  currentActiveChannel: TChannel
  logInUser: any
}

const MessagePanel: React.FC<TMessagePanel> = ({ currentActiveChannel, logInUser }: TMessagePanel) => {
  const messageRef = useMemo(() => database.ref('MESSAGES'), []);

  return (
    <div className="message-panel">
      <MessagePanelHeader channelName={currentActiveChannel && currentActiveChannel.channelName} />
      <MessagePanelContents
        key={currentActiveChannel && currentActiveChannel.id}
        currentActiveChannel={currentActiveChannel}
        logInUser={logInUser}
        messageRef={messageRef}
      />
      {currentActiveChannel && (
        <MessagePanelForm
          key={logInUser && logInUser.uid}
          currentActiveChannel={currentActiveChannel}
          logInUser={logInUser}
          messageRef={messageRef}
        />
      )}
    </div>
  );
};

export type TCurrentChannel = {
  currentChannel: {
    currentActiveChannel: TChannel
  }
}

const mapStateCurrentUser = ({
                               currentLoggedUser: { logInUser },
                               currentChannel: { currentActiveChannel }
                             }: TMapStateCurrentUser & TCurrentChannel) => {
  return { logInUser, currentActiveChannel }
}

export default connect(mapStateCurrentUser)(MessagePanel);