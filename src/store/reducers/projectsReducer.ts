import { CREATE_PROJECT, PROJECT_ERROR } from '../../fixtures/constants';

const INITIAL_STATE = {
  projects: [],
};

type Action = { type: string; payload?: any; error?: string };

export const projectsReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case CREATE_PROJECT:
      return state;

    case PROJECT_ERROR:
      return state;

    default:
      return state;
  }
};
