import { GET_PROJECTS, GET_PROJECT, CREATE_PROJECT, PROJECT_ERROR } from '../../fixtures/constants';
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
          tasks: doc.tasks,
        });
      });

      return {
        ...state,
        projects,
      };

    case GET_PROJECT:
      return state;

    case CREATE_PROJECT:
      return state;

    case PROJECT_ERROR:
      return state;

    default:
      return state;
  }
};
