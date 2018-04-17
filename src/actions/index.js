const addTask = (text) => {
    return {
        type: 'ADD_TASK',
        text
    };
},

deleteTask = (taskNumber) => {
    return {
        type: 'DELETE_TASK',
        taskNumber
    };
}

export default { addTask, deleteTask };