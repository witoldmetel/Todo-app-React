import firebase from 'firebase/app';

import 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCWFCwY_BqYeh8sgC_mWL52Cvv4jLk42nA',
  authDomain: 'react-todo-app-e6d4a.firebaseapp.com',
  databaseURL: 'https://react-todo-app-e6d4a.firebaseio.com',
  projectId: 'react-todo-app-e6d4a',
  storageBucket: 'react-todo-app-e6d4a.appspot.com',
  messagingSenderId: '247883843020',
  appId: '1:247883843020:web:9524c9fcaa341a463fc969',
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

export default firebase;
