import { TYPESFORUSER } from '../../TYPES';

const logOutUser = () => {
  return {
    type: TYPESFORUSER.LOG_OUT_USER
  }
};

export default logOutUser