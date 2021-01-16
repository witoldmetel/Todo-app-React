/**
 * ACTIONS TYPE
 */
export const GET_TASK = 'GET_TASK';
export const CREATE_TASK = 'CREATE_TASK';
export const SET_TASK_STATUS = 'SET_TASK_STATUS';
export const TASK_ERROR = 'TASK_ERROR';
export const UPDATE_TASK = 'UPDATE_TASK';
export const DELETE_TASK = 'DELETE_TASK';
export const SEARCH_TASK = 'SEARCH_TASK';
export const SET_FILTER = 'SET_FILTER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const SIGNUP_SUCCESS = 'SIGNUP_SUCCESS';
export const SIGNUP_ERROR = 'SIGNUP_ERROR';
export const GET_PROJECTS = 'GET_PROJECTS';
export const GET_PROJECT = 'GET_PROJECT';
export const CREATE_PROJECT = 'CREATE_PROJECT';
export const PROJECT_ERROR = 'PROJECT_ERROR';
export const ASSIGN_MEMBERS = 'ASSIGN_MEMBERS';
export const REMOVE_MEMBER = 'REMOVE_MEMBER';
export const SEND_MESSAGE = 'SEND_MESSAGE';

/**
 * GENERIC
 */
export enum FILTERS {
  SHOW_ALL = 'SHOW_ALL',
  SHOW_INCOMPLETED = 'SHOW_INCOMPLETED',
  SHOW_COMPLETED = 'SHOW_COMPLETED'
}

export enum ACCOUNT_TYPE {
  ADMIN = 'ADMIN',
  REGULAR = 'REGULAR',
  VIP = 'VIP'
}

export const filters = [
  { id: 1, name: 'All', filterName: FILTERS.SHOW_ALL },
  { id: 2, name: 'Incompleted', filterName: FILTERS.SHOW_INCOMPLETED },
  { id: 3, name: 'Completed', filterName: FILTERS.SHOW_COMPLETED }
];
