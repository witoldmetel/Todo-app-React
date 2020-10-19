export const HOME = '/';

export const LOGIN = '/signin';
export const REGISTER = '/signup';

/**
 * PROJECT ROUTES
 */
export const PROJECT_NEW = '/project/new';
export const PROJECT = '/project/:id';

/**
 * TASK ROUTES
 */
export const TASK_NEW = `${PROJECT}/task/new`;
export const TASK_EDIT = `${PROJECT}/task/edit/:id`;
export const TASK_DELETE = `${PROJECT}/task/delete/:id`;
export const TASK_MEMBERS = `${PROJECT}/members`;
