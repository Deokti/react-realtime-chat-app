import React, { memo } from 'react';
import { connect } from 'react-redux';
import { TCurrentActiveChannel } from '../../../types/redux';
import { TCommunication, TCurrentFilter, TFilter } from '../../../types/redux-state';
import MessagePanelSearch from "../message-panel-search";

import './message-panel-header.scss';

type TMessagePanelHeader = {
  isUser: boolean
} & TCurrentFilter

const MessagePanelHeader: React.FC<TMessagePanelHeader> = ({ currentFilter, isUser }: TMessagePanelHeader) => {
  // const headerTitleName = isUser ? 

  return (
    <header className="message-panel-header">
      <div className="message-panel-header__channel-info">
        <h3 className="message-panel-header__title">{!currentFilter.filterName ? 'Куда хотели бы написать?' : 'channelName'}</h3>
        <span className="message-panel-header__participant">2 участника</span>
      </div>

      <div className="message-panel-header__search">
        <MessagePanelSearch />
      </div>
    </header>
  );
};

type TMapStateToProps = {
  communication: TCommunication
  currentChannel: TCurrentActiveChannel
} & TFilter

const mapStateToProps = ({
  filter: { currentFilter },
  communication: { isUser },
  currentChannel: { activeChannel }
}: TMapStateToProps) => {
  return { currentFilter, isUser, activeChannel }
}

export default connect(mapStateToProps)(memo(MessagePanelHeader));
