const addTask = (text) => {
    return {
        type: 'ADD_TASK',
        taskDescription: text
    };
},

deleteTask = (taskNumber) => {
    return {
        type: 'DELETE_TASK',
        taskNumber: taskNumber
    };
}

export default { addTask, deleteTask };