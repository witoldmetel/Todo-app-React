import { combineReducers } from 'redux';
import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import { projectsReducer } from './projectsReducer';
import { tasksReducer } from './tasksReducer';
import { searchReducer } from './searchReducer';
import { filtersReducer } from './filtersReducer';
import { authReducer } from './authReducer';
import { contactReducer } from './contactReducer';

const rootReducer = combineReducers({
  projects: projectsReducer,
  tasks: tasksReducer,
  searchValue: searchReducer,
  filters: filtersReducer,
  auth: authReducer,
  contact: contactReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
});

export default rootReducer;
