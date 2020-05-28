import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Task } from '../../fixtures/types';
import { MODAL_SIZES } from '../../fixtures/constants';
import { getTask, deleteTask } from '../../store/actions';
import { Dialog } from '../index';

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

  public render() {
    return !this.props.task ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading task</div>
      </div>
    ) : (
      <Dialog
        title="Delete Task"
        content="Are you sure you want to delete this task?"
        modalSize={MODAL_SIZES.TINY}
        history={this.props.history}
        onConfirmClick={this.onConfirmClick}
      />
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
