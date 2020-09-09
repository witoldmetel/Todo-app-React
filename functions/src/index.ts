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

/**
 * Project Functions
 */
export const projectCreated = functions.firestore.document('projects/{projectId}').onCreate((doc) => {
  const project = doc.data();
  const notification = {
    content: 'created a new project',
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
      content: `changed crew members in ${before.projectName} project`,
      user: before.author,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };

    return createNotification(notification);
  }

  return null;
});

/**
 * Task Functions
 */
export const taskCreated = functions.firestore.document('projects/{projectId}/tasks/{taskId}').onCreate((doc) => {
  const task = doc.data();
  const notification = {
    content: 'created a new task',
    user: task.author,
    time: admin.firestore.FieldValue.serverTimestamp(),
  };

  return createNotification(notification);
});

export const taskUpdated = functions.firestore.document('projects/{projectId}/tasks/{taskId}').onUpdate((change) => {
  const before = change.before.data();
  const after = change.after.data();

  if (before.title !== after.title) {
    const notification = {
      content: `changed task title to ${after.title}`,
      user: before.author,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };

    return createNotification(notification);
  }

  if (before.description !== after.description) {
    const notification = {
      content: `changed description for ${after.title} task`,
      user: before.author,
      time: admin.firestore.FieldValue.serverTimestamp(),
    };

    return createNotification(notification);
  }

  return null;
});

export const taskDelete = functions.firestore.document('projects/{projectId}/tasks/{taskId}').onDelete((doc) => {
  const task = doc.data();
  const notification = {
    content: `removed ${task.title} task`,
    user: task.author,
    time: admin.firestore.FieldValue.serverTimestamp(),
  };

  return createNotification(notification);
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
