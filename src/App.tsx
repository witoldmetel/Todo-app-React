import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Navbar } from './containers';
import { Dashboard, TaskEdit, SignInComponent, SignUpComponent } from './components';

import './App.scss';

export default class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/task/:id" component={TaskEdit} />
          <Route path="/signin" component={SignInComponent} />
          <Route path="/signup" component={SignUpComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}
