import React, { useMemo, useState } from 'react';
import MessagePanelHeader from "./message-panel-header";
import MessagePanelContents from "./message-panel-contents";
import MessagePanelForm from "./message-panel-form";

import { database } from "../../config/firebase";
import { TDatabaseRef, TChannel } from "../../types";

import { connect } from "react-redux";

import { TUser } from '../../types/redux';
import { TAuth, TCommunication } from '../../types/redux-state';

import './message-panel.scss';

type TMessagePanel = {
  activeChannel: any
  logInUser: TUser | null
  isUser: boolean
}

const MessagePanel: React.FC<TMessagePanel> = ({ activeChannel, logInUser, isUser }: TMessagePanel) => {
  const messageRef: TDatabaseRef = useMemo(() => database.ref('MESSAGES'), []);
  const [scrollEndPage, setScrollEndPage] = useState<boolean>(false);

  return (
    <div className="message-panel">
      <MessagePanelHeader />

      <MessagePanelContents
        key={activeChannel && activeChannel.id}
        activeChannel={activeChannel}
        logInUser={logInUser}
        messageRef={messageRef}
        scrollEndPage={scrollEndPage}
        setScrollEndPage={setScrollEndPage}
      />
      {activeChannel && (
        <MessagePanelForm
          key={logInUser && logInUser.id}
          activeChannel={activeChannel}
          logInUser={logInUser}
          messageRef={messageRef}
          setScrollEndPage={setScrollEndPage}
        />
      )}
    </div>
  );
};

type TMapState = {
  currentChannel: {
    activeChannel: TChannel
  }
  communication: TCommunication
}

const mapStateCurrentUser = ({
  auth: { logInUser },
  currentChannel: { activeChannel },
  communication: { isUser }
}: TAuth & TMapState) => {
  return { logInUser, activeChannel, isUser }
}

export default connect(mapStateCurrentUser)(MessagePanel);
