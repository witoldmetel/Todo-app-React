export const addTask = (inputText) => {
    return  {
        type: 'ADD_TASK',
        payload: inputText
    }
};

export const deleteTask = (todo) => {
    return {
        type: 'DELETE_TASK',
        payload: todo.taskNumber
    };
}

export const toggleTask = (todo) => {
    return {
        type: 'TOGGLE_TASK',
        payload: todo.taskNumber
    };
}