import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import classnames from 'classnames';

import { getProject, getTasks } from '../../../store/actions';
import { getTasksSelector } from '../../../store/selectors';
import { Task, Project, Auth } from '../../../fixtures/types';
import { TaskItem, FilterBar, SearchBar, NotificationsContainer } from '../../index';

import './TaskList.scss';

export interface Props {
  projectId: string;
  project: Project;
  allTasks: Task[];
  tasks: Task[];
  auth: Auth;
  notifications: any;
  getProject: (id: string) => void;
  getTasks: (projectId: string) => void;
}

class TaskList extends React.Component<Props> {
  public componentDidMount() {
    this.props.getProject(this.props.projectId);
    this.props.getTasks(this.props.projectId);
  }

  private get className() {
    return classnames('list', {
      empty: !this.props.tasks?.length,
    });
  }

  private get emptyList() {
    return !this.props.allTasks.length ? (
      <React.Fragment>
        <h3 className="info">You have no task to do! Add first here:</h3>
        <Link className="add-icon" to={`/project/${this.props.projectId}/task/new`}>
          <i className="plus circle icon green" />
        </Link>
      </React.Fragment>
    ) : (
      <h3 className="info">Filtered list is empty</h3>
    );
  }

  private get renderList() {
    if (!this.props.tasks) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading tasks</div>
        </div>
      );
    }

    return !this.props.tasks.length
      ? this.emptyList
      : this.props.tasks.map((task: Task, index: number) => {
          return <TaskItem key={index} task={task} project={this.props.project} projectId={this.props.projectId} />;
        });
  }

  private get membersButton() {
    const { auth, project } = this.props;

    return auth.uid === project.authorId ? (
      <Link className="ui vertical animated button members" to={`/project/${this.props.projectId}/members`}>
        <div className="hidden content">Members</div>
        <div className="visible content">
          <i className="users icon"></i>
        </div>
      </Link>
    ) : null;
  }

  public render() {
    const { auth, notifications } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return !this.props.project ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading project</div>
      </div>
    ) : (
      <React.Fragment>
        <h1>{this.props.project.projectName}</h1>
        <div className="dashboard">
          <div className="tasks-container">
            <div className="action-panel">
              {this.membersButton}
              <FilterBar />
              <SearchBar />
            </div>
            <ul className={this.className}>{this.renderList}</ul>
          </div>
          <NotificationsContainer authId={auth.uid} notifications={notifications} />
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const projectId = ownProps.match.params.id;
  const projects = state.firestore.data.projects;
  const project = projects ? projects[projectId] : null;

  return {
    project,
    projectId,
    auth: state.firebase.auth,
    allTasks: state.firestore.ordered.tasks,
    tasks: getTasksSelector(state),
    notifications: state.firestore.ordered.notifications,
  };
};

export default compose(
  firestoreConnect((props: any) => {
    return [
      {
        collection: 'projects',
        doc: props.match.params.id,
        subcollections: [{ collection: 'tasks' }],
        storeAs: 'tasks',
        orderBy: ['updatedAt', 'desc'],
      },
      {
        collection: 'notifications',
        limit: 5,
        orderBy: ['time', 'desc'],
      },
    ];
  }),
  connect(mapStateToProps, { getProject, getTasks }),
)(TaskList);
