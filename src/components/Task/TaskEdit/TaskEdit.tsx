import React from 'react';
import { History } from 'history';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';
import { Redirect } from 'react-router-dom';

import { Task, Auth } from '../../../fixtures/types';
import { getTask, updateTask } from '../../../store/actions';
import { Modal, Button } from '../../index';

export interface Props {
  projectId: string;
  id: string;
  task: Task;
  auth: Auth;
  history: History;
  getTask: (id: string, projectId: string) => void;
  updateTask: (task: Task, id: string, projectId: string, callback) => void;
}

export interface State {
  title: string;
  description: string;
  errorMessage: string;
  [key: string]: string;
}

class TaskEdit extends React.Component<Props, State> {
  state = {
    title: this.props.task?.title || '',
    description: this.props.task?.description || '',
    errorMessage: ''
  };

  public componentDidMount() {
    this.props.getTask(this.props.id, this.props.projectId);
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.task !== this.props.task && prevProps.task === null) {
      this.setState({
        title: this.props.task.title,
        description: this.props.task.description
      });
    }
  }

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value } as State);
  };

  private get errorMessage() {
    return this.state.errorMessage ? <div className="ui red message">{this.state.errorMessage}</div> : null;
  }

  private get content() {
    return (
      <div className="ui form content">
        <div className="field">
          <label>Title</label>
          <input
            type="text"
            id="title"
            placeholder="task title"
            value={this.state.title}
            onChange={this.onInputChange}
          />
        </div>
        <div className="field">
          <label>Description</label>
          <input
            type="text"
            id="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.onInputChange}
          />
        </div>
        {this.errorMessage}
      </div>
    );
  }

  private handleSubmit = () => {
    if (this.state.title.trim().length && this.state.description.trim().length) {
      this.props.updateTask(this.state, this.props.id, this.props.projectId, this.handleCancel);
    } else {
      this.setState({ errorMessage: 'Task fields are empty' });
    }
  };

  private handleCancel = () => this.props.history.goBack();

  private get actionButtons() {
    return (
      <React.Fragment>
        <Button label="Ok" className="positive" onClick={this.handleSubmit} />
        <Button label="Cancel" onClick={this.handleCancel} />
      </React.Fragment>
    );
  }

  public render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/" />;

    return !this.props.task ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading task</div>
      </div>
    ) : (
      <Modal
        header="Edit Task"
        content={this.content}
        actionButtons={this.actionButtons}
        history={this.props.history}
      />
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
    auth: state.firebase.auth
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
        storeAs: 'tasks'
      }
    ];
  }),
  connect(mapStateToProps, { getTask, updateTask })
)(TaskEdit);
