import React from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Task, Auth } from '../../../fixtures/types';
import { createTask } from '../../../store/actions';

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

  private onConfirmClick = () => {
    if (this.state.title.trim() !== '' && this.state.description.trim()) {
      this.props.createTask(this.state, this.props.match.params.id);
      this.setState({ title: '', description: '' });
    }

    this.props.history.push(`/project/${this.props.match.params.id}`);
  };

  private get content() {
    return (
      <form className="ui form">
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
      </form>
    );
  }

  private onCancelClick = () => this.props.history.push(`/project/${this.props.match.params.id}`);

  public render() {
    const { auth } = this.props;

    if (!auth.uid) return <Redirect to="/signin" />;

    return (
      <div className="ui dimmer modals visible active">
        <div onClick={(e) => e.stopPropagation()} className="ui small modal visible active">
          <div className="header">Create Task</div>
          <div className="content">{this.content}</div>
          <div className="actions">
            <button className="ui positive button" onClick={this.onConfirmClick}>
              Create
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

const mapStateToProps = (state) => {
  return { auth: state.firebase.auth };
};

export default connect(mapStateToProps, { createTask })(TaskCreate);
