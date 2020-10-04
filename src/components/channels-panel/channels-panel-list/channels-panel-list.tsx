import React from "react";
import { TChannels } from "../channels-panel";

import './channels-panel-list.scss';


type TChannelsPanelList = {
  channels: Array<TChannels>
}

const ChannelsPanelList: React.FC<TChannelsPanelList> = ({ channels }: TChannelsPanelList) => {
  return (
    <ul className="channels-panel-list">
      {
        channels.map((item: any) => {
          return (
            <li className="channels-panel-list__item" key={item.id.toString()} onClick={() => console.log(item)}>
              <span className="channels-panel-list__item-label"># {item.channelName}</span>
            </li>
          );
        })
      }
    </ul>
  )
};

export default ChannelsPanelList;