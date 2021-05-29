import React from "react";
import { ChannelsIcon } from "../../icon";

import './control-panel-filter.scss';

const ControlPanelFilter: React.FC = () => {
  return (
    <ul className="control-panel-status">
      <li className="control-panel-status__item active">
        <ChannelsIcon />
      </li>
    </ul>
  )
};

export default ControlPanelFilter;
