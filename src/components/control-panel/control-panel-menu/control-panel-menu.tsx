import React, { createRef, memo, useCallback, useEffect } from "react";
import { auth } from '../../../config/firebase';
import { ChannelsIcon, LogoutIcon, UserIcon } from "../../icon";

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
  const onClickNotControlPanel = useCallback((event) => {
    if (event.path && !event.path.includes(controlPanelPopupRef.current)) {
      closeMenu();
    }
  }, [ closeMenu, controlPanelPopupRef ]);

  useEffect(() => {
    document.body.addEventListener('click', onClickNotControlPanel);
    return () => document.body.removeEventListener('click', onClickNotControlPanel);
  }, [ onClickNotControlPanel ]);


  const onLogOut = () => auth.signOut()
    .then(() => console.log(`Пользователь вышел из учётной записи`));

  return (
    <div ref={controlPanelPopupRef} className={`control-panel-menu ${menu ? 'control-panel-menu-active' : ''}`}>
      <div className="control-panel-menu__list">
        <ControlPanelPopupItem label={`Вы вошли как ${username}`} />
        <ControlPanelPopupItem label="Изменить аватар" icon={<UserIcon />} />
        <ControlPanelPopupItem
          label="Создать новый канал"
          onClick={openModal}
          icon={<ChannelsIcon width={12} height={12} />}
        />
        <ControlPanelPopupItem
          label="Выйти из учётной записи"
          icon={<LogoutIcon />}
          onClick={onLogOut}
        />
      </div>
    </div>
  )
};

type TControlPanelPopupItem = {
  onClick?: () => void
  label: string
  icon?: JSX.Element
}

const ControlPanelPopupItem: React.FC<TControlPanelPopupItem> = ({ label, icon, onClick }: TControlPanelPopupItem) => {
  return (
    <span className="control-panel-menu__item" onClick={onClick}>
      {icon && <span className="control-panel-menu__item-icon">{icon}</span>}
      <span className="control-panel-menu__item-text">{label}</span>
    </span>
  )
};

export default memo(ControlPanelMenu);
