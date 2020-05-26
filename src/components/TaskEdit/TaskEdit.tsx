import React from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';

import { getTasks, editTask } from '../../store/actions';
import { RandomImg } from '../index';

export interface Props {
  task: any;
  history: any;
  getTasks: () => void;
  editTask: (task: any) => void;
}

class TaskEdit extends React.Component<Props> {
  state = {
    title: '',
    description: '',
  };

  public componentDidMount() {
    this.props.getTasks();
  }

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.state.title.trim() !== '' || this.state.description.trim()) {
      this.props.editTask(this.state);
      this.setState({ title: '', description: '' });
    }
  };

  private onCancelClick = () => {
    this.setState({ title: '', description: '' });

    this.props.history.push('/');
  };

  public render() {
    return !this.props.task ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading tasks</div>
      </div>
    ) : (
      <div className="task-content">
        <RandomImg randomFace={this.props.task.id} />
        <form className="ui action input" onSubmit={this.onFormSubmit}>
          <input
            type="text"
            id="title"
            placeholder="task title"
            value={this.props.task.title}
            onChange={this.onInputChange}
          ></input>
          <input
            type="text"
            id="description"
            placeholder="description"
            value={this.props.task.description}
            onChange={this.onInputChange}
          ></input>
          <button className="ui positive button " type="submit">
            <i className="check icon"></i>
          </button>
          <button className="ui negative button" onClick={this.onCancelClick}>
            <i className="times icon"></i>
          </button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return { task: state.tasks.find((task) => task.id === ownProps.match.params.id) };
};

export default compose(
  connect(mapStateToProps, { getTasks, editTask }),
  // firestoreConnect([{ collection: 'tasks' }]),
)(TaskEdit as any);
