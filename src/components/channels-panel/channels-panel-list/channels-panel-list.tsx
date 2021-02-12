import React from "react";

import { setActiveChannel } from '../../../actions'
import { connect } from "react-redux";

import { TChannel } from "../../../types/reused-types";

import './channels-panel-list.scss';
import { TSetActivetChannel } from "../../../actions/action-creator/active-channel/set-active-channel";
import { TUser } from "../../../types/redux";


type TChannelsPanelList = {
  items: Array<TChannel | TUser> | null
  setActiveChannel: (channel: TChannel) => TSetActivetChannel
  activeChannel: TChannel | null
  isUser: boolean
}

const ChannelsPanelList: React.FC<TChannelsPanelList> = ({ items, setActiveChannel, activeChannel, isUser }: TChannelsPanelList) => {
  const setChannelAndIdChannel = (channel: TChannel) => {
    if (activeChannel && activeChannel.id === channel.id) return false;
    setActiveChannel(channel);
  }

  const createItem = (item: TChannel & TUser, isActive: boolean) => {

    return (
      <li className={`channels-panel-list__item ${isActive ? 'active' : ''} ${isUser ? 'channels-panel-list__user' : ''}`}
        key={item.id}
        onClick={() => setChannelAndIdChannel(item)}
      >
        {isUser && (
          <div className={`channels-panel-list__avatar ${(isUser && item.isOnline) ? 'online' : 'offline'}`}>

            <img src={item.avatar} alt={item.username} />
          </div>
        )}
        <div className="channels-panel-list__info">
          <span className="channels-panel-list__name">{isUser ? item.username : `# ${item.channelName}`}</span>
          {isUser && <span className="channels-panel-list__description">{isActive ? 'Вы общаетесь' : 'Написать человеку'}</span>}
        </div>
      </li>
    )
  }

  return (
    <div>
      <ul className="channels-panel-list">
        {
          items && items.map((item: any) => {
            const isActive = activeChannel?.id === item.id;
            return createItem(item, isActive)
          })
        }
      </ul>
    </div>
  )
};

type TMapState = {
  currentChannel: {
    activeChannel: TChannel | null
  }
}

const mapStateToProps = ({ currentChannel: { activeChannel } }: TMapState) => {
  return { activeChannel }
}

export default connect(mapStateToProps, { setActiveChannel })(ChannelsPanelList);