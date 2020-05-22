import React from 'react';
import PropTypes from 'prop-types';

import RandomImg from './RandomImg';

export default class TaskItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      activeEdit: false,
      editText: this.props.title,
    };

    this.onEditClick = this.onEditClick.bind(this);
    this.onCancelClick = this.onCancelClick.bind(this);
    this.onInputChange = this.onInputChange.bind(this);
    this.updateTextTask = this.updateTextTask.bind(this);
  }

  onEditClick() {
    this.setState({ activeEdit: true });
  }

  onCancelClick() {
    this.setState({
      editText: this.props.title,
      activeEdit: false,
    });
  }

  onInputChange(e) {
    this.setState({ editText: e.target.value });
  }

  updateTextTask(e) {
    e.preventDefault();

    if (this.state.editText === '') {
      this.props.deleteTask(this.props.id);
    } else {
      this.props.editTask(this.state.editText, this.props.id);
      this.setState({ activeEdit: false });
    }
  }

  render() {
    const { randomFace, title, status, deleteTask, toggleTask } = this.props;

    if (this.state.activeEdit) {
      return (
        <form className="ui item input" onSubmit={this.updateTextTask}>
          <div className="task-content">
            <RandomImg randomFace={randomFace} />
            <input
              type="text"
              className="edit-task-description"
              placeholder={title}
              value={this.state.editText}
              onChange={this.onInputChange}
            ></input>
          </div>
          <div className="edit-task-buttons">
            <button className="ui button inverted green" title="accept edit" type="submit">
              <i className="fas fa-check"></i>
            </button>
            <button className="ui button inverted red" title="cancel edit" onClick={this.onCancelClick}>
              <i className="fas fa-times"></i>
            </button>
          </div>
        </form>
      );
    } else {
      return (
        <li className="task-item" onClick={toggleTask}>
          <div className="task-content" style={{ textDecoration: status ? 'line-through' : 'none' }}>
            <RandomImg randomFace={randomFace} title={status ? "I'm proud of you!" : 'Just do it!'} />
            <div className="title">{title}</div>
          </div>
          <div className="action-buttons">
            <button className="editTask" title="edit task" onClick={this.onEditClick}>
              <i className="edit outline icon"></i>
            </button>
            <button className="removeTask" title="delete task" onClick={deleteTask}>
              <i className="trash alternate outline icon"></i>
            </button>
          </div>
        </li>
      );
    }
  }
}

TaskItem.propTypes = {
  id: PropTypes.string,
  randomFace: PropTypes.string,
  title: PropTypes.string,
  status: PropTypes.bool,
  editTask: PropTypes.func,
  deleteTask: PropTypes.func,
  toggleTask: PropTypes.func,
};
