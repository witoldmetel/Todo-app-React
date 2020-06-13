import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Task, Auth } from '../../../fixtures/types';
import { createTask } from '../../../store/actions';
import { Modal } from '../../index';

export interface Props {
  match: any;
  auth: Auth;
  history: any;
  createTask: (task: Task, projectId: string) => void;
}

class TaskCreate extends React.Component<Props> {
  state = {
    title: '',
    description: '',
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

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
      </div>
    );
  }

  private handleSubmit = () => {
    if (this.state.title.trim() !== '' && this.state.description.trim() !== '') {
      this.props.createTask(this.state, this.props.match.params.id);
      this.setState({ title: '', description: '' });
    }

    this.props.history.goBack();
  };

  private handleCancel = () => this.props.history.goBack();

  private get actionButtons() {
    return (
      <React.Fragment>
        <button className="ui positive button" onClick={this.handleSubmit}>
          Create
        </button>
        <button className="ui button" onClick={this.handleCancel}>
          Cancel
        </button>
      </React.Fragment>
    );
  }

  public render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return <Modal header="Create Task" content={this.content} actionButtons={this.actionButtons} />;
  }
}

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps, { createTask })(TaskCreate);
