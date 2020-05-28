import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Navbar, Dashboard, TaskEdit, SignInComponent, SignUpComponent, TaskCreate, TaskRemove } from './components';

import './App.scss';

export default class App extends React.Component {
  public render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/" exact component={Dashboard} />
          <Route path="/task/new" exact component={TaskCreate} />
          <Route path="/task/edit/:id" component={TaskEdit} />
          <Route path="/task/delete/:id" component={TaskRemove} />
          <Route path="/signin" component={SignInComponent} />
          <Route path="/signup" component={SignUpComponent} />
        </Switch>
      </BrowserRouter>
    );
  }
}
