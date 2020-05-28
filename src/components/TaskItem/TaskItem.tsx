import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Task } from '../../fixtures/types';
import { deleteTask } from '../../store/actions';
import { RandomImg } from '../index';

import './TaskItem.scss';

export interface Props {
  task: Task;
  deleteTask: (id: string) => void;
}

class TaskItem extends React.Component<Props> {
  private onDeleteClick = () => {
    this.props.deleteTask(this.props.task.id);
  };

  public render() {
    const { id, title, status } = this.props.task;

    return (
      <li className="task-item">
        <div className="task-content" style={{ textDecoration: status ? 'line-through' : 'none' }}>
          <RandomImg randomFace={id} />
          <div className="title">{title}</div>
        </div>
        <div className="action-buttons">
          <Link className="ui image label yellow" to={`/task/${id}`}>
            <i className="edit outline icon" />
            Edit
          </Link>
          <button className="ui inverted button red" onClick={this.onDeleteClick}>
            <i className="trash alternate outline icon" />
            Remove
          </button>
        </div>
      </li>
    );
  }
}

export default connect(null, { deleteTask })(TaskItem);
