import React from "react";

import './control-panel-avatar.scss';

type TControlPanelAvatar = {
  openPopup: () => void
  avatarLink: string
  username: string
}

const ControlPanelAvatar: React.FC<TControlPanelAvatar> = ({ openPopup, avatarLink, username }: TControlPanelAvatar) => {
  return (
    <div className="control-panel-avatar" onClick={openPopup}>
      <div className="control-panel-avatar__image" title={`Пользователь ${username}`}>
        <img src={avatarLink} alt="avatar" />
      </div>
    </div>
  )
};

export default ControlPanelAvatar;