import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { Task } from '../../fixtures/types';
import { getTask, updateTask } from '../../store/actions';
import { RandomImg } from '../index';

export interface Props {
  id: string;
  task: Task;
  history: any;
  getTask: (id: string) => void;
  updateTask: (task: Task, id: string) => void;
}

class TaskEdit extends React.Component<Props> {
  state = {
    title: this.props.task?.title || '',
    description: this.props.task?.description || '',
  };

  public componentDidMount() {
    this.props.getTask(this.props.id);
  }

  public componentDidUpdate(prevProps) {
    if (prevProps.task !== this.props.task && prevProps.task === null) {
      this.setState({
        title: this.props.task.title,
        description: this.props.task.description,
      });
    }
  }

  private onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ [e.target.id]: e.target.value });
  };

  private onFormSubmit = (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (this.state.title.trim() !== '' && this.state.description.trim()) {
      this.props.updateTask(this.state, this.props.id);
      this.setState({ title: '', description: '' });
    }

    this.props.history.push('/');
  };

  private onCancelClick = () => this.props.history.push('/');

  public render() {
    return !this.props.task ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading tasks</div>
      </div>
    ) : (
      <div className="task-content">
        <RandomImg randomFace={this.props.id} />
        <form className="ui action input" onSubmit={this.onFormSubmit}>
          <input
            type="text"
            id="title"
            placeholder="task title"
            value={this.state.title}
            onChange={this.onInputChange}
          />
          <input
            type="text"
            id="description"
            placeholder="description"
            value={this.state.description}
            onChange={this.onInputChange}
          />
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
  const id = ownProps.match.params.id;
  const tasks = state.firestore.data.tasks;
  const task = tasks ? tasks[id] : null;

  return { task, id };
};

export default compose(
  firestoreConnect([{ collection: 'tasks' }]),
  connect(mapStateToProps, { getTask, updateTask }),
)(TaskEdit);
