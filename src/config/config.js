// Initialize Firebase
import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyBUqV3J9xxxQql6ofFiuc42oLEx6KsKCxA",
    authDomain: "todo-react-app-3f051.firebaseapp.com",
    databaseURL: "https://todo-react-app-3f051.firebaseio.com",
    projectId: "todo-react-app-3f051",
    storageBucket: "",
    messagingSenderId: "943677221812"
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;