import { database } from '../config/config';
import uuid from 'uuid';

export const getTasks = (todos) => {
    return {
        type: 'GET_TASKS',
        payload: todos
    }
};

export function getTasksThunk() {
    return dispatch => {
        const todos = [];
        database.ref(`/`).once('value', snap => {
            snap.forEach(data => {
                let todo = data.val();
                todos.push(todo)
            })
        })
            .then(() => dispatch(getTasks(todos)))
    }
}

let nextTaskNumber = 1;
export const addTask = (taskDescription) => {
    const id = uuid();
    const taskNumber = nextTaskNumber;
    const taskCompleted = false;
    database.ref(`/${id}`).set({
        id, taskNumber, taskDescription, taskCompleted
    })
    return  {
        type: 'ADD_TASK',
        payload: taskDescription,
        taskNumber: nextTaskNumber++,
        id: id
    }
};

export const editTask = (taskDescription, id) => {
    database.ref(`/${id}`).update({
        taskDescription
    })
    return {
        type: 'EDIT_TASK',
        payload: taskDescription,
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
    const taskCompleted = !todo.completed;
    database.ref(`/${todo.id}`).update({
        taskCompleted
    })
    return {
        type: 'TOGGLE_TASK',
        payload: todo.id
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