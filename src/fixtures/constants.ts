/**
 * ACTIONS TYPE
 */
export const GET_TASKS = 'GET_TASKS';
export const CREATE_TASK = 'CREATE_TASK';
export const GET_TASK_ERROR = 'GET_TASK_ERROR';
export const EDIT_TASK = 'EDIT_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const TOGGLE_TASK = 'TOGGLE_TASK';
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
