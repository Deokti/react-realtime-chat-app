import React, { createRef, useCallback, useEffect } from "react";
import { auth } from '../../../config/firebase';

import './control-panel-popup.scss';

type ControlPanelPopup = {
  popup: boolean
  closePopup: () => void
  username: string
}

const ControlPanelPopup: React.FC<ControlPanelPopup> = ({ popup, closePopup, username }: ControlPanelPopup) => {
  const controlPanelPopupRef = createRef<HTMLDivElement>();

  const onClickNotControlPanel = useCallback((event: any) => {
    if (event.path && !event.path.includes(controlPanelPopupRef.current)) {
      closePopup();
    }
  }, [ closePopup, controlPanelPopupRef ]);

  useEffect(() => {
    document.body.addEventListener('click', onClickNotControlPanel);
    return () => document.body.removeEventListener('click', onClickNotControlPanel);
  }, [ onClickNotControlPanel ]);


  const onLogOut = () => {
    auth
      .signOut()
      .then(() => console.log(`Пользователь вышел из учётной записи`));
  };

  return (
    <div ref={controlPanelPopupRef} className={`control-panel-popup ${popup ? 'control-panel-popup-active' : ''}`}>
      <div className="control-panel-popup__list">
        <span className="control-panel-popup__item">Вы вошли как {username}</span>
        <span className="control-panel-popup__item">Изменить аватар</span>
        <span className="control-panel-popup__item" onClick={onLogOut}>Выйти из учётной записи</span>
      </div>
    </div>
  )
};

export default ControlPanelPopup;