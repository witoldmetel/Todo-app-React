import { database } from '../config/config';
import uuid from 'uuid';

export const getTasks = (tasks) => {
  return {
    type: 'GET_TASKS',
    payload: tasks,
  };
};

export function getTasksThunk() {
  return (dispatch) => {
    const tasks = [];
    database
      .ref(`/`)
      .once('value', (snap) => {
        snap.forEach((data) => {
          let task = data.val();
          tasks.push(task);
        });
      })
      .then(() => dispatch(getTasks(tasks)));
  };
}

let nextTaskNumber = 1;
export const addTask = (taskDescription) => {
  const id = uuid();
  const taskNumber = nextTaskNumber;
  const taskCompleted = false;
  database.ref(`/${id}`).set({
    id,
    taskNumber,
    taskDescription,
    taskCompleted,
  });
  return {
    type: 'ADD_TASK',
    payload: taskDescription,
    taskNumber: nextTaskNumber++,
    id: id,
  };
};

export const editTask = (taskDescription, id) => {
  database.ref(`/${id}`).update({
    taskDescription,
  });
  return {
    type: 'EDIT_TASK',
    payload: taskDescription,
    id: id,
  };
};

export const deleteTask = (task) => {
  database.ref(`/${task.id}`).remove();
  return {
    type: 'DELETE_TASK',
    payload: task.id,
  };
};

export const toggleTask = (task) => {
  const taskCompleted = !task.completed;
  database.ref(`/${task.id}`).update({
    taskCompleted,
  });
  return {
    type: 'TOGGLE_TASK',
    payload: task.id,
  };
};

export function searchTask(keyword) {
  return {
    type: 'SEARCH_TASK',
    payload: keyword,
  };
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  };
};
