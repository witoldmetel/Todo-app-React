const addTask = (taskDescription) => {
    return {
        type: 'ADD_TASK',
        taskDescription
    };
},

deleteTask = (taskNumber) => {
    return {
        type: 'DELETE_TASK',
        taskNumber
    };
}

export default { addTask, deleteTask };