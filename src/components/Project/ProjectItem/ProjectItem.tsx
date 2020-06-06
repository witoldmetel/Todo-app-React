import React from 'react';

import { Project } from '../../../fixtures/types';

export interface Props {
  id?: string;
  project: Project;
}

class ProjectItem extends React.Component<Props> {
  public render() {
    const { projectName, description, author, authorId } = this.props.project;

    return (
      <React.Fragment>
        <a className="ui card" href="http://www.dog.com">
          <div className="content">
            <div className="header">{projectName}</div>
            <div className="meta">
              <span className="category">{description}</span>
            </div>
          </div>
          <div className="extra content">
            <div className="right floated author">
              <img className="ui avatar image" src={`https://api.adorable.io/avatars/${authorId}.png`} /> {author}
            </div>
          </div>
        </a>
      </React.Fragment>
    );
  }
}

export default ProjectItem;
