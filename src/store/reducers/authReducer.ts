import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS } from '../../fixtures/constants';

const INITIAL_STATE = {
  authError: null,
};

type Action = { type: string; payload?: string };

export const authReducer = (state: object = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:
      return { ...state, authError: null };

    case LOGIN_ERROR:
      return { ...state, authError: 'Login failed' };

    case LOGOUT_SUCCESS:
      return state;

    default:
      return state;
  }
};
