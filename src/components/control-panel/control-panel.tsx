import React, { useCallback, useState } from 'react';
import { Logo } from "../icon";
import ControlPanelAvatar from "./control-panel-avatar";
import ControlPanelMenu from "./control-panel-menu";
import ControlPanelModal from "./control-panel-modal";
import ControlPanelFilter from "./control-panel-filter";
import { connect } from "react-redux";

import './control-panel.scss';
import { TAuth } from '../../types/redux';

type TControlPanel = {
  logInUser: any
}

const ControlPanel: React.FC<TControlPanel> = ({ logInUser }: TControlPanel) => {
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
          avatarLink={logInUser && logInUser.photoURL}
          username={logInUser && logInUser.displayName}
        />

        {showMenu && (
          <ControlPanelMenu
            menu={showMenu}
            closeMenu={closeMenu}
            username={logInUser && logInUser.displayName} openModal={openModal} />
        )}
      </div>

      <div className="control-panel__status">
        <ControlPanelFilter />
      </div>

      {/* Модальное окно */}
      <ControlPanelModal
        modal={showModal}
        closeModal={closeModal}
        username={logInUser && logInUser.displayName}
        userAvatar={logInUser && logInUser.photoURL} />
    </div>
  )
};

const mapStateCurrentUser = ({ auth: { logInUser } }: TAuth) => {
  return { logInUser }
}

export default connect(mapStateCurrentUser)(ControlPanel);
