import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { isLoaded } from 'react-redux-firebase';

import { getProjects, getSnapProjects } from '../../../store/actions';
import { ACCOUNT_TYPE } from '../../../fixtures/constants';
import { Project, NewUser, User } from '../../../fixtures/types';
import { ProjectItem } from '../index';

import './ProjectList.scss';

export interface Props {
  authId: string;
  profile: NewUser;
  projects: Project[];
  getProjects: () => void;
  getSnapProjects: any;
}

class ProjectList extends React.Component<Props> {
  public componentDidMount() {
    this.props.getProjects();
  }

  private get projects() {
    return this.props.projects.filter((project) =>
      (project.members as User[]).some((member) => member.id === this.props.authId)
    );
  }

  //@todo: Remove when above condition will work
  // private get isUserHasProject() {
  //   const { projects } = this.props;

  //   return projects.some((project) => (project.members as User[]).some((member) => member.id === this.props.authId));
  // }

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

  //@todo: Check if still needed
  private get emptyContent() {
    return this.props.profile.accountType === ACCOUNT_TYPE.REGULAR
      ? 'Project list is empty. You are not assign to any project'
      : 'Project list is empty. Create new project';
  }

  private get renderList() {
    return !this.projects.length
      ? this.emptyList
      : this.projects.map((project: Project, index: number) => {
          return <ProjectItem key={index} project={project} />;
        });
  }

  private onClick = () => {
    this.props.getSnapProjects(this.props.projects);
  };

  public render() {
    if (!isLoaded(this.props?.projects)) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading page...</div>
        </div>
      );
    }

    return (
      <div className="projects-container">
        {this.renderList}
        <button onClick={this.onClick}>Load More</button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    profile: state.firebase.profile,
    projects: state.projects.projects
  };
};

export default connect(mapStateToProps, { getProjects, getSnapProjects })(ProjectList);
