import React, { useState } from 'react';
import { Logo } from "../icon";
import ControlPanelAvatar from "./control-panel-avatar";
import ControlPanelMenu from "./control-panel-menu";
import ControlPanelModal from "./control-panel-modal";
import ControlPanelFilter from "./control-panel-filter";
import { connect } from "react-redux";

import './control-panel.scss';

type TControlPanel = {
  logInUser: any
}

const ControlPanel: React.FC<TControlPanel> = ({ logInUser }: TControlPanel) => {
  const [ showMenu, setShowMenu ] = useState<boolean>(false);
  const [ showModal, setShowModal ] = useState<boolean>(false);

  const openMenu = () => setShowMenu(true);
  const closeMenu = () => setShowMenu(false);

  const openModal = () => setShowModal(true);
  const closeModal = () => setShowModal(false);

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

        <ControlPanelMenu
          menu={showMenu}
          closeMenu={closeMenu}
          username={logInUser && logInUser.displayName} openModal={openModal}
        />
      </div>

      <div className="control-panel__status">
        <ControlPanelFilter />
      </div>

      {/* Модальное окно */}
      <ControlPanelModal
        modal={showModal}
        closeModal={closeModal}
        username={logInUser.displayName}
        userAvatar={logInUser.photoURL} />
    </div>
  )
};

type TMapStateToProps = {
  currentLoggedUser: { logInUser: any };
}

const mapStateToProps = ({ currentLoggedUser: { logInUser } }: TMapStateToProps) => {
  return { logInUser }
}

export default connect(mapStateToProps)(ControlPanel);