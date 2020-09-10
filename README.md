# Fire Jira

## App Info

Fire Jira is an app that has essentially the core Jira's functionality. A project created to increase programming skills, implement new features, problem solving and manage the project.

## Firestore (Firebase) configuration

In `services` folder you need to add file `firebaseConfig.ts` with your firebase configuration:

```ts
export const FIREBASE_CONFIG = {
  apiKey: 'your API key',
  authDomain: 'your auth domain',
  databaseURL: 'your database url',
  projectId: 'your project id',
};
```

You can take this configuration from `https://firebase.google.com/`
