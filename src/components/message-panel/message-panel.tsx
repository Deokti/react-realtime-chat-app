import React, { useMemo, useState } from 'react';
import MessagePanelHeader from "./message-panel-header";
import MessagePanelContents from "./message-panel-contents";
import MessagePanelForm from "./message-panel-form";

import { database } from "../../config/firebase";
import { TMapStateCurrentUser } from "../control-panel/control-panel";
import { TDatabaseRef, TChannel } from "../../types/reused-types";

import { connect } from "react-redux";

import './message-panel.scss';

type TMessagePanel = {
  currentActiveChannel: TChannel
  logInUser: any
}

const MessagePanel: React.FC<TMessagePanel> = ({ currentActiveChannel, logInUser }: TMessagePanel) => {
  const messageRef: TDatabaseRef = useMemo(() => database.ref('MESSAGES'), []);
  const [scrollEndPage, setScrollEndPage] = useState<boolean>(false);

  return (
    <div className="message-panel">
      <MessagePanelHeader channelName={currentActiveChannel && currentActiveChannel.channelName} />
      <MessagePanelContents
        key={currentActiveChannel && currentActiveChannel.id}
        currentActiveChannel={currentActiveChannel}
        logInUser={logInUser}
        messageRef={messageRef}
        scrollEndPage={scrollEndPage}
        setScrollEndPage={setScrollEndPage}
      />
      {currentActiveChannel && (
        <MessagePanelForm
          key={logInUser && logInUser.uid}
          currentActiveChannel={currentActiveChannel}
          logInUser={logInUser}
          messageRef={messageRef}
          setScrollEndPage={setScrollEndPage}
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
  currentChannel: { currentActiveChannel },
}: TMapStateCurrentUser & TCurrentChannel) => {
  return { logInUser, currentActiveChannel }
}

export default connect(mapStateCurrentUser)(MessagePanel);
