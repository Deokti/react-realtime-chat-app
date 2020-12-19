import React, { memo } from 'react';
import MessagePanelSearch from "../message-panel-search";

import './message-panel-header.scss';

type TMessagePanelHeader = {
  channelName: string | null
}

const MessagePanelHeader: React.FC<TMessagePanelHeader> = ({ channelName }: TMessagePanelHeader) => {

  return (
    <header className="message-panel-header">
      <div className="message-panel-header__channel-info">
        <h3 className="message-panel-header__title">{channelName === null ? 'Куда хотели бы написать?' : channelName}</h3>
        <span className="message-panel-header__participant">2 участника</span>
      </div>

      <div className="message-panel-header__search">
        <MessagePanelSearch />
      </div>
    </header>
  );
};

export default memo(MessagePanelHeader);
