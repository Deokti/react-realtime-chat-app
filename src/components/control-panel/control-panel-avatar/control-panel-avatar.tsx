import React from "react";

import './control-panel-avatar.scss';
import { TUser } from "../../../types/redux";

type TControlPanelAvatar = {
  openMenu: () => void
  user: TUser | null
}

const ControlPanelAvatar: React.FC<TControlPanelAvatar> = ({ openMenu, user }: TControlPanelAvatar) => {
  return (
    <div className="control-panel-avatar" onClick={openMenu}>
      <div className="control-panel-avatar__image" title={`Пользователь ${user?.username}`}>
        <img src={user?.avatar} alt="avatar" />
      </div>
    </div>
  )
};

export default ControlPanelAvatar;
