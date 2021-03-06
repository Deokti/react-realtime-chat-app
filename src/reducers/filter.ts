import { CHANGE_FILTER } from "../actions/TYPES";
import { TCurrentFilter } from "../types/redux-state";

type TCurrentControlFilterAction = {
  type: string
  payload: {
    filterTitle: string,
    filterName: string
  }
}

const updateCurrentControlFilter = (state: TCurrentFilter, action: TCurrentControlFilterAction): TCurrentFilter => {
  if (state === undefined) {
    return {
      filterTitle: 'Чат-каналы',
      filterName: 'CHANNELS'
    }
  }

  switch (action.type) {
    case CHANGE_FILTER: {
      return {
        ...state,
        filterTitle: action.payload.filterTitle,
        filterName: action.payload.filterName
      }
    }

    default: {
      return state
    }
  }
}

export default updateCurrentControlFilter;