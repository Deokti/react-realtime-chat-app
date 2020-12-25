import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChannelsPanelList from "./channels-panel-list";

import { database } from "../../config/firebase";
import { TChannel, TDatabaseSnapshot } from "../../types/reused-types";
import { connect } from "react-redux";

import './channels-panel.scss';
import { TAuthUser, TCommunication, TFilter, TUser } from "../../types/redux";
import { firebaseRef } from "../../config/ref";
import { changeIsUser } from '../../actions';

type TChannelsPanel = {
  currentFilter: {
    filterHeading: string,
    filterName: string
  }
  logInUser: any
  changeIsUser: (isUser: boolean) => any;
  isUser: boolean
}

// 1. Сколько раз я переключаюсь, столько раз создаются копии
const ChannelsPanel: React.FC<TChannelsPanel> = ({ currentFilter, logInUser, isUser, changeIsUser }: TChannelsPanel): JSX.Element => {
  // Определение состояния подключения (https://firebase.google.com/docs/database/web/offline-capabilities#section-connection-state) 
  const connectedRef = useMemo(() => database.ref('.info/connected'), []);
  const usersOnline = useMemo(() => database.ref('online'), [])

  const [channels, setChannels] = useState<Array<TChannel>>([]);
  const [users, setUsers] = useState<Array<TUser>>([]);
  const [onlineUsers, setOnlineUsers] = useState<Array<TUser>>([]);

  // Динамически изменяем запрос, исходя из выбранной фильтрации
  const getDataWithDatabase = useCallback((logInUser: any) => {
    getChannels();
    getUsers(logInUser);
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

  const getUsers = (logInUser: any) => {
    const loaded: Array<TUser> = []

    database.ref(firebaseRef.USERS)
      .on("child_added", (snapshot: TDatabaseSnapshot) => {
        if (snapshot.key !== logInUser.uid) {
          const getUser = snapshot.val();
          getUser['status'] = 'offline';
          getUser["type"] = 'USERS';
          loaded.push(getUser);
          setOnlineUsers([...loaded]);
        }
      })
  }

  useEffect(() => {
    getDataWithDatabase(logInUser)
  }, [currentFilter.filterName, getDataWithDatabase, logInUser]);

  useEffect(() => {
    const isUser = currentFilter.filterName === firebaseRef.USERS ? true : false;
    changeIsUser(isUser);
  }, [changeIsUser, currentFilter.filterName])


  // Устанавливает в базе данных какие пользователя онлайн
  const setUsersOnlineToDatabase = useCallback((uid: string) => {
    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        const online = usersOnline.child(uid);
        online.set(true);
        online
          .onDisconnect()
          .remove((error) => error !== null && console.error(`Ошибка ${error} в ChannelPanel`));
      }
    });
  }, [connectedRef, usersOnline]);


  const getStatusUserToDatabase = useCallback((userId: string | null, connected: boolean) => {
    const updateUser = onlineUsers.reduce((acc: any, user: any) => {
      if (user.id === userId) {
        user['status'] = `${connected ? 'online' : 'offline'}`
      }
      return acc.concat(user);
    }, []);

    console.log(updateUser);

    // setOnlineUsers([]);

  }, [onlineUsers])

  // Слежение за базой данных при добавлении или удалении пользователей онлайн
  const monitorChangesInDatabase = useCallback((uid: string) => {
    usersOnline.on('child_added', (snap) => {
      const id = snap.key;
      if (snap.key !== uid) {
        getStatusUserToDatabase(id, true);
      }
    });
    usersOnline.on("child_removed", (snap) => {
      const id = snap.key;

      if (snap.key !== uid) {
        getStatusUserToDatabase(id, false);
      }
    });
  }, [getStatusUserToDatabase, usersOnline])

  // Проверяем находящихся в сети людей
  const onConnected = useCallback((onlineUsers: Array<TUser>, uid: string) => {
    setUsersOnlineToDatabase(uid);
    monitorChangesInDatabase(uid);
  }, [monitorChangesInDatabase, setUsersOnlineToDatabase]);

  // --------------------------------
  useEffect(() => {
    onConnected(onlineUsers, logInUser.uid);
  }, [logInUser.uid, onConnected, onlineUsers])

  const showItems = () => isUser ? onlineUsers : channels;

  return (
    <div className="channels-panel">
      <header className="channels-panel__header">
        <h2 className="channels-panel__heading">{currentFilter.filterHeading}</h2>
      </header>

      <div className="channels-panel__list">
        <ChannelsPanelList items={showItems()} isUser={isUser} />
      </div>
    </div>
  )
};

type TMapStateToProps = {
  filter: TFilter
  auth: TAuthUser
  communication: TCommunication
}

const mapStateToProps = ({ filter: { currentFilter }, auth: { logInUser }, communication: { isUser } }: TMapStateToProps) => {
  return { currentFilter, logInUser, isUser }
}

export default connect(mapStateToProps, { changeIsUser })(ChannelsPanel);
