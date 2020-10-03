import React from "react";
import ChannelsPanelList from "./channels-panel-list";

import './channels-panel.scss';
import { connect } from "react-redux";
import { TCurrentControlFilter } from "../../reducers/current-control-filter";

type TChannelsPanel = {
  currentFilter: {
    filterHeading: string,
    filterName: string
  }
}

const ChannelsPanel: React.FC<TChannelsPanel> = ({ currentFilter }: TChannelsPanel) => {
  const channels = [
    { id: 0, name: 'React', filter: 'channels' },
    { id: 1, name: 'JavaScript', filter: 'channels' },
    { id: 2, name: 'Backend', filter: 'channels' },
    { id: 4, name: 'Томас', filter: 'chats' },
    { id: 5, name: 'Артур', filter: 'chats' },
  ];

  function filter (channels: any, filter: string) {
    return channels.filter((item: any) => item.filter === filter);
  }


  return (
    <div className="channels-panel">
      <header className="channels-panel__header">
        <h2 className="channels-panel__heading">{ currentFilter.filterHeading }</h2>
      </header>

      <div className="channels-panel__list">
        <ChannelsPanelList channels={filter(channels, currentFilter.filterName)} />
      </div>
    </div>
  )
};

type TMapStateToProps = {
  currentControlFilter: TCurrentControlFilter
}

const mapStateToProps = ({ currentControlFilter: { currentFilter } }: TMapStateToProps) => {
  return { currentFilter }
}

export default connect(mapStateToProps)(ChannelsPanel);