import React, { useCallback } from "react";
import { FavoritesIcon, ChatsIcon, ChannelsIcon } from "../../icon";

import { changeFilter } from '../../../actions';
import { connect } from "react-redux";

import { firebaseRef } from "../../../config/ref";
import { TCurrentFilter, TFilter } from "../../../types/redux-state";

import './control-panel-filter.scss';

type TControlPanelFilter = {
  changeFilter: (filterHeading: string, filterName: string) => void
} & TCurrentFilter

const ControlPanelFilter: React.FC<TControlPanelFilter> = ({ changeFilter, currentFilter }: TControlPanelFilter) => {
  const controlPanelStatus = [
    { name: firebaseRef.FAVORITES, title: 'Избранные каналы', component: <FavoritesIcon /> },
    { name: firebaseRef.CHANNELS, title: 'Чат-каналы', component: <ChannelsIcon /> },
    { name: firebaseRef.USERS, title: 'Личные сообщения', component: <ChatsIcon /> },
  ];

  const toggleCurrentStatus = useCallback((title: string, name: string) => {
    if (currentFilter.filterName !== name) {
      changeFilter(title, name)
    }
  }, [changeFilter, currentFilter.filterName]);

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

const mapStateToProps = ({ filter: { currentFilter } }: TFilter) => {
  return { currentFilter }
}

export default connect(mapStateToProps, { changeFilter })(ControlPanelFilter);
