import { SET_FILTER } from '../fixtures/constants';

interface State {
  type: string;
}

type Action = { type: string; payload?: string };

const INITIAL_STATE = {
  type: 'SHOW_ALL',
};

export const filtersReducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case SET_FILTER:
      return action.payload;

    default:
      return state;
  }
};
