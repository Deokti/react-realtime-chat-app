import { CHANGE_CONTROL_FILTER } from "../actions/TYPES";
import { TCurrentControlFilter } from "../types/reused-types";

type TCurrentControlFilterAction = {
  type: string
  payload: {
    filterHeading: string,
    filterName: string
  }
}

const updateCurrentControlFilter = (state: TCurrentControlFilter, action: TCurrentControlFilterAction): TCurrentControlFilter => {
  if (state === undefined) {
    return {
      currentFilter: {
        filterHeading: 'Чат-каналы',
        filterName: 'CHANNELS'
      },
    }
  }

  switch (action.type) {
    case CHANGE_CONTROL_FILTER: {
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