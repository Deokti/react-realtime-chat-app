import React, { useState } from 'react';
import { Logo } from "../icon";
import ControlPanelAvatar from "./control-panel-avatar";
import ControlPanelPopup from "./control-panel-popup";

import './control-panel.scss';
import { connect } from "react-redux";

type TControlPanel = {
  logInUser: any
}

const ControlPanel: React.FC<TControlPanel> = ({ logInUser }: TControlPanel) => {
  const [ showPopup, setShowPopup ] = useState<boolean>(false);

  const openPopup = () => setShowPopup(true);
  const closePopup = () => setShowPopup(false);

  return (
    <div className="control-panel">
      <header className="control-panel__header" title="Приложение ReactChat">
        <Logo pointerEvents={'none'} />
      </header>

      <div className="control-panel__avatar">
        <ControlPanelAvatar openPopup={openPopup} avatarLink={logInUser && logInUser.photoURL} username={logInUser && logInUser.displayName} />
        <ControlPanelPopup popup={showPopup} closePopup={closePopup} username={logInUser && logInUser.displayName} />
      </div>
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