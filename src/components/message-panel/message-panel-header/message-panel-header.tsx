import React from 'react';

import './message-panel-header.scss';

type TMessagePanelHeader = {
  activeChannel: string
}

const MessagePanelHeader: React.FC<TMessagePanelHeader> = ({ activeChannel }: TMessagePanelHeader) => {

  return (
    <header className="message-panel-header">
      <div className="message-panel-header__channel-info">
        <h3 className="message-panel-header__title">
          {activeChannel === null
            ? 'Куда хотели бы написать?'
            : activeChannel
          }
        </h3>
      </div>
    </header>
  );
};

export default MessagePanelHeader;
