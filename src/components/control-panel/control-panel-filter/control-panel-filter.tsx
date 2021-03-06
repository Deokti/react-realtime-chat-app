import React, { useCallback, useMemo } from "react";
import { FavoritesIcon, ChatsIcon, ChannelsIcon } from "../../icon";

import { changeFilter } from '../../../actions';
import { connect } from "react-redux";

import { firebaseRef } from "../../../config/ref";

import './control-panel-filter.scss';
import { TCurrentFilter, TFilter } from "../../../types/redux-state";

type TControlPanelFilter = {
  changeFilter: (filterHeading: string, filterName: string) => void
} & TFilter

type TControlPanelStatus = {
  filterName: string
  title: string
  icon: JSX.Element
}

type TItem = {
  filter: TCurrentFilter,
  item: TControlPanelStatus,
  onClick: (filterTitle: string, filterName: string) => any
}

const ControlPanelFilter: React.FC<TControlPanelFilter> = ({ changeFilter, filter }: TControlPanelFilter) => {
  const controlPanelStatus = useMemo<Array<TControlPanelStatus>>(() => [
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
        controlPanelStatus
          .map((item) => {
            const props = {
              key: item.filterName,
              filter,
              item,
              onClick: onChangeFilter
            }

            return <TemplatePanelFilterItem {...props} />
          })}
    </ul>
  )
};

function TemplatePanelFilterItem({ filter, item, onClick }: TItem) {
  const activeClass = filter.filterName === item.filterName ? 'active' : '';

  return (
    <li onClick={() => onClick(item.title, item.filterName)}
        className={`control-panel-status__item ${activeClass}`}
    >
      {item.icon}
    </li>
  )
}

const mapStateToProps = ({ filter }: TFilter) => {
  return { filter }
}

export default connect(mapStateToProps, { changeFilter })(ControlPanelFilter);
