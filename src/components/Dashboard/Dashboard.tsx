import React from 'react';

import { TaskList, UserPanel } from '../../containers';

import './Dashboard.scss';

export default class Dashboard extends React.Component {
  public render() {
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
}
