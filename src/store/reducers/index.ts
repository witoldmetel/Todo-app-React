import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import { tasksReducer } from './tasksReducer';
import { searchReducer } from './searchReducer';
import { filtersReducer } from './filtersReducer';
import { authReducer } from './authReducer';

const rootReducer = combineReducers({
  tasks: tasksReducer,
  searchValue: searchReducer,
  filters: filtersReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer,
});

export default rootReducer;
