import React, { useState } from 'react';
import { Logo } from "../icon";
import ControlPanelAvatar from "./control-panel-avatar";
import ControlPanelMenu from "./control-panel-menu";
import ControlPanelModal from "./control-panel-modal";
import ControlPanelFilter from "./control-panel-filter";
import { connect } from "react-redux";
import { TAuthLogInUser, TLogInUser } from '../../types/redux-state';

import './control-panel.scss';

const ControlPanel: React.FC<TLogInUser> = ({ logInUser }: TLogInUser) => {
  const [menu, setMenu] = useState<boolean>(false);
  const [modal, setModal] = useState<boolean>(false);

  const openMenu = () => setMenu(true);
  const closeMenu = () => setMenu(false);
  const openModal = () => setModal(true);
  const closeModal = () => setModal(false);

  return (
    <div className="control-panel">
      <header className="control-panel__header" title="Приложение ReactChat">
        <Logo />
      </header>

      <div className="control-panel__avatar">
        <ControlPanelAvatar
          openMenu={openMenu}
          user={logInUser || null}
        />

        {menu && (
          <ControlPanelMenu
            menu={menu}
            closeMenu={closeMenu}
            username={(logInUser && logInUser.username) as string}
            openModal={openModal}
          />
        )}
      </div>

      <div className="control-panel__status">
        <ControlPanelFilter />
      </div>

      {/* Модальное окно */}
      <ControlPanelModal
        modal={modal}
        closeModal={closeModal}
        username={logInUser && logInUser.username}
        userAvatar={logInUser && logInUser.avatar}
      />
    </div>
  )
};

const mapStateCurrentUser = ({ auth: { logInUser } }: TAuthLogInUser) => {
  return { logInUser }
}

export default connect(mapStateCurrentUser)(ControlPanel);
