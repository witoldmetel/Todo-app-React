export const addTask = (inputText) => {
    console.log("Click on", inputText);
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