import { combineReducers } from 'redux';
import todosReducer from './todos';
import keywordReducer from './keyword'

const rootReducer = combineReducers({
    todos: todosReducer,
    keyword: keywordReducer
});

export default rootReducer;