import { CHANGE_FILTER } from "../../TYPES";

const changeFilter = (filterHeading: string, filterName: string) => {
  return {
    type: CHANGE_FILTER,
    payload: {
      filterHeading,
      filterName
    }
  }
};

export default changeFilter;

