import { GET_PROJECTS, GET_PROJECT, CREATE_PROJECT, PROJECT_ERROR, ASSIGN_MEMBERS } from '../../fixtures/constants';
import { Project } from '../../fixtures/types';

export const getProjects = () => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('projects')
      .get()
      .then((snapshot) => {
        const projects: Project[] = [];

        snapshot.docs.forEach((doc) => projects.push({ ...doc.data(), id: doc.id } as Project));

        dispatch({ type: GET_PROJECTS, payload: projects });
      })
      .catch((error) => dispatch({ type: PROJECT_ERROR, payload: error }));
  };
};

export const getProject = (projectId: string) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('projects')
      .doc(projectId)
      .get()
      .then((snapshot) => {
        const project = snapshot.doc.data();

        dispatch({ type: GET_PROJECT, payload: { ...project, id: snapshot.doc.data().id } });
      })
      .catch((error) => dispatch({ type: PROJECT_ERROR, payload: error }));
  };
};

export const createProject = (project: Project) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    const profile = getState().firebase.profile;
    const authorId = getState().firebase.auth.uid;

    firestore
      .collection('projects')
      .add({
        ...project,
        author: profile.username,
        authorId,
        members: [authorId],
      })
      .then(() => {
        dispatch({ type: CREATE_PROJECT });
      })
      .catch((error) => dispatch({ type: PROJECT_ERROR, payload: error }));
  };
};

export const assignMembers = (project: Project, projectId: string, members: string[]) => {
  return (dispatch, getState, { getFirestore }) => {
    const firestore = getFirestore();

    firestore
      .collection('projects')
      .doc(projectId)
      .update({ ...project, members: project.members.concat(...members) })
      .then(() => {
        dispatch({ type: ASSIGN_MEMBERS });
      });
  };
};
