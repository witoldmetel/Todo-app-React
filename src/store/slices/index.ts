import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import taskReducer from './taskSlice';
import filtersReducer from './filtersSlice';

export const rootReducer = {
  task: taskReducer,
  filters: filtersReducer
};
