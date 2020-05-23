import { combineReducers } from 'redux';

import { tasksReducer } from './tasksReducer';
import { searchReducer } from './searchReducer';
import { filtersReducer } from './filtersReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  keyword: searchReducer,
  filters: filtersReducer,
});

export default rootReducer;
