import React, { useCallback, useEffect, useState } from "react";
import ChannelsPanelList from "./channels-panel-list";

import { database } from "../../config/firebase";
import { TChannel, TDatabaseSnapshot } from "../../types/reused-types";
import { connect } from "react-redux";

import './channels-panel.scss';
import { TAuthUser, TFilter } from "../../types/redux";
import { firebaseRef } from "../../config/ref";
import { changeIsUser } from '../../actions';

type TChannelsPanel = {
  currentFilter: {
    filterHeading: string,
    filterName: string
  }
  logInUser: any
  changeIsUser: (isUser: boolean) => any;
}

const ChannelsPanel: React.FC<TChannelsPanel> = ({ currentFilter, logInUser, changeIsUser }: TChannelsPanel): JSX.Element => {
  const [channels, setChannels] = useState<Array<TChannel>>([]);
  const [user, setUser] = useState(false);

  const getFilter = useCallback((filter: string, logInUser: any) => {
    getChannels(filter, logInUser);
  }, [])

  const getChannels = (filter: string, logInUser: any) => {
    setChannels([]);
    database.ref(filter)
      .on("child_added", (snapshot: TDatabaseSnapshot) => {
        if (snapshot.key !== logInUser.uid) {
          setChannels((prevState) => [...prevState, snapshot.val()]);
        }
      })
  };


  useEffect(() => {
    getFilter(currentFilter.filterName, logInUser)
  }, [currentFilter.filterName, getFilter, logInUser]);

  useEffect(() => {
    const isUser = currentFilter.filterName === firebaseRef.USERS ? true : false;
    changeIsUser(isUser);
    setUser(isUser);
  }, [changeIsUser, currentFilter.filterName])

  return (
    <div className="channels-panel">
      <header className="channels-panel__header">
        <h2 className="channels-panel__heading">{currentFilter.filterHeading}</h2>
      </header>

      <div className="channels-panel__list">
        <ChannelsPanelList channels={channels} user={user} />
      </div>
    </div>
  )
};

type TMapStateToProps = {
  filter: TFilter
  auth: TAuthUser
}

const mapStateToProps = ({ filter: { currentFilter }, auth: { logInUser } }: TMapStateToProps) => {
  return { currentFilter, logInUser }
}

export default connect(mapStateToProps, { changeIsUser })(ChannelsPanel);
