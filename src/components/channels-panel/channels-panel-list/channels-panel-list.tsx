import React, { useState } from "react";

import { setCurrentChannel } from '../../../actions'
import { connect } from "react-redux";

import { TCurrentChannel } from "../../message-panel/message-panel";
import { TChannel } from "../../../types/reused-types";

import './channels-panel-list.scss';
import { TSetCurrentChannel } from "../../../actions/action-creator/current-active-channel/set-current-channel";

type TChannelsPanelList = {
  channels: Array<TChannel>
  setCurrentChannel: (channel: TChannel) => TSetCurrentChannel
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