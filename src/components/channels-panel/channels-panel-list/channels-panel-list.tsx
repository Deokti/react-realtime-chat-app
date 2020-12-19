import React, { useState } from "react";

import { setActiveChannel } from '../../../actions'
import { connect } from "react-redux";

import { TCurrentChannel } from "../../message-panel/message-panel";
import { TChannel } from "../../../types/reused-types";

import './channels-panel-list.scss';
import { TSetActivetChannel } from "../../../actions/action-creator/active-channel/set-active-channel";

type TChannelsPanelList = {
  channels: Array<TChannel>
  setActiveChannel: (channel: TChannel) => TSetActivetChannel
  activeChannel: TChannel
}

const ChannelsPanelList: React.FC<TChannelsPanelList> = ({ channels, setActiveChannel, activeChannel }: TChannelsPanelList) => {

  const [idCurrentChannel, setIdCurrentChannel] = useState<string>('');

  const setChannelAndIdChannel = (channel: TChannel) => {
    if (activeChannel && activeChannel.id === channel.id) return false;

    setActiveChannel(channel);
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

const mapStateToProps = ({ currentChannel: { activeChannel } }: TCurrentChannel) => {
  return { activeChannel }
}

export default connect(mapStateToProps, { setActiveChannel })(ChannelsPanelList);