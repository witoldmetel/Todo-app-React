import firebase from 'firebase/app';
import 'firebase/auth';

import { FIREBASE_CONFIG } from './firebaseConfig';

// Initialize firebase instance
firebase.initializeApp(FIREBASE_CONFIG);

export default firebase;
