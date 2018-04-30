import { database } from '../config/config';
import uuid from 'uuid';

export const fetchTodos = (todo) => dispatch => {
    todosRef.on("value", snapshot => {
        dispatch({
            type: 'FETCH_TODOS',
            payload: snapshot.val()
        });
    });
};

let nextTaskNumber = 4;
export const addTask = (taskDescription) => {
    const id = uuid();
    const taskNumber = nextTaskNumber;
    database.ref(`/${id}`).set({
        id, taskNumber, taskDescription
    })
    return  {
        type: 'ADD_TASK',
        payload: taskDescription,
        taskNumber: nextTaskNumber++,
        id: id
    }
};

export const editTask = (inputText, id) => {
    return {
        type: 'EDIT_TASK',
        payload: inputText,
        id: id
    };
}

export const deleteTask = (todo) => {
    database.ref(`/${todo.id}`).remove();
    return {
        type: 'DELETE_TASK',
        payload: todo.id
    };
}

export const toggleTask = (todo) => {
    return {
        type: 'TOGGLE_TASK',
        payload: todo.taskNumber
    };
}

export function searchTask(keyword) {
    return {
        type: 'SEARCH_TASK',
        payload: keyword
    };
}

export const setFilter = (filter) => {
    return {
        type: 'SET_FILTER',
        payload: filter
    }
}