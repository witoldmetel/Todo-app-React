# Fire Jira

## App Info

Fire Jira is an app that has essentially the core Jira's functionality. A project created to increase programming skills, implement new features, problem solving and manage the project.

## Demo Page

https://fire-jira.firebaseapp.com/

Login: joedoe@firejira.com  
Pass: firejira

## Firestore (Firebase) configuration

In `services` folder you need to add file `firebaseConfig.ts` with your firebase configuration:

```ts
export const FIREBASE_CONFIG = {
  apiKey: 'your API key',
  authDomain: 'your auth domain',
  databaseURL: 'your database url',
  projectId: 'your project id'
};
```

You can take this configuration from `https://firebase.google.com/`

### Why I use firebase?

Firebase is back-end as service which mean that it allows us to do serveless computing. We don't have to set up our own server to build apps or websites.

- Cloud Functions for Firebase (It allows us to write and run server-side on firebase and that code can interact with other firebase services like database or authentication etc. Code wrote by us is packaged into function and deployed to firebase. Each function can do something different. In my app, I use it to set notifications. Firebase cloud functions are run on node.js environment (Node 8.0 - free version but depracated))

## Deployment

For deployment application, I used `firebase hosting` along with `github actions`. I prepared simple workflow YAML script for Node.js. For trigger that script, user have to push some changes to master branch.

**IMPORTANT NOTE**

Script worked only for WSL/ Ubuntu system

Reference: https://stackoverflow.com/questions/58362374/github-actions-how-to-run-services-on-windows-or-macos

## Storybook

I've started to write interactive documentation in `Storybook`. It isn't hosted yet so if you want to check it, you have to type the command:

```
yarn storybook
```
