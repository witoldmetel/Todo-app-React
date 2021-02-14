import * as firebase from 'firebase';

import {
  GET_TASK,
  CREATE_TASK,
  TASK_ERROR,
  UPDATE_TASK,
  DELETE_TASK,
  SET_TASK_STATUS,
  SEARCH_TASK,
  SET_FILTER
} from '../../fixtures/constants';
import { Task } from '../../fixtures/types';

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

export const createTask = (task: Task, projectId: string, callback: () => void) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;
    const date: firebase.firestore.Timestamp = firestore.Timestamp.now();

    const tasksRef = firestore.collection(`projects/${projectId}/tasks`);

    tasksRef
      .add({
        ...task,
        status: false,
        author: profile.username,
        authorId,
        createdAt: date,
        updatedAt: date
      })
      .then(() => {
        dispatch({ type: CREATE_TASK });
        callback();
      })
      .catch((error) => dispatch({ type: TASK_ERROR, payload: error }));
  };
};

export const updateTask = (task: Task, taskId: string, projectId: string, callback: () => void) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const tasksRef = firestore.collection(`projects/${projectId}/tasks`);

    tasksRef
      .doc(taskId)
      .update({ ...task, updatedAt: firestore.Timestamp.now() as firebase.firestore.Timestamp })
      .then(() => {
        dispatch({ type: UPDATE_TASK });
        callback();
      });
  };
};

export const setTaskStatus = (task: Task, projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const tasksRef = firestore.collection(`projects/${projectId}/tasks`);

    tasksRef
      .doc(task.id)
      .update({ ...task, status: !task.status, updatedAt: firestore.Timestamp.now() })
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
      payload: searchValue
    });
};

export const setFilter = (filter: string) => {
  return (dispatch) =>
    dispatch({
      type: SET_FILTER,
      payload: filter
    });
};
