import React from 'react';

import { Project } from '../../../fixtures/types';

export interface Props {
  id?: string;
  project: Project;
}

class ProjectItem extends React.Component<Props> {
  public render() {
    const { projectName } = this.props.project;

    return (
      <li className="project-item">
        <div className="project-header">
          <h3 className="title">{projectName}</h3>
        </div>
      </li>
    );
  }
}

export default ProjectItem;
