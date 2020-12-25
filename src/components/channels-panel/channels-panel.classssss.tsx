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

class ChannelsPanel extends React.Component<TChannelsPanel, any> {
  state = {
    user: this.props.logInUser,
    users: [],
    usersRef: database.ref('USERS'),
    connectedRef: database.ref('.info/connected'),
    presenceRef: database.ref('presence'),
  }

  onStatusToUser = (userId: any, connected: any) => {
    const { users } = this.state;
    const updateUser = users.reduce((acc: any, user: any) => {
      if (user.uid === userId) {
        user['status'] = `${connected ? 'online' : 'offline'}`
      }
      return acc.concat(user);
    }, []);
    this.setState({ users: updateUser });
  }

  onConnected = (uid: any) => {
    const { connectedRef, presenceRef } = this.state;

    connectedRef.on('value', (snap) => {
      if (snap.val() === true) {
        // Если мы в сети, то в /presence записывает true под идентификатором
        const ref = presenceRef.child(uid)
        ref.set(true)
        ref
          .onDisconnect()
          .remove((error) => error !== null && console.error(error));
      }
    })

    presenceRef.on('child_added', (snap) => {
      if (uid !== snap.key) {
        this.onStatusToUser(snap.key, true);
      }
    });

    presenceRef.on('child_removed', (snap) => {

      if (uid !== snap.key) {
        this.onStatusToUser(snap.key, false);
      }
    });
  }

  // Получаем данные от Firebase с пользователями
  addListeners = (uid: any) => {
    const { usersRef } = this.state;
    const loadedUsers: any[] = [];
    usersRef.on('child_added', (snapshop) => {
      const user = snapshop.val();
      user["uid"] = snapshop.key;
      user["status"] = 'offline';
      loadedUsers.push(user);
      this.setState({ users: loadedUsers });
    });

    this.onConnected(uid);
  }

  componentDidMount() {
    const { user } = this.state;
    if (user) {
      this.addListeners(user.uid);

    }
  }

  render() {

    return (
      <div className="channels-panel">
        <header className="channels-panel__header">
          <h2 className="channels-panel__heading">{this.props.currentFilter.filterHeading}</h2>
        </header>

        <div className="channels-panel__list">
          <ChannelsPanelList items={this.state.users} isUser={true} />
        </div>
      </div>
    )
  }
}


type TMapStateToProps = {
  filter: TFilter
  auth: TAuthUser
  communication: TCommunication
}

const mapStateToProps = ({ filter: { currentFilter }, auth: { logInUser }, communication: { isUser } }: TMapStateToProps) => {
  return { currentFilter, logInUser, isUser }
}

export default connect(mapStateToProps, { changeIsUser })(ChannelsPanel);
