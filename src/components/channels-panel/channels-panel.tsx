import React, { useCallback, useEffect, useState } from "react";
import ChannelsPanelList from "./channels-panel-list";

import { database } from "../../config/firebase";
import { TChannel, TDatabaseSnapshot } from "../../types";
import { connect } from "react-redux";

import { TUser } from "../../types/redux";

import { firebaseRef } from "../../config/ref";
import { changeIsUser, setUsersOnline } from '../../actions';

import { TAuth, TCommunication, TFilter } from "../../types/redux-state";

import './channels-panel.scss';

type TChannelsPanel = {
  logInUser: TUser | null
  changeIsUser: (isUser: boolean) => any;
  isUser: boolean
  setUsersOnline: (onlineUsers: Array<TUser> | null) => any
  usersOnline: Array<TUser> | null
}

const ChannelsPanel: React.FC<TChannelsPanel> = (
  { logInUser, isUser, changeIsUser, usersOnline, setUsersOnline }: TChannelsPanel): JSX.Element => {

  // Определение состояния подключения (https://firebase.google.com/docs/database/web/offline-capabilities#section-connection-state) 
  const [channels, setChannels] = useState<Array<TChannel>>([]);

  // Динамически изменяем запрос, исходя из выбранной фильтрации
  const getDataWithDatabase = useCallback((logInUser: any) => {
    getChannels();
  }, [])

  // Сама функция обращения и получения данных
  const getChannels = () => {
    setChannels([]);
    const loaded: Array<TChannel> = []
    database.ref(firebaseRef.CHANNELS)
      .on("child_added", (snapshot: TDatabaseSnapshot) => {
        loaded.push(snapshot.val());
        setChannels([...loaded]);
      })
  };

  useEffect(() => {
    getDataWithDatabase(logInUser && logInUser.id)
  }, [getDataWithDatabase, logInUser]);

  return (
    <div className="channels-panel">
      <header className="channels-panel__header">
        <h2 className="channels-panel__heading">Чат-каналы</h2>
      </header>

      <div className="channels-panel__list">
        <ChannelsPanelList items={channels} />
      </div>
    </div>
  )
};

type TMapStateToProps = {
  communication: TCommunication
} & TAuth

const mapStateToProps = ({ filter,
  auth: { logInUser },
  communication: { isUser, usersOnline }
}: TMapStateToProps & TFilter) => {
  return { filter, logInUser, isUser, usersOnline }
}

export default connect(mapStateToProps, { changeIsUser, setUsersOnline })(ChannelsPanel);
