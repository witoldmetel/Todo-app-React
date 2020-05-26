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
  public render() {
    const { id, randomFace, title, description, status } = this.props;

    return (
      <li className="task-item">
        <div className="task-content" style={{ textDecoration: status ? 'line-through' : 'none' }}>
          <RandomImg randomFace={randomFace} />
          <div className="title">{title}</div>
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
