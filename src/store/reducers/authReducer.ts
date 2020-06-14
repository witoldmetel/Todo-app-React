import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT_SUCCESS, SIGNUP_SUCCESS, SIGNUP_ERROR } from '../../fixtures/constants';

const INITIAL_STATE = {
  authError: null,
};

type Action = { type: string; payload?: string };

export const authReducer = (state: object = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, authError: null };

    case SIGNUP_ERROR:
      return { ...state, authError: 'Register failed' };

    case LOGIN_SUCCESS:
      return { ...state, authError: null };

    case LOGIN_ERROR:
      return { ...state, authError: 'Incorrect email or password' };

    case LOGOUT_SUCCESS:
      return state;

    default:
      return state;
  }
};
