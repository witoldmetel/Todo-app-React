const initialState = [
    { id: 1, randomFace: "todoapp1", taskNumber: 1, taskDescription: "Do homework", completed: false },
    { id: 2, randomFace: "todoapp2", taskNumber: 2, taskDescription: "Clean dishes", completed: false },
    { id: 3, randomFace: "todoapp3", taskNumber: 3, taskDescription: "Buy milk", completed: false }
]

export default function todos(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_TODOS':
            return action.payload
        case 'ADD_TASK':
            return [
                ...state,
                {
                    id: action.id,
                    randomFace: Math.random(),
                    taskNumber: action.taskNumber,
                    taskDescription: action.payload,
                    completed: false
                }
            ]
        case 'EDIT_TASK':
            return state.map(todo => todo.taskNumber === action.id ? Object.assign({}, todo, { taskDescription: action.payload }) : todo);
        case 'DELETE_TASK':
            return state.filter(todo => todo.id !== action.payload);
        case 'TOGGLE_TASK':
            return state.map(todo => todo.taskNumber === action.payload ? Object.assign({}, todo, { completed: !todo.completed }) : todo);
    }

    return state
}