import { combineReducers } from 'redux';
import todosReducer from './todos';
import keywordReducer from './keyword'
import filtersReducer from './filters';

const rootReducer = combineReducers({
    todos: todosReducer,
    keyword: keywordReducer,
    filters: filtersReducer
});

export default rootReducer;