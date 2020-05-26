import { SEARCH_TASK } from '../../fixtures/constants';

type Action = { type: string; payload?: string };

export const searchReducer = (state = '', action: Action) => {
  switch (action.type) {
    case SEARCH_TASK:
      return action.payload;

    default:
      return state;
  }
};
