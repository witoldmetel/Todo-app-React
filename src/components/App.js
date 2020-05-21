import React from 'react';

import AppHeader from '../containers/AppHeader';
import TaskList from '../containers/TaskList';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <AppHeader />
        <TaskList />
      </React.Fragment>
    );
  }
}
