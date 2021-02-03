import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChannelsPanelList from "./channels-panel-list";

import { auth, database } from "../../config/firebase";
import { TChannel, TDatabaseSnapshot } from "../../types/reused-types";
import { connect } from "react-redux";

import { TCommunication, TUser } from "../../types/redux";

import { firebaseRef } from "../../config/ref";
import { changeIsUser, setUsersOnline } from '../../actions';

import { TAuth, TCurrentFilter, TFilter } from "../../types/redux-state";

import './channels-panel.scss';

type TChannelsPanel = {
  logInUser: TUser | null
  changeIsUser: (isUser: boolean) => any;
  isUser: boolean
  setUsersOnline: (onlineUsers: Array<TUser> | null) => any
  usersOnline: Array<TUser> | null
} & TCurrentFilter

const ChannelsPanel: React.FC<TChannelsPanel> = (
  { currentFilter, logInUser, isUser, changeIsUser, usersOnline, setUsersOnline }: TChannelsPanel): JSX.Element => {

  // Определение состояния подключения (https://firebase.google.com/docs/database/web/offline-capabilities#section-connection-state) 
  const connectedRef = useMemo(() => database.ref('.info/connected'), []);
  const onlineUserRef = useMemo(() => database.ref('online'), [])

  const [channels, setChannels] = useState<Array<TChannel>>([]);
  const [users, setUsers] = useState<Array<TUser>>([]);

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

  const getUsers = (uid: string) => {
    const loaded: Array<TUser> = []

    database.ref(firebaseRef.USERS)
      .on("child_added", (snapshot: TDatabaseSnapshot) => {
        if (snapshot.key !== uid) {
          const getUser = snapshot.val();
          getUser['online'] = false;
          loaded.push(getUser);
          setUsers([...loaded]);
        }
      })
  }

  useEffect(() => {
    getDataWithDatabase(logInUser && logInUser.id)
  }, [currentFilter.filterName, getDataWithDatabase, logInUser]);

  useEffect(() => {
    const isUser = currentFilter.filterName === firebaseRef.USERS ? true : false;
    changeIsUser(isUser);
  }, [changeIsUser, currentFilter.filterName])


  const setOnlineUserIdToDatabase = useCallback(async (uid: string) => {
    const online = onlineUserRef.child(uid)

    await online.set(true);
    online
      .onDisconnect()
      .remove((error) => {
        if (error !== null) {
          console.error(`Ошибка ${error} в ChannelPanel`);
        }
      });
  }, [onlineUserRef]);


  const userLoggedIn = useCallback((uid: string | null) => {
    if (uid !== null) {
      connectedRef.on('value', async (snap) => {
        if (snap.val() === true) {
          setOnlineUserIdToDatabase(uid);
        }
      });
    }
  }, [connectedRef, setOnlineUserIdToDatabase])

  // Устанавливает в базе данных какие пользователя онлайн
  const setUsersOnlineToDatabase = useCallback((uid: string | null = '') => {

    auth.onAuthStateChanged((user) => {
      if (user) userLoggedIn(uid)
    });
  }, [userLoggedIn]);

  const getUsersOnline = useCallback((userId: string | null, online: boolean) => {
    return users.reduce((acc: Array<TUser>, user: TUser) => {

      if (user.id === userId) {
        user['isOnline'] = online ? true : false
      }

      return acc.concat(user);
    }, []);
  }, [users])

  const getStatusUserToDatabase = useCallback((userId: string | null, online: boolean) => {
    const updateUser = getUsersOnline(userId, online);
    setUsersOnline([...updateUser])
  }, [getUsersOnline, setUsersOnline])

  // Слежение за базой данных при добавлении или удалении пользователей онлайн
  const monitorChangesInDatabase = useCallback(() => {
    onlineUserRef.on('child_added', ({ key }) => {
      getStatusUserToDatabase(key, true);
    });
    onlineUserRef.on("child_removed", ({ key }) => {
      getStatusUserToDatabase(key, false);
    });
  }, [getStatusUserToDatabase, onlineUserRef])

  // Проверяем находящихся в сети людей
  const onConnected = useCallback((uid: string) => {
    setUsersOnlineToDatabase(uid);
    monitorChangesInDatabase();
  }, [monitorChangesInDatabase, setUsersOnlineToDatabase]);

  // --------------------------------
  useEffect(() => {
    onConnected((logInUser && logInUser.id) as string);
    return () => {
      onlineUserRef.off();
      connectedRef.off();
    }
  }, [connectedRef, logInUser, onConnected, onlineUserRef])

  const showItems = () => isUser ? usersOnline : channels;

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
  communication: TCommunication
} & TAuth

const mapStateToProps = ({
  filter: { currentFilter },
  auth: { logInUser },
  communication: { isUser, usersOnline }
}: TMapStateToProps & TFilter) => {
  return { currentFilter, logInUser, isUser, usersOnline }
}

export default connect(mapStateToProps, { changeIsUser, setUsersOnline })(ChannelsPanel);
