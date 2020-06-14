import firebase from 'firebase/app';

import 'firebase/auth';

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

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

export default firebase;
