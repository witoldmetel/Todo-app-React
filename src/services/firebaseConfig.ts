// https://stackoverflow.com/questions/37482366/is-it-safe-to-expose-firebase-apikey-to-the-public
// https://medium.com/@devesu/how-to-secure-your-firebase-project-even-when-your-api-key-is-publicly-available-a462a2a58843
export const FIREBASE_CONFIG = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: 'fire-jira.firebaseapp.com',
  databaseURL: 'https://fire-jira.firebaseio.com',
  projectId: 'fire-jira',
  storageBucket: 'fire-jira.appspot.com',
  messagingSenderId: '925649553379',
  appId: '1:925649553379:web:00226c76f9912a1d7502d6',
  measurementId: 'G-4K5M4GYG7R'
};
