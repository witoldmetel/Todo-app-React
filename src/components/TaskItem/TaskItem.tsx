import React from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';

import { Task } from '../../fixtures/types';
import { RandomImg } from '../index';

import './TaskItem.scss';

export interface Props {
  task: Task;
  deleteTask: (id: string) => void;
}

class TaskItem extends React.Component<Props> {
  state = { isCollapsed: false };

  private onTaskClick = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed });
  };

  private get className() {
    return classnames('task-content', {
      isCollapsed: this.state.isCollapsed,
    });
  }

  public render() {
    const { id, title, description } = this.props.task;

    return (
      <li className="task-item">
        <div className="task-header" onClick={this.onTaskClick}>
          <h3 className="title" title={`task nr ${id}`}>
            {title}
          </h3>
          <RandomImg randomFace={id} />
        </div>
        <div className={this.className}>
          <div className="description">{description}</div>
          <div className="action-buttons">
            <Link className="ui image label yellow" to={`/task/edit/${id}`}>
              <i className="edit outline icon" />
              Edit
            </Link>
            <Link className="ui inverted label red" to={`/task/delete/${id}`}>
              <i className="trash alternate outline icon" />
              Remove
            </Link>
          </div>
        </div>
      </li>
    );
  }
}

export default TaskItem;
