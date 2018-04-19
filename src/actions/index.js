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

// export const searchTask = (todo) => {
//     return {
//         type: 'SEARCH_TASK',
//         payload: todo.taskDescription
//     };
// }