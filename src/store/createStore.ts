import { configureStore } from '@reduxjs/toolkit';
import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import logger from 'redux-logger';

import 'firebase/firestore';

import firebase from '../services/firebase';
import { rootReducer } from './reducers';

// Optional react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize Cloud Firestore through Firebase
firebase.firestore();

//@todo: Check if we need initial state
const initialState = {};

// App store
export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: { extraArgument: { getFirebase, getFirestore } }, serializableCheck: false }),
  enhancers: [reduxFirestore(firebase)]
});

// React-redux-firebase provider props
export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance
};
