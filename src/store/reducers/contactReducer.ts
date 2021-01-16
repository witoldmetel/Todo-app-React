import { SEND_MESSAGE } from '../../fixtures/constants';

export const contactReducer = (state = [], action) => {
  switch (action.type) {
    case SEND_MESSAGE:
      return state;

    default:
      return state;
  }
};
