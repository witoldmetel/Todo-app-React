export const addTask = (todo) => {
    console.log("Click on", todo.taskDescription);
    return  {
        type: 'ADD_TASK',
        payload: todo.taskDescription
    }
};

export const deleteTask = (todo) => {
    return {
        type: 'DELETE_TASK',
        payload: todo.taskNumber
    };
}