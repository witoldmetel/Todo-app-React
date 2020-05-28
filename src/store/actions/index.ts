import {
  GET_TASKS,
  GET_TASK,
  CREATE_TASK,
  TASK_ERROR,
  UPDATE_TASK,
  DELETE_TASK,
  SEARCH_TASK,
  SET_FILTER,
} from '../../fixtures/constants';
import { Task } from '../../fixtures/types';

export const getTasks = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('tasks')
      .orderBy('title')
      .get()
      .then((snapshot) => {
        const tasks: Task[] = [];

        snapshot.docs.forEach((doc) => tasks.push(doc.data() as Task));

        dispatch({ type: GET_TASKS, payload: tasks });
      })
      .catch((error) => dispatch({ type: TASK_ERROR, payload: error }));
  };
};

export const getTask = (id: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('tasks')
      .get()
      .then((snapshot) => {
        const task = snapshot.docs.find((doc) => doc.data().id === id);

        dispatch({ type: GET_TASK, payload: task });
      })
      .catch((error) => dispatch({ type: TASK_ERROR, payload: error }));
  };
};

export const createTask = (task: Task) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('tasks')
      .add({
        ...task,
        status: false,
        author: 'Admin',
        authorId: 12345,
        createdAt: Date.now(),
      })
      .then(() => {
        dispatch({ type: CREATE_TASK });
      })
      .catch((error) => dispatch({ type: TASK_ERROR, payload: error }));
  };
};

export const updateTask = (task: Task, id: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('tasks')
      .doc(id)
      .update(task)
      .then(() => {
        dispatch({ type: UPDATE_TASK });
      });
  };
};

export const deleteTask = (id: string) => {
  return (dispatch, getState, { getFirestore }) => {
    //@todo: Investigate why task is not deleted from firestore
    const firestore = getFirestore();

    firestore
      .collection('tasks')
      .doc(id)
      .delete()
      .then(() => {
        dispatch({ type: DELETE_TASK, id });
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
