import { CHANGE_FILTER } from "../actions/TYPES";
import { TFilter } from "../types/redux";

type TCurrentControlFilterAction = {
  type: string
  payload: {
    filterHeading: string,
    filterName: string
  }
}

const updateCurrentControlFilter = (state: TFilter, action: TCurrentControlFilterAction): TFilter => {
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