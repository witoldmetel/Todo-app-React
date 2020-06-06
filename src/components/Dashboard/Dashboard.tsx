import React from 'react';
import { connect } from 'react-redux';

import { Auth, Project } from '../../fixtures/types';
import { ProjectList, TaskList, UserPanel } from '../index';

import './Dashboard.scss';

export interface Props {
  auth: Auth;
  profile: any;
  projects: Project[];
}

class Dashboard extends React.Component<Props> {
  public render() {
    const { auth, projects, profile } = this.props;

    if (auth.uid) {
      if (profile.accountType === 'VIP') {
        if (projects.length) {
          return (
            <React.Fragment>
              <h1>Projects List</h1>
              <div className="dashboard">
                <ProjectList />
              </div>
            </React.Fragment>
          );
        } else {
          return <div className="dashboard">List empty. Create projects</div>;
        }
      } else {
        return (
          <React.Fragment>
            <h1>Task List</h1>
            <div className="dashboard">
              <TaskList />
              <UserPanel />
            </div>
          </React.Fragment>
        );
      }
    } else {
      return <div className="dashboard">{`You don't have access. Log in to service or register.`}</div>;
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
