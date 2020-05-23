import React from 'react';

import { Navbar, TaskList, UserPanel } from '../../containers';

import './Dashboard.scss';

export default class Dashboard extends React.Component {
  public render() {
    return (
      <React.Fragment>
        <Navbar />
        <h1>Task List</h1>
        <div className="dashboard">
          <TaskList />
          <UserPanel />
        </div>
      </React.Fragment>
    );
  }
}
