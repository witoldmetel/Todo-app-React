import { createSelector } from 'reselect';

import { FILTERS } from '../../fixtures/constants';
import { Task } from '../../fixtures/types';

const fetchTasks = (state) => state.firestore.ordered.tasks;
const getSearchValue = (state) => state.searchValue;
const getFilters = (state) => state.filters;

export const getTasksSelector = createSelector(
  [fetchTasks, getSearchValue, getFilters],
  (tasks, searchValue, filters) => {
    if (tasks) {
      switch (filters) {
        case FILTERS.SHOW_ALL:
          return tasks.filter((task: Task) => task.title?.toLowerCase().includes(searchValue?.toLowerCase()));

        case FILTERS.SHOW_COMPLETED:
          return tasks.filter((task: Task) => task.status).filter((task: Task) => task.title.includes(searchValue));

        case FILTERS.SHOW_INCOMPLETED:
          return tasks.filter((task: Task) => !task.status).filter((task: Task) => task.title.includes(searchValue));

        default:
          return tasks;
      }
    }
  }
);
