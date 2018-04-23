const initialState = [
    { randomFace: "todoapp1", taskNumber: 1, taskDescription: "Do homework", completed: false },
    { randomFace: "todoapp2", taskNumber: 2, taskDescription: "Clean dishes", completed: false },
    { randomFace: "todoapp3", taskNumber: 3, taskDescription: "Buy milk", completed: false }
]

export default function(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                {
                    randomFace: Math.random(),
                    taskNumber: action.id,
                    taskDescription: action.payload,
                    completed: false
                }
            ]
        case 'DELETE_TASK':
            return state.filter(todo => todo.taskNumber !== action.payload);
        case 'TOGGLE_TASK':
            return state.map(todo =>
                (todo.taskNumber === action.payload)
                    ? {
                        taskNumber: todo.taskNumber,
                        taskDescription: todo.taskDescription,
                        completed: !todo.completed}
                    : todo
            )
    }

    return state
}