// Initialize Firebase
import * as firebase from 'firebase';
// import { config } from './firebaseConfig';

const config = {
  apiKey: 'Your API KEY',
  authDomain: 'your auth domain',
  databaseURL: 'your database url',
  projectId: 'your project id',
};

firebase.initializeApp(config);

export const database = firebase.database();
