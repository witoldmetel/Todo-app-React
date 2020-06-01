import { LOGIN_SUCCESS, LOGIN_ERROR } from '../../fixtures/constants';

const INITIAL_STATE = {
  authError: null,
};

type Action = { type: string; payload?: string };

export const authReducer = (state: object = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, authError: null };

    case LOGIN_ERROR:
      console.log(state);
      return { ...state, authError: 'Login failed' };

    default:
      return state;
  }
};
