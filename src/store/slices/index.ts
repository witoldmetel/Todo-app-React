import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import filtersReducer from './filtersSlice';
import taskReducer from './taskSlice';

export const rootReducer = {
  filters: filtersReducer,
  task: taskReducer
};
