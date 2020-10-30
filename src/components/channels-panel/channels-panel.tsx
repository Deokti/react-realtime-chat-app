import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChannelsPanelList from "./channels-panel-list";

import { database } from "../../config/firebase";
import { TChannel, TDatabaseRef, TDatabaseSnapshot, TCurrentControlFilter } from "../../types/reused-types";
import { connect } from "react-redux";

import './channels-panel.scss';

type TChannelsPanel = {
  currentFilter: {
    filterHeading: string,
    filterName: string
  }
}

const ChannelsPanel: React.FC<TChannelsPanel> = ({ currentFilter }: TChannelsPanel) => {
  const [ channels, setChannels ] = useState<Array<TChannel>>([]);
  const channelRef: TDatabaseRef = useMemo(() => database.ref("CHANNELS"), []);

  const getChannels = useCallback(() => {
    channelRef.on("child_added", (snapshot: TDatabaseSnapshot) => {
        setChannels((prevState) => [...prevState, snapshot.val()]);
      })
  }, [channelRef]);


  useEffect(() => {
    getChannels();
    return () => {
      getChannels();
      channelRef.off();
    };
  }, [channelRef, getChannels]);

  function filter (channels: Array<TChannel>, type: string) {
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
