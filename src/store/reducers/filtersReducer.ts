import { SET_FILTER, FILTERS } from '../../fixtures/constants';

type Action = { type: string; payload?: string };

export const filtersReducer = (state: string = FILTERS.SHOW_ALL, action: Action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;

    default:
      return state;
  }
};
