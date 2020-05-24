import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'; // middleware to dispatch functions instead of action objects and the middleware executes the function
import { createLogger } from 'redux-logger';

import App from './App';
import reducers from './store/reducers';

const persistedState = localStorage.getItem('reduxState') ? JSON.parse(localStorage.getItem('reduxState')) : {};

// provide useful log message in browser console regarding redux state
const reduxLogger = createLogger();

const store = createStore(reducers, persistedState, applyMiddleware(reduxThunk, reduxLogger));

store.subscribe(() => {
  localStorage.setItem('reduxState', JSON.stringify(store.getState()));
});

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
