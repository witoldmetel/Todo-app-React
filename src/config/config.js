// Initialize Firebase
import * as firebase from 'firebase';
// import { config } from './firebaseConfig';

const config = {
  apiKey: 'AIzaSyBUqV3J9xxxQql6ofFiuc42oLEx6KsKCxA',
  authDomain: 'todo-react-app.firebaseapp.com',
  databaseURL: 'https://todo-react-app.firebaseio.com',
  projectId: 'todo-react-app-3f051',
};

firebase.initializeApp(config);

export const database = firebase.database();
