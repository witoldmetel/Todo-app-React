import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Task } from '../../fixtures/types';
import { getTask, deleteTask } from '../../store/actions';

export interface Props {
  id: string;
  task: Task;
  history: any;
  getTask: (id: string) => void;
  deleteTask: (id: string) => void;
}

class TaskRemove extends React.Component<Props> {
  public componentDidMount() {
    this.props.getTask(this.props.id);
  }

  private onConfirmClick = () => {
    this.props.deleteTask(this.props.id);

    this.props.history.push('/');
  };

  private onCancelClick = () => this.props.history.push('/');

  public render() {
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
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.tasks;
  const task = tasks ? tasks[id] : null;

  return { task, id };
};

export default compose(
  firestoreConnect([{ collection: 'tasks' }]),
  connect(mapStateToProps, { getTask, deleteTask }),
)(TaskRemove);
