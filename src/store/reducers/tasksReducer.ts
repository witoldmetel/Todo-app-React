import { GET_TASKS, CREATE_TASK, UPDATE_TASK, DELETE_TASK, TASK_ERROR } from '../../fixtures/constants';
import { Task } from '../../fixtures/types';

const INITIAL_STATE = {
  tasks: [],
};

type Action = { type: string; payload?: any; error?: string };

export const tasksReducer = (state = INITIAL_STATE, action: Action) => {
  switch (action.type) {
    case GET_TASKS:
      const tasks: Task[] = [];

      action.payload.forEach((doc: Task) => {
        tasks.push({
          id: doc.id,
          author: doc.data().author,
          authorId: doc.data().authorId,
          title: doc.data().title,
          description: doc.data().description,
          status: doc.data().status,
          createdAt: doc.data().createdAt,
        });
      });

      return {
        ...state,
        tasks,
      };

    case CREATE_TASK:
      return state;

    case UPDATE_TASK:
      return state;

    case DELETE_TASK:
      return state;

    case TASK_ERROR:
      console.log('Task error:', action.error);
      return state;

    default:
      return state;
  }
};
