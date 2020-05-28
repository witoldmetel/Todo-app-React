/**
 * ACTIONS TYPE
 */
export const GET_TASKS = 'GET_TASKS';
export const GET_TASK = 'GET_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const TASK_ERROR = 'TASK_ERROR';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SEARCH_TASK = 'SEARCH_TASK';
export const SET_FILTER = 'SET_FILTER';

/**
 * GENERIC
 */
export enum FILTERS {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_INCOMPLETED = 'SHOW_INCOMPLETED',
  SHOW_COMPLETED = 'SHOW_COMPLETED',
}

export enum MODAL_SIZES {
  MINI = 'mini',
  TINY = 'tiny',
  SMALL = 'small',
  LARGE = 'large',
}
