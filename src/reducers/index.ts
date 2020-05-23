import { combineReducers } from 'redux';

import tasksReducer from './tasks';
import keywordReducer from './keyword';
import filtersReducer from './filters';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  keyword: keywordReducer,
  filters: filtersReducer,
});

export default rootReducer;
