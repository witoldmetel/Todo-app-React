import React from 'react';
import { connect } from 'react-redux';

import { Auth } from '../../fixtures/types';
import { TaskList, UserPanel } from '../index';

import './Dashboard.scss';

export interface Props {
  auth: Auth;
}

class Dashboard extends React.Component<Props> {
  public render() {
    const { auth } = this.props;

    return auth.uid ? (
      <React.Fragment>
        <h1>Task List</h1>
        <div className="dashboard">
          <TaskList />
          <UserPanel />
        </div>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <h1>Task List</h1>
        <div className="dashboard">{`You don't have access. Log in to service or register.`}</div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Dashboard);
