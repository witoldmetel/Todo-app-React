import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect, isLoaded } from 'react-redux-firebase';

import { Project } from './fixtures/types';
import {
  Navbar,
  Dashboard,
  ProjectCreate,
  TaskEdit,
  SignInComponent,
  SignUpComponent,
  TaskCreate,
  TaskRemove,
  TaskList,
} from './components';

import './App.scss';

export interface Props {
  projects: Project[];
}

class App extends React.Component<Props> {
  public render() {
    // @todo: Find better solution for auth loading
    return !isLoaded(this.props?.projects) ? (
      <span>Loading...</span>
    ) : (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path="/signin" component={SignInComponent} />
          <Route path="/signup" component={SignUpComponent} />
          <Route path="/" exact component={Dashboard} />
          <Route path="/project/new" exact component={ProjectCreate} />
          <Route path="/project/:id" exact component={TaskList} />
          <Route path="/task/new" exact component={TaskCreate} />
          <Route path="/task/edit/:id" component={TaskEdit} />
          <Route path="/task/delete/:id" component={TaskRemove} />
        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => {
  return { projects: state.firestore.ordered.projects };
};

export default compose(firestoreConnect([{ collection: 'projects' }]), connect(mapStateToProps))(App);
