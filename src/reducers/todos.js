const initialState = [
    { randomFace: "todoapp1", taskNumber: 1, taskDescription: "Do homework" },
    { randomFace: "todoapp2", taskNumber: 2, taskDescription: "Clean dishes" },
    { randomFace: "todoapp3", taskNumber: 3, taskDescription: "Buy milk" }
]

export default function(state = initialState, action) {
    switch (action.type) {
        case 'ADD_TASK':
            return [
                ...state,
                {
                    randomFace: Math.random(),
                    taskNumber: Math.round(Math.random()*100),
                    taskDescription: action.payload
                }
            ]
        case 'DELETE_TASK':
            return state.filter(todo => todo.taskNumber !== action.payload);
        // case 'SEARCH_TASK':
        //     return state.filter(todo => todo.toLowerCase().includes(action.payload.toLowerCase()));
    }

    return state
}