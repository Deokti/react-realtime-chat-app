import { TYPEFORCONTROLPANEL } from "../../TYPES";

const changeControlFilter = (filterHeading: string, filterName: string) => {
  return {
    type: TYPEFORCONTROLPANEL.CHANGE_CONTROL_FILTER,
    payload: {
      filterHeading,
      filterName
    }
  }
};

export default changeControlFilter;

