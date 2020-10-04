import React, { useCallback, useEffect, useState } from "react";
import ChannelsPanelList from "./channels-panel-list";

import { database } from "../../config/firebase";
import { connect } from "react-redux";
import { TCurrentControlFilter } from "../../reducers/current-control-filter";

import './channels-panel.scss';

type TChannelsPanel = {
  currentFilter: {
    filterHeading: string,
    filterName: string
  }
}

export type TChannels = {
  channelCreator: {
    avatar: string
    username: string
  }
  channelName: string
  id: string
  type: string
}

const ChannelsPanel: React.FC<TChannelsPanel> = ({ currentFilter }: TChannelsPanel) => {
  const [ channels, setChannels ] = useState<Array<TChannels>>([])

  const getChannels = useCallback(() => {
    const channelRef =  database.ref("CHANNELS");

    channelRef.on("child_added", (snapshot) => {
        setChannels((prevState) => [...prevState, snapshot.val()]);
      })
  }, []);


  useEffect(() => {
    getChannels();
    return () => getChannels();
  }, [getChannels]);

  function filter (channels: any, type: string) {
    return channels.filter((item: any) => item.type === type);
  }

  return (
    <div className="channels-panel">
      <header className="channels-panel__header">
        <h2 className="channels-panel__heading">{ currentFilter.filterHeading}</h2>
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