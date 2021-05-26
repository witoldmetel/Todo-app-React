import React, { Suspense, useDispatch } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { AuthCheck } from 'reactfire';

import {
  DEFAULT,
  SIGNIN,
  SIGNUP,
  PROJECT_NEW,
  PROJECT,
  PROJECT_MEMBERS,
  TASK_NEW,
  TASK_EDIT,
  TASK_DELETE
} from './fixtures/routes';
import { Navbar, LandingPage } from './components';
import { setAuthListener } from './store/Auth/authSlice';

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

const App = () => {
  const dispatch = useDispatch();

  (async () => await dispatch(setAuthListener()))();

  const NavRoute = ({ exact = true, path, component: Component }: { exact: boolean; path: string; component }) => (
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

  return (
    <Suspense
      fallback={
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading page...</div>
        </div>
      }
    >
      <AuthCheck fallback={<LandingPage />}>
        <BrowserRouter>
          <Switch>
            <NavRoute path={DEFAULT} exact component={Dashboard} />
            <NavRoute path={SIGNIN} exact component={SignInComponent} />
            <NavRoute path={SIGNUP} exact component={SignUpComponent} />
            <NavRoute path={PROJECT_NEW} exact component={ProjectCreate} />
            <NavRoute path={PROJECT} exact component={TaskList} />
            <NavRoute path={PROJECT_MEMBERS} exact component={MembersModal} />
            <NavRoute path={TASK_NEW} exact component={TaskCreate} />
            <NavRoute path={TASK_EDIT} exact component={TaskEdit} />
            <NavRoute path={TASK_DELETE} exact component={TaskRemove} />
            <Route component={UnknownPage} />
          </Switch>
        </BrowserRouter>
      </AuthCheck>
    </Suspense>
  );
};

export default App;
