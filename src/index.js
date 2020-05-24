import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'; // middleware to dispatch functions instead of action objects and the middleware executes the function
import { createLogger } from 'redux-logger';
import { reduxFirestore, getFirestore, createFirestoreInstance } from 'redux-firestore';
import { ReactReduxFirebaseProvider, getFirebase } from 'react-redux-firebase';
import firebase from 'firebase/app';

import config from './config/config';
import reducers from './store/reducers';
import App from './App';

// provide useful log message in browser console regarding redux state
const reduxLogger = createLogger();

const store = createStore(
  reducers,
  compose(applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore }), reduxLogger)),
  reduxFirestore(firebase, config),
);

const firebaseProviderConfig = {
  firebase,
  config,
  dispatch: store.dispatch,
  createFirestoreInstance,
};

ReactDOM.render(
  <Provider store={store}>
    <ReactReduxFirebaseProvider {...firebaseProviderConfig}>
      <App />
    </ReactReduxFirebaseProvider>
  </Provider>,
  document.getElementById('root'),
);
