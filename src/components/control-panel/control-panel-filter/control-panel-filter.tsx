import React, { useCallback, useMemo } from "react";
import { FavoritesIcon, ChatsIcon, ChannelsIcon } from "../../icon";

import { changeFilter } from '../../../actions';
import { connect } from "react-redux";

import { firebaseRef } from "../../../config/ref";

import './control-panel-filter.scss';
import { TFilter } from "../../../types/redux-state";

type TControlPanelFilter = {
  changeFilter: (filterHeading: string, filterName: string) => void
} & TFilter

const ControlPanelFilter: React.FC<TControlPanelFilter> = ({ changeFilter, filter }: TControlPanelFilter) => {
  const controlPanelStatus = useMemo(() => [
      { filterName: firebaseRef.FAVORITES, title: 'Избранные каналы', icon: <FavoritesIcon /> },
      { filterName: firebaseRef.CHANNELS, title: 'Чат-каналы', icon: <ChannelsIcon /> },
      { filterName: firebaseRef.USERS, title: 'Личные сообщения', icon: <ChatsIcon /> },
    ], [])

  const onChangeFilter = useCallback((title: string, filterName: string) => {
    if (filter.filterName !== filterName) {
      changeFilter(title, filterName)
    }
  }, [changeFilter, filter.filterName]);

  return (
    <ul className="control-panel-status">
      {
        controlPanelStatus.map(({ filterName, title, icon }) => {
          const activeClass = filter.filterName === filterName ? 'active' : '';

          return (
            <li key={filterName}
                onClick={() => onChangeFilter(title, filterName)}
                className={`control-panel-status__item ${activeClass}`}
            >
              {icon}
            </li>
          )
        })
      }
    </ul>
  )
};

const mapStateToProps = ({ filter }: TFilter) => {
  return { filter }
}

export default connect(mapStateToProps, { changeFilter })(ControlPanelFilter);
