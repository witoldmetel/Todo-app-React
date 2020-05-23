import React from 'react';

export interface Props {
  addTask: (text: string) => void;
}

export default class InputBar extends React.Component<Props> {
  state = {
    text: '',
  };

  onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ text: e.target.value });
  };

  onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.state.text.trim() !== '') {
      this.props.addTask(this.state.text.trim());
      this.setState({ text: '' });
    }
  };

  render() {
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
