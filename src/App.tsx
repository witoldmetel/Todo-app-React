import React, { Suspense } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { Project } from './fixtures/types';
import { Navbar } from './components';

import './App.scss';

const Dashboard = React.lazy(() => import('./components/Dashboard/Dashboard'));
const ProjectCreate = React.lazy(() => import('./components/Project/ProjectCreate/ProjectCreate'));
const MembersModal = React.lazy(() => import('./components/Project/MembersModal/MembersModal'));
const SignInComponent = React.lazy(() => import('./components/SignInComponent/SignInComponent'));
const SignUpComponent = React.lazy(() => import('./components/SignUpComponent/SignUpComponent'));
const TaskCreate = React.lazy(() => import('./components/Task/TaskCreate/TaskCreate'));
const TaskRemove = React.lazy(() => import('./components/Task/TaskRemove/TaskRemove'));
const TaskList = React.lazy(() => import('./components/Task/TaskList/TaskList'));
const TaskEdit = React.lazy(() => import('./components/Task/TaskEdit/TaskEdit'));
const UnknownPage = React.lazy(() => import('./components/UnknownPage/UnknownPage'));

export interface Props {
  projects: Project[];
}

class App extends React.Component<Props> {
  private NavRoute = ({ exact = true, path, component: Component }: { exact: boolean; path: string; component }) => (
    <Route
      exact={exact}
      path={path}
      render={(props) => (
        <React.Fragment>
          <Navbar {...props} />
          <Component {...props} />
        </React.Fragment>
      )}
    />
  );

  public render() {
    const { NavRoute } = this;

    return (
      <Suspense
        fallback={
          <div className="ui active inverted dimmer">
            <div className="ui text loader">Loading page...</div>
          </div>
        }
      >
        <BrowserRouter>
          <Switch>
            <NavRoute path="/" exact component={Dashboard} />
            <NavRoute path="/signin" exact component={SignInComponent} />
            <NavRoute path="/signup" exact component={SignUpComponent} />
            <NavRoute path="/project/new" exact component={ProjectCreate} />
            <NavRoute path="/project/:id" exact component={TaskList} />
            <NavRoute path="/project/:id/members" exact component={MembersModal} />
            <NavRoute path="/project/:id/task/new" exact component={TaskCreate} />
            <NavRoute path="/project/:id/task/edit/:id" exact component={TaskEdit} />
            <NavRoute path="/project/:id/task/delete/:id" exact component={TaskRemove} />
            <Route component={UnknownPage} />
          </Switch>
        </BrowserRouter>
      </Suspense>
    );
  }
}

export default App;
