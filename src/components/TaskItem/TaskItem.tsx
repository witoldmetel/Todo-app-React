import React from 'react';
import { Link } from 'react-router-dom';

import { Task } from '../../fixtures/types';
import { RandomImg } from '../index';

import './TaskItem.scss';

export interface Props {
  task: Task;
}

class TaskItem extends React.Component<Props> {
  public render() {
    const { id, title, status } = this.props.task;

    return (
      <li className="task-item">
        <div className="task-content" style={{ textDecoration: status ? 'line-through' : 'none' }}>
          <RandomImg randomFace={id} />
          <div className="title">{title}</div>
        </div>
        <div className="action-buttons">
          <Link className="editTask" to={`/task/${id}`}>
            <i className="edit outline icon"></i>
          </Link>
          <button className="removeTask">
            <i className="trash alternate outline icon"></i>
          </button>
        </div>
      </li>
    );
  }
}

export default TaskItem;
