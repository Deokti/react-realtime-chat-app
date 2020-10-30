import React, { useMemo } from 'react';
import MessagePanelHeader from "./message-panel-header";
import MessagePanelContents from "./message-panel-contents";
import MessagePanelForm from "./message-panel-form";

import { database } from "../../config/firebase";
import { TMapStateCurrentUser } from "../control-panel/control-panel";
import { TDatabaseRef, TChannel, TSelectedImage } from "../../types/reused-types";

import { connect } from "react-redux";
import MessagePanelModal from "./message-panel-modal";

import './message-panel.scss';

type TMessagePanel = {
  currentActiveChannel: TChannel
  logInUser: any
  selectedImage: any
}

const MessagePanel: React.FC<TMessagePanel> = ({ currentActiveChannel, logInUser, selectedImage }: TMessagePanel) => {
  const messageRef: TDatabaseRef = useMemo(() => database.ref('MESSAGES'), []);

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
      {selectedImage !== null ? <MessagePanelModal previewImage={selectedImage} /> : null}
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
                               currentChannel: { currentActiveChannel },
                               currentImage: { selectedImage }
                             }: TMapStateCurrentUser & TCurrentChannel & TSelectedImage) => {
  return { logInUser, currentActiveChannel, selectedImage }
}

export default connect(mapStateCurrentUser)(MessagePanel);
