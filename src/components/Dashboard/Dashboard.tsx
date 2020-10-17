import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { ACCOUNT_TYPE } from '../../fixtures/constants';
import { Auth, Project, NewUser, User } from '../../fixtures/types';
import { ProjectList } from '../index';
import { LandingPage } from './LandingPage/LandingPage';

import './Dashboard.scss';

export interface Props {
  auth: Auth;
  profile: NewUser;
  projects: Project[];
}

class Dashboard extends React.Component<Props> {
  private get emptyContent() {
    return this.props.profile.accountType === ACCOUNT_TYPE.REGULAR
      ? 'Project list is empty. You are not assign to any project'
      : 'Project list is empty. Create new project';
  }

  private get isUserHasProject() {
    const { auth, projects } = this.props;

    return projects.some((project) => (project.members as User[]).some((member) => member.id === auth.uid));
  }

  public render() {
    const { auth } = this.props;

    if (auth.uid) {
      if (!isLoaded(this.props?.projects)) {
        return (
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading page...</div>
          </div>
        );
      }

      if (this.isUserHasProject) {
        return (
          <React.Fragment>
            <h1>Projects List</h1>
            <div className="dashboard">
              <ProjectList authId={auth.uid} />
            </div>
          </React.Fragment>
        );
      } else {
        return <div className="dashboard">{this.emptyContent}</div>;
      }
    } else {
      return <LandingPage />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
    profile: state.firebase.profile,
    projects: state.firestore.ordered.projects
  };
};

export default compose(firestoreConnect([{ collection: 'projects' }]), connect(mapStateToProps))(Dashboard);
