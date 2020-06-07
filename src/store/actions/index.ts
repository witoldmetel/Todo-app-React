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
  LOGIN_SUCCESS,
  LOGIN_ERROR,
  LOGOUT_SUCCESS,
  SIGNUP_SUCCESS,
  SIGNUP_ERROR,
  GET_PROJECTS,
  GET_PROJECT,
  CREATE_PROJECT,
  PROJECT_ERROR,
} from '../../fixtures/constants';
import { Task, Project } from '../../fixtures/types';

/**
 * Project
 */
export const getProjects = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('projects')
      .get()
      .then((snapshot) => {
        const projects: Project[] = [];

        snapshot.docs.forEach((doc) => projects.push({ ...doc.data(), id: doc.id } as Project));

        dispatch({ type: GET_PROJECTS, payload: projects });
      })
      .catch((error) => dispatch({ type: PROJECT_ERROR, payload: error }));
  };
};

export const getProject = (projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('projects')
      .doc(projectId)
      .get()
      .then((snapshot) => {
        const project = snapshot.doc.data();

        dispatch({ type: GET_PROJECT, payload: { ...project, id: snapshot.doc.data().id } });
      })
      .catch((error) => dispatch({ type: PROJECT_ERROR, payload: error }));
  };
};

export const createProject = (project: Project) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection('projects')
      .add({
        ...project,
        author: profile.username,
        authorId,
      })
      .then(() => {
        dispatch({ type: CREATE_PROJECT });
      })
      .catch((error) => dispatch({ type: PROJECT_ERROR, payload: error }));
  };
};

/**
 * Task
 */
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

/**
 * Firebase Auth
 */
export const signIn = (credentials) => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signInWithEmailAndPassword(credentials.email, credentials.password)
      .then(() => {
        dispatch({ type: LOGIN_SUCCESS });
      })
      .catch((error) => dispatch({ type: LOGIN_ERROR, payload: error }));
  };
};

export const signOut = () => {
  return (dispatch, getState, { getFirebase }) => {
    const firebase = getFirebase();

    firebase
      .auth()
      .signOut()
      .then(() => {
        dispatch({ type: LOGOUT_SUCCESS });
      });
  };
};

export const signUp = (newUser) => {
  return (dispatch, getState, { getFirebase, getFirestore }) => {
    const firebase = getFirebase();
    const firestore = getFirestore();

    firebase
      .auth()
      .createUserWithEmailAndPassword(newUser.email, newUser.password)
      .then((response) => {
        return firestore.collection('users').doc(response.user.uid).set({
          username: newUser.username,
          accountType: newUser.accountType,
        });
      })
      .then(() => {
        dispatch({ type: SIGNUP_SUCCESS });
      })
      .catch((error) => dispatch({ type: SIGNUP_ERROR, payload: error }));
  };
};
