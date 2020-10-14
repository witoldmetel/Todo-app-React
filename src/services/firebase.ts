import firebase from 'firebase/app';
import 'firebase/auth';

import { FIREBASE_CONFIG } from './firebaseConfig';

const firebaseConfig = FIREBASE_CONFIG
  ? FIREBASE_CONFIG
  : {
      apiKey: 'dummy_value',
      authDomain: 'dummy_value',
      databaseURL: 'https://fire-jira.firebaseio.com',
      projectId: 'fire-jira',
      storageBucket: 'fire-jira.appspot.com',
      messagingSenderId: 'dummy_value',
      appId: 'dummy_value',
      measurementId: 'dummy_value',
    };

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

export default firebase;
