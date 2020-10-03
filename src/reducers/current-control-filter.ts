import { TYPEFORCONTROLPANEL } from "../actions/TYPES";

export type TCurrentControlFilter = {
  currentFilter: {
    filterHeading: string,
    filterName: string
  }
}

const updateCurrentControlFilter = (state: TCurrentControlFilter, actions: any ) => {
  if (state === undefined) {
    return {
      currentFilter: {
        filterHeading: 'Чат-каналы',
        filterName: 'channels'
      },
    }
  }

  switch (actions.type) {
    case TYPEFORCONTROLPANEL.CHANGE_CONTROL_FILTER: {
      return {
        ...state,
        currentFilter: {
          filterHeading: actions.payload.filterHeading,
          filterName: actions.payload.filterName
        }
      }
    }

    default: { return state }
  }
}

export default updateCurrentControlFilter;