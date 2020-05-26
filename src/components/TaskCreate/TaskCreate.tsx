import React from 'react';
import { connect } from 'react-redux';

import { createTask } from '../../store/actions';

export interface Props {
  createTask: (task: any) => void;
}

class TaskCreate extends React.Component<Props> {
  state = {
    title: '',
    description: '',
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.state.title.trim() !== '' || this.state.description.trim()) {
      this.props.createTask(this.state);
      this.setState({ title: '', description: '' });
    }
  };

  public render() {
    return (
      <form className="ui action input" onSubmit={this.onFormSubmit}>
        <input
          type="text"
          id="title"
          placeholder="task title"
          value={this.state.title}
          onChange={this.onInputChange}
        ></input>
        <input
          type="text"
          id="description"
          placeholder="description"
          value={this.state.description}
          onChange={this.onInputChange}
        ></input>
        <button className="ui button" type="submit">
          Add Task
        </button>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    createTask: (task: any) => dispatch(createTask(task)),
  };
};

export default connect(null, mapDispatchToProps)(TaskCreate as any);
