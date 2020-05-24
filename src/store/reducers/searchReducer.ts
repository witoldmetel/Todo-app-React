import { SEARCH_TASK } from '../../fixtures/constants';

interface State {
  searchValue: string;
}

type Action = { type: string; payload?: string };

const INITIAL_STATE = {
  searchValue: '',
};

export const searchReducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case SEARCH_TASK:
      return action.payload;

    default:
      return state;
  }
};
