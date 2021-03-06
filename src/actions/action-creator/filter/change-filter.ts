import { CHANGE_FILTER } from "../../TYPES";

const changeFilter = (filterTitle: string, filterName: string) => {
  return {
    type: CHANGE_FILTER,
    payload: {
      filterTitle,
      filterName
    }
  }
};

export default changeFilter;

