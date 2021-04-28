import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import { projectsReducer } from './projectsReducer';
import { tasksReducer } from './tasksReducer';
import { searchReducer } from './searchReducer';
import { filtersReducer } from './filtersReducer';
import { authReducer } from './authReducer';

export const rootReducer = {
  projects: projectsReducer,
  tasks: tasksReducer,
  searchValue: searchReducer,
  filters: filtersReducer,
  auth: authReducer,
  firebase: firebaseReducer,
  firestore: firestoreReducer
};
