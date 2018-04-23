let nextTaskNumber = 4;

export const addTask = (inputText) => {
    return  {
        type: 'ADD_TASK',
        payload: inputText,
        id: nextTaskNumber++
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

export const setFilter = (filter) => {
    return {
        type: "SET_FILTER",
        payload: filter
    }
}

export const filters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_INCOMPLETED: 'SHOW_INCOMPLETED',
    SHOW_COMPLETED: 'SHOW_COMPLETED'
}