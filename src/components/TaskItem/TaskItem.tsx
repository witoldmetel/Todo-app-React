import React from 'react';
import { Link } from 'react-router-dom';
import { Spring, animated } from 'react-spring/renderprops';
import classnames from 'classnames';

import { Task } from '../../fixtures/types';
import { RandomImg } from '../index';

import './TaskItem.scss';

export interface Props {
  task: Task;
  deleteTask: (id: string) => void;
}

class TaskItem extends React.Component<Props> {
  state = { isOpen: false };

  private onTaskClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  private get className() {
    return classnames('task-content', {
      isOpen: this.state.isOpen,
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
        <Spring
          native
          force
          config={{ tension: 1000, friction: 100, precision: 1 }}
          from={{ height: this.state.isOpen ? 0 : 'auto' }}
          to={{ height: this.state.isOpen ? 'auto' : 0 }}
        >
          {(props) => (
            <animated.div className={this.className} style={props}>
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
            </animated.div>
          )}
        </Spring>
      </li>
    );
  }
}

export default TaskItem;
