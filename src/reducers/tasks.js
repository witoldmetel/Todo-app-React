export default function tasks(state = [], action) {
  switch (action.type) {
    case 'GET_TASKS':
      return action.payload;
    case 'ADD_TASK':
      return [
        ...state,
        {
          id: action.id,
          randomFace: Math.random(),
          taskNumber: action.taskNumber,
          taskDescription: action.payload,
          completed: false,
        },
      ];
    case 'EDIT_TASK':
      return state.map((task) =>
        task.id === action.id ? Object.assign({}, task, { taskDescription: action.payload }) : task,
      );
    case 'DELETE_TASK':
      return state.filter((task) => task.id !== action.payload);
    case 'TOGGLE_TASK':
      return state.map((task) =>
        task.id === action.payload ? Object.assign({}, task, { completed: !task.completed }) : task,
      );
  }

  return state;
}
