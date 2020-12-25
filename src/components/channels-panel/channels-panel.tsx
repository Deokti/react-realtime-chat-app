import React, { useCallback, useEffect, useMemo, useState } from "react";
import ChannelsPanelList from "./channels-panel-list";

import { auth, database } from "../../config/firebase";
import { TChannel, TDatabaseRef, TDatabaseSnapshot } from "../../types/reused-types";
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
const ChannelsPanel: React.FC<TChannelsPanel> = ({ currentFilter, logInUser, isUser, changeIsUser }: TChannelsPanel) => {
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
    getDataWithDatabase(logInUser && logInUser.uid)
  }, [currentFilter.filterName, getDataWithDatabase, logInUser]);

  useEffect(() => {
    const isUser = currentFilter.filterName === firebaseRef.USERS ? true : false;
    changeIsUser(isUser);
  }, [changeIsUser, currentFilter.filterName])


  const userLoggedIn = useCallback((uid: string | null) => {
    if (uid !== null) {
      connectedRef.on('value', async (snap) => {
        if (snap.val() === true) {
          console.log(snap.val() === true);

          const online = usersOnline.child(uid)
          await online.set(true);
          online
            .onDisconnect()
            .remove((error) => {
              if (error !== null) {
                console.error(`Ошибка ${error} в ChannelPanel`);
              }
            });
        } else if (snap.val() === false) {
          console.log('12312312312')
        }
      });
    }
  }, [connectedRef, usersOnline])

  // Устанавливает в базе данных какие пользователя онлайн
  const setUsersOnlineToDatabase = useCallback((uid: string | null = '') => {
    auth.onAuthStateChanged((user) => {
      if (user) userLoggedIn(uid)
    });
  }, [userLoggedIn]);

  const getUsersOnline = useCallback((userId: string | null, online: boolean) => {
    return users.reduce((acc: Array<TUser>, user: TUser) => {
      if (user.id === userId) {
        user['online'] = online ? true : false
      }
      return acc.concat(user);
    }, []);
  }, [users])

  const getStatusUserToDatabase = useCallback((userId: string | null, online: boolean) => {
    const updateUser = getUsersOnline(userId, online);
    setOnlineUsers([...updateUser])
  }, [getUsersOnline])

  // Слежение за базой данных при добавлении или удалении пользователей онлайн
  const monitorChangesInDatabase = useCallback(() => {
    usersOnline.on('child_added', ({ key }) => {
      getStatusUserToDatabase(key, true);
    });
    usersOnline.on("child_removed", ({ key }) => {
      getStatusUserToDatabase(key, false);
    });
  }, [getStatusUserToDatabase, usersOnline])

  // Проверяем находящихся в сети людей
  const onConnected = useCallback((uid: string) => {
    setUsersOnlineToDatabase(uid);
    monitorChangesInDatabase();
  }, [monitorChangesInDatabase, setUsersOnlineToDatabase]);

  // --------------------------------
  useEffect(() => {
    onConnected(logInUser && logInUser.uid);
    return () => {
      usersOnline.off();
      connectedRef.off();
    }
  }, [connectedRef, logInUser, onConnected, usersOnline])

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
