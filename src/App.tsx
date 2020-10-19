import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Project } from './fixtures/types';
import {
  Navbar,
  Dashboard,
  ProjectCreate,
  MembersModal,
  SignInComponent,
  SignUpComponent,
  TaskCreate,
  TaskRemove,
  TaskList,
  TaskEdit,
  UnknownPage
} from './components';
import {
  HOME,
  LOGIN,
  REGISTER,
  PROJECT_NEW,
  PROJECT,
  TASK_NEW,
  TASK_EDIT,
  TASK_DELETE,
  TASK_MEMBERS
} from './fixtures/routes';

import './App.scss';

export interface Props {
  projects: Project[];
}

class App extends React.Component<Props> {
  public render() {
    return (
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route path={HOME} exact component={Dashboard} />
          <Route path={LOGIN} exact component={SignInComponent} />
          <Route path={REGISTER} exact component={SignUpComponent} />
          <Route path={PROJECT_NEW} exact component={ProjectCreate} />
          <Route path={PROJECT} exact component={TaskList} />
          <Route path={TASK_NEW} exact component={TaskCreate} />
          <Route path={TASK_EDIT} exact component={TaskEdit} />
          <Route path={TASK_DELETE} exact component={TaskRemove} />
          <Route path={TASK_MEMBERS} exact component={MembersModal} />
          <Route component={UnknownPage} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
