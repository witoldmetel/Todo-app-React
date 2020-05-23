import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Navbar } from './containers';
import { Dashboard, TaskEdit } from './components';

import './App.scss';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/task/:id" component={TaskEdit} />
        </Switch>
      </BrowserRouter>
    );
  }
}
