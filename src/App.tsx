import React from 'react';

import { AppHeader, TaskList } from './containers';

import './App.scss';

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
