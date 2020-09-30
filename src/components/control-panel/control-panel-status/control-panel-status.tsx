import React, { useCallback, useState } from "react";
import { FavoritesIcon, ChatsIcon, ChannelsIcon } from "../../icon";

import './control-panel-status.scss';


const ControlPanelStatus: React.FC = () => {
  const [ currentStatus, setCurrentStatus ] = useState('channels');

  const controlPanelStatus = [
    { name: 'favorites', title: 'Избранные каналы', component: <FavoritesIcon /> },
    { name: 'channels', title: 'Чат-каналы', component: <ChannelsIcon /> },
    { name: 'chats', title: 'Личные сообщения', component: <ChatsIcon /> },
  ];

  const toggleCurrentStatus = useCallback((name: string) => setCurrentStatus(name), []);

  return (
    <ul className="control-panel-status">
      {
        controlPanelStatus.map(({ name, title, component }) => {
          const activeClass = currentStatus === name ? 'active' : '';

          return (
            <li key={name}
                onClick={() => toggleCurrentStatus(name)}
                title={title}
                data-control-status={name}
                className={`control-panel-status__item ${activeClass}`}>
              {component}
            </li>
          )
        })
      }
    </ul>
  )
};

export default ControlPanelStatus;