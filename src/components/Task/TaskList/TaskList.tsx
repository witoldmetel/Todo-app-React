import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { getProject, getTasks } from '../../../store/actions';
import { getTasksSelector } from '../../../store/selectors';
import { Task, Project, Auth } from '../../../fixtures/types';
import { TaskItem, FilterBar, SearchBar, UserPanel } from '../../index';

import './TaskList.scss';

export interface Props {
  projectId: string;
  project: Project;
  tasks: Task[];
  auth: Auth;
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
    return (
      <React.Fragment>
        <h3 className="info">You have no task to do! Add first here:</h3>
        <Link className="add-icon" to={`/project/${this.props.projectId}/task/new`}>
          <i className="plus circle icon green" />
        </Link>
      </React.Fragment>
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
          return <TaskItem key={index} task={task} projectId={this.props.projectId} />;
        });
  }

  public render() {
    const { auth } = this.props;

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
              <FilterBar />
              <SearchBar />
            </div>
            <ul className={this.className}>{this.renderList}</ul>
          </div>
          <UserPanel />
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
    tasks: getTasksSelector(state.tasks),
  };
};

export default connect(mapStateToProps, { getProject, getTasks })(TaskList);
