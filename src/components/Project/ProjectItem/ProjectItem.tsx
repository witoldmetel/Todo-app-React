import React from 'react';
import { Link } from 'react-router-dom';

import { Project } from '../../../fixtures/types';
import { RandomAvatar } from '../../index';

export interface Props {
  project: Project;
}

class ProjectItem extends React.Component<Props> {
  public render() {
    const { id, projectName, description, author, authorId } = this.props.project;

    return (
      <Link className="ui card" to={`/project/${id}`}>
        <div className="content">
          <div className="header">{projectName}</div>
          <div className="meta">
            <span className="category">{description}</span>
          </div>
        </div>
        <div className="extra content">
          <div className="right floated author">
            <RandomAvatar className="ui avatar image" randomFace={authorId} />
            {author}
          </div>
        </div>
      </Link>
    );
  }
}

export default ProjectItem;
