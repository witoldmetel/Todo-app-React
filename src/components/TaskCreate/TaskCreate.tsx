import React from 'react';

export default class TaskCreate extends React.Component {
  state = {
    title: '',
    description: '',
  };

  private onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({
      [e.target.id]: e.target.value,
    });
  };

  private onSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    console.log(this.state);
  };

  public render() {
    return (
      <form className="ui form" onSubmit={this.onSubmit}>
        <div className="field">
          <label htmlFor="title">Title</label>
          <input type="text" id="title" name="title" placeholder="Title" onChange={this.onChange} />
        </div>
        <div className="field">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            id="description"
            name="description"
            placeholder="Task description"
            onChange={this.onChange}
          />
        </div>
        <button className="ui button" type="submit">
          Create
        </button>
      </form>
    );
  }
}
