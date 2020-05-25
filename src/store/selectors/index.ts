import { createSelector } from 'reselect';

import { FILTERS } from '../../fixtures/constants';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

const fetchTasks = (state) => state.firestore.ordered.tasks;
const getSearchValue = (state) => state.searchValue;
const getFilters = (state) => state.filters;

export const getTasksSelector = createSelector(
  [fetchTasks, getSearchValue, getFilters],
  (tasks, searchValue, filters) => {
    switch (filters) {
      case FILTERS.SHOW_ALL:
        return tasks.filter((task: Task) => task.title?.toLowerCase().indexOf(searchValue) !== -1);

      case FILTERS.SHOW_COMPLETED:
        return tasks.filter((task: Task) => task.status);

      case FILTERS.SHOW_INCOMPLETED:
        return tasks.filter((task: Task) => !task.status);

      default:
        return tasks;
    }
  },
);
