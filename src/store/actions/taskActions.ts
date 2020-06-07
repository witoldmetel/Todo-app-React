import moment from 'moment';

import {
  GET_TASKS,
  GET_TASK,
  CREATE_TASK,
  TASK_ERROR,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASK_STATUS,
  SEARCH_TASK,
  SET_FILTER,
} from '../../fixtures/constants';
import { Task } from '../../fixtures/types';

export const getTasks = (projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const tasksRef = firestore.collection(`projects/${projectId}/tasks`);

    tasksRef
      .get()
      .then((snapshot) => {
        const tasks: Task[] = [];

        snapshot.docs.forEach((doc) => tasks.push({ ...doc.data(), id: doc.id } as Task));

        dispatch({ type: GET_TASKS, payload: tasks });
      })
      .catch((error) => dispatch({ type: TASK_ERROR, payload: error }));
  };
};

export const getTask = (taskId: string, projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const tasksRef = firestore.collection(`projects/${projectId}/tasks`);

    tasksRef
      .doc(taskId)
      .get()
      .then((snapshot) => {
        const task = snapshot.doc.data();

        dispatch({ type: GET_TASK, payload: { ...task, id: snapshot.doc.data().id } });
      })
      .catch((error) => dispatch({ type: TASK_ERROR, payload: error }));
  };
};

export const createTask = (task: Task, projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const date = moment(new Date()).calendar();

    const tasksRef = firestore.collection(`projects/${projectId}/tasks`);

    tasksRef
      .add({
        ...task,
        status: false,
        author: profile.username,
        authorId,
        createdAt: date,
        updatedAt: date,
      })
      .then(() => {
        dispatch({ type: CREATE_TASK });
      })
      .catch((error) => dispatch({ type: TASK_ERROR, payload: error }));
  };
};

export const updateTask = (task: Task, taskId: string, projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const tasksRef = firestore.collection(`projects/${projectId}/tasks`);
    const date = moment(new Date()).calendar();

    tasksRef
      .doc(taskId)
      .update({ ...task, updatedAt: date })
      .then(() => {
        dispatch({ type: UPDATE_TASK });
      });
  };
};

export const setTaskStatus = (task: Task, projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const tasksRef = firestore.collection(`projects/${projectId}/tasks`);
    const date = moment(new Date()).calendar();

    tasksRef
      .doc(task.id)
      .update({ ...task, status: !task.status, updatedAt: date })
      .then(() => {
        dispatch({ type: SET_TASK_STATUS });
      });
  };
};

export const deleteTask = (taskId: string, projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const tasksRef = firestore.collection(`projects/${projectId}/tasks`);

    tasksRef
      .doc(taskId)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_TASK, taskId });
      })
      .catch((error) => dispatch({ type: TASK_ERROR, payload: error }));
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
