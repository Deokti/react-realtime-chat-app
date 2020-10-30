import React, { memo } from 'react';

import './message-panel-search.scss';
import { SearchIcon } from "../../icon";

const MessagePanelSearch: React.FC = () => {
  return (
    <label className="message-panel-search">
      <input type="text" className="message-panel-search__input" placeholder="Поиск" />
      <span className="message-panel-search__icon">
        <SearchIcon />
      </span>
    </label>
  );
};

export default memo(MessagePanelSearch);
