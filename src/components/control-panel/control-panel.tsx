import React, { useCallback, useState } from 'react';
import { Logo } from "../icon";
import ControlPanelAvatar from "./control-panel-avatar";
import ControlPanelMenu from "./control-panel-menu";
import ControlPanelModal from "./control-panel-modal";
import ControlPanelFilter from "./control-panel-filter";
import { connect } from "react-redux";
import { TAuthLogInUser, TLogInUser } from '../../types/redux-state';

import './control-panel.scss';
import { TUser } from '../../types/redux';


const ControlPanel: React.FC<TLogInUser> = ({ logInUser }: TLogInUser) => {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);

  const openMenu = useCallback(() => setShowMenu(true), []);
  const closeMenu = useCallback(() => setShowMenu(false), []);

  const openModal = useCallback(() => setShowModal(true), []);
  const closeModal = useCallback(() => setShowModal(false), []);

  return (
    <div className="control-panel">
      <header className="control-panel__header" title="Приложение ReactChat">
        <Logo pointerEvents={'none'} />
      </header>

      <div className="control-panel__avatar">
        <ControlPanelAvatar
          openMenu={openMenu}
          avatarLink={(logInUser && logInUser.avatar) as string}
          username={(logInUser && logInUser.username) as string}
        />

        {showMenu && (
          <ControlPanelMenu
            menu={showMenu}
            closeMenu={closeMenu}
            username={(logInUser && logInUser.username) as string} openModal={openModal} />
        )}
      </div>

      <div className="control-panel__status">
        <ControlPanelFilter />
      </div>

      {/* Модальное окно */}
      <ControlPanelModal
        modal={showModal}
        closeModal={closeModal}
        username={logInUser && logInUser.username}
        userAvatar={logInUser && logInUser.avatar} />
    </div>
  )
};

const mapStateCurrentUser = ({ auth: { logInUser } }: TAuthLogInUser) => {
  return { logInUser }
}

export default connect(mapStateCurrentUser)(ControlPanel);
