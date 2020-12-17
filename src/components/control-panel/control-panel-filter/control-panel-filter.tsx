import React, { useCallback } from "react";
import { FavoritesIcon, ChatsIcon, ChannelsIcon } from "../../icon";

import { changeControlFilter } from '../../../actions';
import { connect } from "react-redux";

import './control-panel-filter.scss';
import { TCurrentControlFilter } from "../../../types/reused-types";


type TControlPanelFilter = {
  changeControlFilter: (filterHeading: string, filterName: string) => void
  currentFilter: {
    filterHeading: string,
    filterName: string
  }
}

const ControlPanelFilter: React.FC<TControlPanelFilter> = ({ changeControlFilter, currentFilter }: TControlPanelFilter) => {
  const controlPanelStatus = [
    { name: 'FAVORITES', title: 'Избранные каналы', component: <FavoritesIcon /> },
    { name: 'CHANNELS', title: 'Чат-каналы', component: <ChannelsIcon /> },
    { name: 'CHATS', title: 'Личные сообщения', component: <ChatsIcon /> },
  ]

  const toggleCurrentStatus = useCallback((title: string, name: string) => {
    if (currentFilter.filterName !== name) {
      changeControlFilter(title, name)
    }
  }, [changeControlFilter, currentFilter.filterName]);

  return (
    <ul className="control-panel-status">
      {
        controlPanelStatus.map(({ name, title, component }) => {
          const activeClass = currentFilter.filterName === name ? 'active' : '';
          return (
            <li key={name}
              onClick={() => toggleCurrentStatus(title, name)}
              data-control-filter-title={title}
              data-control-filter-name={name}
              className={`control-panel-status__item ${activeClass}`}>
              {component}
            </li>
          )
        })
      }
    </ul>
  )
};

type TMapStateToProps = {
  currentControlFilter: TCurrentControlFilter
}

const mapStateToProps = ({ currentControlFilter: { currentFilter } }: TMapStateToProps) => {
  return { currentFilter }
}

export default connect(mapStateToProps, { changeControlFilter })(ControlPanelFilter);
