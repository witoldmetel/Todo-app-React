import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import { Navbar, TaskList } from './containers';

import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <TaskList />
      </BrowserRouter>
    );
  }
}
