import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { addTask } from '../../store/actions';

export interface Props {
  addTask: (text: string) => void;
}
class TaskCreate extends React.Component<Props> {
  state = {
    text: '',
  };

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };

  private onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.state.text.trim() !== '') {
      this.props.addTask(this.state.text.trim());
      this.setState({ text: '' });
    }
  };

  public render() {
    return (
      <form className="ui action input" onSubmit={this.onFormSubmit}>
        <input type="text" placeholder="Add new task" value={this.state.text} onChange={this.onInputChange}></input>
        <button className="ui button" type="submit">
          Add Task
        </button>
      </form>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      addTask: addTask,
    },
    dispatch,
  );
}

export default connect(null, mapDispatchToProps)(TaskCreate as any);
