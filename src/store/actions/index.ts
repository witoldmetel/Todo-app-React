import { v4 as uuidv4 } from 'uuid';

export interface Task {
  id: string;
  title: string;
  status: boolean;
}

import {
  GET_TASKS,
  ADD_TASK,
  EDIT_TASK,
  DELETE_TASK,
  TOGGLE_TASK,
  SEARCH_TASK,
  SET_FILTER,
} from '../../fixtures/constants';
import { database } from '../../config/config';

export const getTasks = (tasks: Task[]) => {
  return {
    type: GET_TASKS,
    payload: tasks,
  };
};

export const getTasksThunk = () => {
  return (dispatch: any) => {
    const tasks: Task[] = [];

    database
      .collection('tasks')
      .orderBy('title')
      .get()
      .then((snapshot) => {
        snapshot.docs.forEach((doc) => tasks.push(doc.data() as Task));

        dispatch(getTasks(tasks));
      });
  };
};

export const addTask = (title: string) => {
  const id = uuidv4();
  const status = false;

  database.collection('tasks').add({
    title,
    status,
    id,
  });

  return {
    type: ADD_TASK,
    payload: title,
    id,
  };
};

export const editTask = (title: string, id: string) => {
  //@todo: Investigate why task is not updated in firestore
  database.collection('tasks').doc(id).update({ title });

  return {
    type: EDIT_TASK,
    payload: title,
    id: id,
  };
};

export const deleteTask = (taskId: string) => {
  //@todo: Investigate why task is not deleted from firestore
  database.collection('tasks').doc(taskId).delete();

  return {
    type: DELETE_TASK,
    payload: taskId,
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
  return {
    type: SEARCH_TASK,
    payload: searchValue,
  };
};

export const setFilter = (filter: string) => {
  return {
    type: SET_FILTER,
    payload: filter,
  };
};
