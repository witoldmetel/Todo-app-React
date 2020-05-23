import uuid from 'uuid';

import { database } from '../config/config';

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
      .collection('tasks')
      .orderBy('title')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => tasks.push(doc.data()));

        dispatch(getTasks(tasks));
      });
  };
}

export const addTask = (title) => {
  const status = false;

  database.collection('tasks').add({
    title,
    status,
    id: uuid(),
  });

  return {
    type: 'ADD_TASK',
    payload: title,
  };
};

export const editTask = (title, id) => {
  //@todo: Investigate why task is not updated in firestore
  database.collection('tasks').doc(id).update({ title });

  return {
    type: 'EDIT_TASK',
    payload: title,
    id: id,
  };
};

export const deleteTask = (taskId) => {
  //@todo: Investigate why task is not deleted from firestore
  database.collection('tasks').doc(taskId).delete();

  return {
    type: 'DELETE_TASK',
    payload: taskId,
  };
};

export const toggleTask = (task) => {
  //@todo: Investigate why task is not updated in firestore
  database.collection('tasks').doc(task.id).update({ status: !task.status });

  return {
    type: 'TOGGLE_TASK',
    payload: task.id,
  };
};

export function searchTask(searchValue) {
  return {
    type: 'SEARCH_TASK',
    payload: searchValue,
  };
}

export const setFilter = (filter) => {
  return {
    type: 'SET_FILTER',
    payload: filter,
  };
};
