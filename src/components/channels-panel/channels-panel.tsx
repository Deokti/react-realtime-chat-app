import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChannelsPanelList from "./channels-panel-list";

import { database } from "../../config/firebase";
import { TChannel, TDatabaseSnapshot } from "../../types/reused-types";
import { connect } from "react-redux";

import './channels-panel.scss';
import { TAuthUser, TCommunication, TFilter } from "../../types/redux";
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

  const [channels, setChannels] = useState<Array<any>>([]);
  const [users, setUsers] = useState<Array<any>>([]);
  const [onlineUsers, setOnlineUsers] = useState<Array<any>>([]);
  const [user, setUser] = useState(false);


  // Динамически изменяем запрос, исходя из выбранной фильтрации
  const getFilter = useCallback((logInUser: any) => {
    getChannels();
    getUsers(logInUser);
  }, [])

  // Сама функция обращения и получения данных
  const getChannels = () => {
    setChannels([]);
    const loaded: any[] = []
    database.ref(firebaseRef.CHANNELS)
      .on("child_added", (snapshot: TDatabaseSnapshot) => {
        loaded.push(snapshot.val());
        setChannels([...loaded]);
      })
  };

  const getUsers = (logInUser: any) => {
    const loaded: any[] = []

    database.ref(firebaseRef.USERS)
      .on("child_added", (snapshot: TDatabaseSnapshot) => {
        if (snapshot.key !== logInUser.uid) {
          const getUser = snapshot.val();
          getUser['status'] = 'offline';
          getUser["type"] = 'USERS';
          loaded.push(getUser);
          setUsers(loaded);
        }
      })
  }

  useEffect(() => {
    getFilter(logInUser)
  }, [currentFilter.filterName, getFilter, logInUser]);

  useEffect(() => {
    const isUser = currentFilter.filterName === firebaseRef.USERS ? true : false;
    changeIsUser(isUser);
    setUser(isUser);
  }, [changeIsUser, currentFilter.filterName])


  const changeisUserChannelsStatus = useCallback((users, id: string | null, status: boolean) => {
    const changedUserState = users.reduce((acc: any, user: any) => {
      if (user.id === id) {
        user['status'] = `${status ? 'online' : 'offline'}`
      }
      return acc.concat(user);
    }, []);

    // Проблема возникает тогда, когда 
    // в качестве массива добавить setUsers.
    setOnlineUsers([...changedUserState]);
  }, []);

  // Проверяем находящихся в сети людей
  const onConnected = useCallback((users: any, uid: string) => {
    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        const online = usersOnline.child(uid);
        online.set(true);
        online
          .onDisconnect()
          .remove((error) => error !== null && console.error(`Ошибка ${error} в ChannelPanel`));
      }
    });

    usersOnline.on('child_added', (snap) => {
      const id = snap.key;
      if (snap.key !== uid) {
        changeisUserChannelsStatus(users, id, true);
      }
    });
    usersOnline.on("child_removed", (snap) => {
      const id = snap.key;

      if (snap.key !== uid) {
        changeisUserChannelsStatus(users, id, false);
      }
    });
  }, [changeisUserChannelsStatus, connectedRef, usersOnline]);

  // --------------------------------
  useEffect(() => {
    onConnected(users, logInUser.uid);
  }, [logInUser.uid, onConnected, users])

  const filterChannels = () => isUser ? onlineUsers : channels;

  return (
    <div className="channels-panel">
      <header className="channels-panel__header">
        <h2 className="channels-panel__heading">{currentFilter.filterHeading}</h2>
      </header>

      <div className="channels-panel__list">
        <ChannelsPanelList channels={filterChannels()} user={user} />
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
