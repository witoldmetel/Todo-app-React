import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  status: boolean;
}

import {
  GET_TASKS,
  CREATE_TASK,
  GET_TASK_ERROR,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  SEARCH_TASK,
  SET_FILTER,
} from '../../fixtures/constants';
import database from '../../config/config';

export const getTasks = () => {
  return (dispatch) => {
    const tasks: Task[] = [];

    database
      .collection('tasks')
      .orderBy('title')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => tasks.push(doc.data() as Task));

        dispatch({ type: GET_TASKS, payload: tasks });
      })
      .catch((error) => dispatch({ type: GET_TASK_ERROR, payload: error }));
  };
};

export const createTask = (task) => {
  const id = uuidv4();
  const status = false;
  const createdAt = new Date();

  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('tasks')
      .add({
        ...task,
        status,
        id,
        author: 'Admin',
        authorId: 12345,
        createdAt,
      })
      .then(() => {
        dispatch({ type: CREATE_TASK, payload: task, id });
      })
      .catch((error) => dispatch({ type: GET_TASK_ERROR, payload: error }));
  };
};

export const editTask = (task: Task, id: string) => {
  return (dispatch) => {
    //@todo: Investigate why task is not updated in firestore
    database.collection('tasks').doc(id).set({ task });

    return dispatch({
      type: EDIT_TASK,
      payload: task,
      id: id,
    });
  };
};

export const deleteTask = (taskId: string) => {
  (dispatch, getState, { getFirestore }) => {
    //@todo: Investigate why task is not deleted from firestore
    const firestore = getFirestore();

    firestore
      .collection('tasks')
      .doc(taskId)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_TASK, payload: taskId });
      })
      .catch((error) => dispatch({ type: GET_TASK_ERROR, payload: error }));
  };
};

export const toggleTask = (task: Task) => {
  //@todo: Investigate why task is not updated in firestore
  database.collection('tasks').doc(task.id).update({ status: !task.status });

  return {
    type: TOGGLE_TASK,
    payload: task.id,
  };
};

export const searchTask = (searchValue: string) => {
  return (dispatch) =>
    dispatch({
      type: SEARCH_TASK,
      payload: searchValue,
    });
};

export const setFilter = (filter: string) => {
  return (dispatch) =>
    dispatch({
      type: SET_FILTER,
      payload: filter,
    });
};
