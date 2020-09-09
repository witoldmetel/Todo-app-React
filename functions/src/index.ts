import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';

admin.initializeApp(functions.config().firebase);

const createNotification = (notification: any) => {
  return admin.firestore().collection('notifications').add(notification);
};

/**
 * Project Functions
 */
export const projectCreated = functions.firestore.document('projects/{projectId}').onCreate((doc) => {
  const project = doc.data();
  const notification = {
    content: 'create a new project',
    user: project.author,
    time: admin.firestore.FieldValue.serverTimestamp(),
  };

  return createNotification(notification);
});

export const projectUpdate = functions.firestore.document('projects/{projectId}').onUpdate((change) => {
  const before = change.before.data();
  const after = change.after.data();

  if (before.members.length !== after.members.length) {
    const notification = {
      content: `change crew members in ${before.projectName} project`,
      user: before.author,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };

    return createNotification(notification);
  }

  return null;
});

/**
 * User Functions
 */
export const userJoined = functions.auth.user().onCreate((user) => {
  return admin
    .firestore()
    .collection('users')
    .doc(user.uid)
    .get()
    .then((doc) => {
      const newUser = doc.data();
      const notification = {
        content: 'joined to Fire Jira',
        user: newUser?.username,
        time: admin.firestore.FieldValue.serverTimestamp(),
      };

      return createNotification(notification);
    });
});
