import { CHANGE_FILTER } from "../actions/TYPES";
import { TCurrentFilter } from "../types/redux-state";

type TCurrentControlFilterAction = {
  type: string
  payload: {
    filterHeading: string,
    filterName: string
  }
}

const updateCurrentControlFilter = (state: TCurrentFilter, action: TCurrentControlFilterAction): TCurrentFilter => {
  if (state === undefined) {
    return {
      currentFilter: {
        filterHeading: 'Чат-каналы',
        filterName: 'CHANNELS'
      },
    }
  }

  switch (action.type) {
    case CHANGE_FILTER: {
      return {
        ...state,
        currentFilter: {
          filterHeading: action.payload.filterHeading,
          filterName: action.payload.filterName
        }
      }
    }

    default: { return state }
  }
}

export default updateCurrentControlFilter;