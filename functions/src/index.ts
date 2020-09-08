import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const createNotification = (notification: any) => {
  return admin
    .firestore()
    .collection('notifications')
    .add(notification)
    .then((doc) => console.log(doc));
};

export const projectCreated = functions.firestore.document('projects/{projectId}').onCreate((doc) => {
  const project = doc.data();
  const notification = {
    content: 'Added a new project',
    user: `${project.author}`,
    time: admin.firestore.FieldValue.serverTimestamp(),
  };

  return createNotification(notification);
});

export const userJoined = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((doc) => {
      const newUser = doc.data();
      const notification = {
        content: 'Joined new user',
        user: `${newUser?.username}`,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };

      return createNotification(notification);
    });
});
