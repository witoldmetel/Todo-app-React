import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { Task } from './fixtures/types';
import { Navbar, Dashboard, TaskEdit, SignInComponent, SignUpComponent, TaskCreate, TaskRemove } from './components';

import './App.scss';

export interface Props {
  tasks: Task[];
}

class App extends React.Component<Props> {
  public render() {
    // @todo: Find better solution for auth loading
    return !isLoaded(this.props?.tasks) ? (
      <span>Loading...</span>
    ) : (
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

const mapStateToProps = (state) => {
  return { tasks: state.firestore.ordered.tasks };
};

export default compose(firestoreConnect([{ collection: 'tasks' }]), connect(mapStateToProps))(App);
