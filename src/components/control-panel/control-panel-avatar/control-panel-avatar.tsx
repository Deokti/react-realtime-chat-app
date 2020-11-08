import React, { memo } from "react";

import './control-panel-avatar.scss';

type TControlPanelAvatar = {
  openMenu: () => void
  avatarLink: string
  username: string
}

const ControlPanelAvatar: React.FC<TControlPanelAvatar> = ({ openMenu, avatarLink, username }: TControlPanelAvatar) => {
  return (
    <div className="control-panel-avatar" onClick={openMenu}>
      <div className="control-panel-avatar__image" title={`Пользователь ${username}`}>
        <img src={avatarLink} alt="avatar" />
      </div>
    </div>
  )
};

export default memo(ControlPanelAvatar);
