import { combineReducers } from 'redux';
import todosReducer from './todos';
import filtersReducer from './filters'

const rootReducer = combineReducers({
    todos: todosReducer,
    filters: filtersReducer
});

export default rootReducer;