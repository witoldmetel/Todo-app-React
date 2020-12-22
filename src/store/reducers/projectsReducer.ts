import {
  GET_PROJECTS,
  GET_PROJECT,
  CREATE_PROJECT,
  PROJECT_ERROR,
  ASSIGN_MEMBERS,
  REMOVE_MEMBER
} from '../../fixtures/constants';
import { Project } from '../../fixtures/types';

type Action = { type: string; payload?: any; error?: string };

export const projectsReducer = (state = [], action: Action) => {
  switch (action.type) {
    case GET_PROJECTS:
      const projects: Project[] = [];

      action.payload.forEach((doc: Project) => {
        projects.push({
          id: doc.id,
          author: doc.author,
          authorId: doc.authorId,
          projectName: doc.projectName,
          description: doc.description,
          members: doc.members
        });
      });

      return {
        ...state,
        projects
      };

    case GET_PROJECT:
      return state;

    case CREATE_PROJECT:
      return state;

    case PROJECT_ERROR:
      return state;

    case ASSIGN_MEMBERS:
      return state;

    case REMOVE_MEMBER:
      return state;

    default:
      return state;
  }
};
