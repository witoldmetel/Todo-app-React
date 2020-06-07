import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

import { Task, Auth } from '../../../fixtures/types';
import { getTask, deleteTask } from '../../../store/actions';

export interface Props {
  projectId: string;
  id: string;
  task: Task;
  auth: Auth;
  history: any;
  getTask: (id: string, projectId: string) => void;
  deleteTask: (id: string, projectId: string) => void;
}

class TaskRemove extends React.Component<Props> {
  public componentDidMount() {
    this.props.getTask(this.props.id, this.props.projectId);
  }

  private onConfirmClick = () => {
    this.props.deleteTask(this.props.id, this.props.projectId);

    this.props.history.goBack();
  };

  private onCancelClick = () => this.props.history.goBack();

  public render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return !this.props.task ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading task</div>
      </div>
    ) : (
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className="ui tiny modal visible active">
          <div className="header">Delete Task</div>
          <div className="content">Are you sure you want to delete this task?</div>
          <div className="actions">
            <button className="ui negative button" onClick={this.onConfirmClick}>
              Ok
            </button>
            <button className="ui button" onClick={this.onCancelClick}>
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  const projectPathname = ownProps.location.pathname;
  //@todo: Refactoring this
  const projectId = projectPathname.substring(0, projectPathname.lastIndexOf('/task')).replace('/project/', '');
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.tasks;
  const task = tasks ? tasks[id] : null;

  return {
    projectId,
    task,
    id,
    auth: state.firebase.auth,
  };
};

export default compose(
  firestoreConnect((props: any) => {
    const projectPathname = props.location.pathname;
    //@todo: Refactoring this
    const projectId = projectPathname.substring(0, projectPathname.lastIndexOf('/task')).replace('/project/', '');

    return [
      {
        collection: 'projects',
        doc: projectId,
        subcollections: [{ collection: 'tasks' }],
        storeAs: 'tasks',
      },
    ];
  }),
  connect(mapStateToProps, { getTask, deleteTask }),
)(TaskRemove);
