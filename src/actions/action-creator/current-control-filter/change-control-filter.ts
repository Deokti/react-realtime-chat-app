import { CHANGE_CONTROL_FILTER } from "../../TYPES";

const changeControlFilter = (filterHeading: string, filterName: string) => {
  return {
    type: CHANGE_CONTROL_FILTER,
    payload: {
      filterHeading,
      filterName
    }
  }
};

export default changeControlFilter;

