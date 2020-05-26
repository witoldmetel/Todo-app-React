import React from 'react';
import { Link } from 'react-router-dom';

import { RandomImg } from '../index';

export interface Props {
  id: string;
  randomFace: string;
  title: string;
  description: string;
  status: boolean;
  deleteTask: (id: string) => void;
  toggleTask: () => void;
}

class TaskItem extends React.Component<Props> {
  private onToggleClick = () => {
    this.props.toggleTask();
  };

  public render() {
    const { id, randomFace, title, description, status } = this.props;

    return (
      <li className="task-item" onClick={this.props.toggleTask}>
        <div className="task-content" style={{ textDecoration: status ? 'line-through' : 'none' }}>
          <RandomImg randomFace={randomFace} title={status ? "I'm proud of you!" : 'Just do it!'} />
          <div className="title">{title}</div>
          <div className="description">{description}</div>
        </div>
        <div className="action-buttons">
          <Link className="editTask" to={`/task/${id}`}>
            <i className="edit outline icon"></i>
          </Link>
          <button className="removeTask" disabled onClick={() => this.props.deleteTask(this.props.id)}>
            <i className="trash alternate outline icon"></i>
          </button>
        </div>
      </li>
    );
  }
}

export default TaskItem;
