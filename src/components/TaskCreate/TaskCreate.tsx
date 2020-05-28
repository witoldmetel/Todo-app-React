import React from 'react';
import { connect } from 'react-redux';

import { Task } from '../../fixtures/types';
import { createTask } from '../../store/actions';

export interface Props {
  history: any;
  createTask: (task: Task) => void;
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
      this.props.createTask(this.state);
      this.setState({ title: '', description: '' });
    }

    this.props.history.push('/');
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

  private onCancelClick = () => this.props.history.push('/');

  public render() {
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

export default connect(null, { createTask })(TaskCreate);
