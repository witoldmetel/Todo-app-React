import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk'; // middleware to dispatch functions instead of action objects and the middleware executes the function
// import createLogger from "redux-logger"; //provide useful log message in browser console

import App from './components/App';
import reducers from './reducers';
import './index.css';

const store = createStore(reducers, {}, applyMiddleware(reduxThunk));

// const store = createStore(reducers);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
    document.getElementById('app')
);
