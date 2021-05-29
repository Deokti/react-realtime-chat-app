import React, { createRef, memo, useCallback, useEffect } from "react";
import { auth } from '../../../config/firebase';
import { ChannelsIcon, LogoutIcon, UserIcon } from "../../icon";
import ControlPanelPopupItem from "./control-panel-popu-item";

import './control-panel-menu.scss';

type TControlPanelMenu = {
  menu: boolean
  closeMenu: () => void
  username: string
  openModal: () => void
}

const ControlPanelMenu: React.FC<TControlPanelMenu> = ({ menu, closeMenu, username, openModal }: TControlPanelMenu) => {
  const controlPanelPopupRef = createRef<HTMLDivElement>();

  // Если произошёл клик не по элементу, то активируется функция и закроет окно
  const onClickNotOnElement = useCallback((event: any) => {
    const path = event.path || (event.composedPath && event.composedPath());
    const elementToPath = path.includes(controlPanelPopupRef.current);

    if (path && !elementToPath) closeMenu();
  }, [closeMenu, controlPanelPopupRef]);

  useEffect(() => {
    document.body.addEventListener('click', onClickNotOnElement)

    return () => {
      document.body.removeEventListener('click', onClickNotOnElement);
    }

  }, [onClickNotOnElement]);

  const isLogOut = () => auth
    .signOut()
    .then(() => console.log(`Вы вышли из учётной записи`));

  return (
    <div ref={controlPanelPopupRef} className={`control-panel-menu ${menu ? 'control-panel-menu-active' : ''}`}>
      <div className="control-panel-menu__list">
        <ControlPanelPopupItem label={`Вы вошли как ${username}`} />
        <ControlPanelPopupItem label="Изменить аватар" icon={<UserIcon />} />
        <ControlPanelPopupItem label="Создать новый канал" onClick={openModal}
          icon={<ChannelsIcon size={12} />}
        />
        <ControlPanelPopupItem label="Выйти из учётной записи" icon={<LogoutIcon />} onClick={isLogOut}
        />
      </div>
    </div>
  )
};

export default memo(ControlPanelMenu);
