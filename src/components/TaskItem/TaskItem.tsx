import React from 'react';
import { Link } from 'react-router-dom';

import { RandomImg } from '../index';

export interface Props {
  id: string;
  randomFace: string;
  title: string;
  status: boolean;
  editTask: (text: string, id: string) => void;
  deleteTask: (id: string) => void;
  toggleTask: () => void;
}

export interface State {
  activeEdit: boolean;
  editText: string;
}

export default class TaskItem extends React.Component<Props, State> {
  state = {
    activeEdit: false,
    editText: this.props.title,
  };

  private onDeleteClick = () => {
    this.props.deleteTask(this.props.id);
  };

  public render() {
    const { id, randomFace, title, status, toggleTask } = this.props;

    return (
      <li className="task-item" onClick={toggleTask}>
        <div className="task-content" style={{ textDecoration: status ? 'line-through' : 'none' }}>
          <RandomImg randomFace={randomFace} title={status ? "I'm proud of you!" : 'Just do it!'} />
          <div className="title">{title}</div>
        </div>
        <div className="action-buttons">
          <Link className="editTask" to={`/task/${id}`}>
            <i className="edit outline icon"></i>
          </Link>
          <button className="removeTask" onClick={this.onDeleteClick}>
            <i className="trash alternate outline icon"></i>
          </button>
        </div>
      </li>
    );
  }
}
