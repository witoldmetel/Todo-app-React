interface State {
  keyword: string;
}

type Action = { type: 'SEARCH_TASK'; payload?: string };

const INITIAL_STATE = {
  keyword: '',
};

export const searchReducer = (state: State = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case 'SEARCH_TASK':
      return action.payload;

    default:
      return state;
  }
};
