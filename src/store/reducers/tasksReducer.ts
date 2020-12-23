import { GET_TASK, CREATE_TASK, UPDATE_TASK, DELETE_TASK, TASK_ERROR, SET_TASK_STATUS } from '../../fixtures/constants';

type Action = { type: string; payload?: any; error?: string };

export const tasksReducer = (state = [], action: Action) => {
  switch (action.type) {
    case GET_TASK:
      return state;

    case CREATE_TASK:
      return state;

    case UPDATE_TASK:
      return state;

    case DELETE_TASK:
      return state;

    case SET_TASK_STATUS:
      return state;

    case TASK_ERROR:
      return state;

    default:
      return state;
  }
};
