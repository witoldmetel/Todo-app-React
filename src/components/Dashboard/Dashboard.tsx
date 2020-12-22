import React from 'react';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import { compose } from 'redux';

import { Auth } from '../../fixtures/types';
import { ProjectList } from '../index';
import { LandingPage } from './LandingPage/LandingPage';

import './Dashboard.scss';

export interface Props {
  auth: Auth;
}

class Dashboard extends React.Component<Props> {
  public render() {
    const { auth } = this.props;

    if (auth.uid) {
      return (
        <React.Fragment>
          <h1>Projects List</h1>
          <div className="dashboard">
            <ProjectList authId={auth.uid} />
          </div>
        </React.Fragment>
      );
    } else {
      return <LandingPage />;
    }
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.firestore.ordered.projects,
    auth: state.firebase.auth
  };
};

export default compose(firestoreConnect([{ collection: 'projects' }]), connect(mapStateToProps))(Dashboard);
