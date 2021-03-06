import React from "react";

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

export default ControlPanelPopupItem;