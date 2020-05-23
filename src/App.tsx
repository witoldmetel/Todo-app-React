import React from 'react';

import { Navbar, TaskList } from './containers';

import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Navbar />
        <TaskList />
      </React.Fragment>
    );
  }
}
