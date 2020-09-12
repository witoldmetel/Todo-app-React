import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getProjects } from '../../../store/actions';
import { Project, User } from '../../../fixtures/types';
import { ProjectItem } from '../index';

import './ProjectList.scss';

export interface Props {
  authId: string;
  projects: Project[];
  getProjects: () => void;
}

class ProjectList extends React.Component<Props> {
  public componentDidMount() {
    this.props.getProjects();
  }

  private get projects() {
    return this.props.projects.filter((project) =>
      (project.members as User[]).some((member) => member.id === this.props.authId),
    );
  }

  private get emptyList() {
    return (
      <React.Fragment>
        <h3 className="info">Add first project here:</h3>
        <Link className="add-icon" to="/project/new">
          <i className="plus circle icon green" />
        </Link>
      </React.Fragment>
    );
  }

  private get renderList() {
    if (!this.projects) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading projects</div>
        </div>
      );
    }

    return !this.projects.length
      ? this.emptyList
      : this.projects.map((project: Project, index: number) => {
          return <ProjectItem key={index} project={project} />;
        });
  }

  public render() {
    return <div className="projects-container">{this.renderList}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
  };
};

export default connect(mapStateToProps, { getProjects })(ProjectList);
