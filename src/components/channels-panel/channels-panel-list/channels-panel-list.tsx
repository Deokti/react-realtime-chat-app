import React, { useState } from "react";

import { setActiveChannel } from '../../../actions'
import { connect } from "react-redux";

import { TCurrentChannel } from "../../message-panel/message-panel";
import { TChannel } from "../../../types/reused-types";

import './channels-panel-list.scss';
import { TSetActivetChannel } from "../../../actions/action-creator/active-channel/set-active-channel";
import { TUser } from "../../../types/redux";


type TChannelsPanelList = {
  channels: Array<TChannel>
  setActiveChannel: (channel: TChannel) => TSetActivetChannel
  activeChannel: TChannel
  user: boolean
}

const ChannelsPanelList: React.FC<TChannelsPanelList> = ({ channels, setActiveChannel, activeChannel, user }: TChannelsPanelList) => {
  const setChannelAndIdChannel = (channel: TChannel) => {
    if (activeChannel && activeChannel.id === channel.id) return false;
    setActiveChannel(channel);
  }

  const createItem = (item: TChannel & TUser, isActive: boolean) => {
    const isUser = user ? 'channels-panel-list__user' : '';

    return (
      <li className={`channels-panel-list__item ${isActive ? 'active' : ''} ${isUser}`}
        key={item.id.toString()}
        onClick={() => setChannelAndIdChannel(item)}
      >
        {user && (
          <div className={`channels-panel-list__avatar ${(isUser && item.status === 'online') ? 'online' : 'offline'}`}>
            <img src={item.avatar} alt={item.username} />
          </div>
        )}
        <div className="channels-panel-list__info">
          <span className="channels-panel-list__name">{user ? item.username : `# ${item.channelName}`}</span>
          {user && <span className="channels-panel-list__description">{isActive ? 'Вы общаетесь' : 'Написать человеку'}</span>}
        </div>
      </li>
    )
  }

  return (
    <div>
      <ul className="channels-panel-list">
        {
          channels.map((item: any) => {
            const isActive = activeChannel?.id === item.id;
            return createItem(item, isActive)
          })
        }
      </ul>
    </div>
  )
};

const mapStateToProps = ({ currentChannel: { activeChannel } }: TCurrentChannel) => {
  return { activeChannel }
}

export default connect(mapStateToProps, { setActiveChannel })(ChannelsPanelList);