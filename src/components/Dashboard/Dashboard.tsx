import React from 'react';
import { connect } from 'react-redux';

import { ACCOUNT_TYPE } from '../../fixtures/constants';
import { Auth, Project, NewUser, User } from '../../fixtures/types';
import { ProjectList, ParticleComponent } from '../index';

import './Dashboard.scss';

export interface Props {
  auth: Auth;
  profile: NewUser;
  projects: Project[];
}

class Dashboard extends React.Component<Props> {
  private get emptyContent() {
    return this.props.profile.accountType === ACCOUNT_TYPE.REGULAR ? (
      <div className="dashboard">Project list is empty. You are not assign to any project</div>
    ) : (
      <div className="dashboard">Project list is empty. Create new project</div>
    );
  }

  private get isUserHasProject() {
    const { auth, projects } = this.props;

    return projects.some((project) => (project.members as User[]).some((member) => member.id === auth.uid));
  }

  public render() {
    const { auth } = this.props;

    if (auth.uid) {
      if (this.isUserHasProject) {
        return (
          <React.Fragment>
            <h1>Projects List</h1>
            <div className="dashboard">
              <ProjectList />
            </div>
          </React.Fragment>
        );
      } else {
        return this.emptyContent;
      }
    } else {
      return (
        <div className="dashboard particles-container">
          <ParticleComponent />
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projects: state.firestore.ordered.projects,
  };
};

export default connect(mapStateToProps)(Dashboard);
