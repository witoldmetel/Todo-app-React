import { firebaseReducer } from 'react-redux-firebase';
import { firestoreReducer } from 'redux-firestore';

import filtersReducer from './filtersSlice';

export const rootReducer = {
  filters: filtersReducer
};
