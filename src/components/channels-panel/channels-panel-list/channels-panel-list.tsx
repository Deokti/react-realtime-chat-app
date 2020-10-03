import React from "react";

import './channels-panel-list.scss';


type TChannelsPanelList = {
  channels: any
}

const ChannelsPanelList: React.FC<TChannelsPanelList> = ({ channels }: TChannelsPanelList) => {
  return (
    <ul className="channels-panel-list">
      {
        channels.map((item: any) => {
          return (
            <li className="channels-panel-list__item" key={item.id.toString()} onClick={() => console.log(item)}>
              <span className="channels-panel-list__item-label"># {item.name}</span>
            </li>
          );
        })
      }
    </ul>
  )
};

export default ChannelsPanelList;