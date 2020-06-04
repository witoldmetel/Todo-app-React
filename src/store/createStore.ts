import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { getFirebase } from 'react-redux-firebase';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

import reducers from './reducers';

const firebaseConfig = {
  apiKey: 'AIzaSyB6VZe0Bq4uuYkRwtz-Fi50KUdRum7BFPY',
  authDomain: 'react-todo-app-2940e.firebaseapp.com',
  databaseURL: 'https://react-todo-app-2940e.firebaseio.com',
  projectId: 'react-todo-app-2940e',
  storageBucket: 'react-todo-app-2940e.appspot.com',
  messagingSenderId: '849165386693',
  appId: '1:849165386693:web:40b2c8bae92ca10bd3c1ac',
  measurementId: 'G-84QYSS1Q5F',
};

// Optional react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  useFirestoreForProfile: true, // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

// Initialize Cloud Firestore through Firebase
firebase.firestore();

const initialState = {};

// Optional redux state logger
// provide useful log message in browser console regarding redux state
// const reduxLogger = createLogger();

const middlewares = [thunk.withExtraArgument({ getFirebase, getFirestore })];

// App store
export const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(...middlewares), reduxFirestore(firebase)),
);

// React-redux-firebase provider props
export const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
  createFirestoreInstance,
};
