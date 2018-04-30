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
export const addTask = (inputText) => {
    return  {
        type: 'ADD_TASK',
        payload: inputText,
        id: nextTaskNumber++,
    }
};

export const addTaskToFirebase = (inputText) => {
    const id = uuid();
    database.ref(`/${id}`).set({
        id, inputText
    })
}

export const editTask = (inputText, id) => {
    return {
        type: 'EDIT_TASK',
        payload: inputText,
        id: id
    };
}

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