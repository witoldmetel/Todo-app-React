import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { TaskList, UserPanel } from '../index';

import './Dashboard.scss';

class Dashboard extends React.Component {
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
      <Redirect to="/signin" />
    );
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps)(Dashboard);
