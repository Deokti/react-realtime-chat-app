import { CHANGE_CONTROL_FILTER } from "../actions/TYPES";

export type TCurrentControlFilter = {
  currentFilter: {
    filterHeading: string,
    filterName: string
  }
}

const updateCurrentControlFilter = (state: TCurrentControlFilter, actions: any ) => {
  console.log('actions:', actions)
  if (state === undefined) {
    return {
      currentFilter: {
        filterHeading: 'Чат-каналы',
        filterName: 'CHANNELS'
      },
    }
  }

  switch (actions.type) {
    case CHANGE_CONTROL_FILTER: {
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