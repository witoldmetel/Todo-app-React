import {
  GET_TASKS,
  CREATE_TASK,
  CREATE_TASK_ERROR,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
} from '../../fixtures/constants';

interface State {
  id: string;
  title: string;
  status: boolean;
}

type Action = {
  type: string;
  id?: string;
  payload?: string;
  error?: string;
};

export const tasksReducer = (state: State[] = [], action: Action) => {
  switch (action.type) {
    case GET_TASKS:
      return action.payload;

    case CREATE_TASK:
      return [
        ...state,
        {
          id: action.id,
          status: false,
          title: action.payload,
        },
      ];

    case CREATE_TASK_ERROR:
      console.log('Create task error:', action.error);
      return state;

    case EDIT_TASK:
      return state.map((task) => (task.id === action.id ? { ...task, title: action.payload } : task));

    case DELETE_TASK:
      return state.filter((task) => task.id !== action.payload);

    case TOGGLE_TASK:
      return state.map((task) => (task.id === action.payload ? { ...task, status: !task.status } : task));

    default:
      return state;
  }
};
