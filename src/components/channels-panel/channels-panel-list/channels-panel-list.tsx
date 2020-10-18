import React, { useState } from "react";
import { TChannel } from "../channels-panel";

import { connect } from "react-redux";
import { setCurrentChannel } from '../../../actions'
import { TCurrentChannel } from "../../message-panel/message-panel";

import './channels-panel-list.scss';

type TChannelsPanelList = {
  channels: Array<TChannel>
  setCurrentChannel: (channel: TChannel) => any
  currentActiveChannel: TChannel
}

const ChannelsPanelList: React.FC<TChannelsPanelList> = ({ channels, setCurrentChannel, currentActiveChannel }: TChannelsPanelList) => {
  const [idCurrentChannel, setIdCurrentChannel] = useState<string>('');

  const setChannelAndIdChannel = (channel: TChannel) => {
    if (currentActiveChannel && currentActiveChannel.id === channel.id) return false;

    setCurrentChannel(channel);
    setIdCurrentChannel(channel.id);
  }

  return (
    <ul className="channels-panel-list">
      {
        channels.map((item: TChannel) => {
          const addActiveClass = idCurrentChannel === item.id ? 'active' : '';

          return (
            <li className={`channels-panel-list__item ${addActiveClass}`}
                key={item.id.toString()}
                onClick={() => setChannelAndIdChannel(item)}>
              <span className="channels-panel-list__item-label"># {item.channelName}</span>
            </li>
          );
        })
      }
    </ul>
  )
};

const mapStateToProps = ({ currentChannel: { currentActiveChannel } }: TCurrentChannel) => {
  return { currentActiveChannel }
}

export default connect(mapStateToProps, { setCurrentChannel })(ChannelsPanelList);