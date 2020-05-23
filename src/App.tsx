import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Dashboard from './components/Dashboard/Dashboard';

import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Dashboard />
      </BrowserRouter>
    );
  }
}
