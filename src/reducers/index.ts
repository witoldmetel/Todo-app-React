import { combineReducers } from 'redux';

import tasksReducer from './tasks';
import { searchReducer } from './searchReducer';
import { filtersReducer } from './filtersReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  keyword: searchReducer,
  filters: filtersReducer,
});

export default rootReducer;
