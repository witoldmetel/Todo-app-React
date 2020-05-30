import React from 'react';
import { Link } from 'react-router-dom';
import { Transition, Trail, animated } from 'react-spring/renderprops';
import classnames from 'classnames';

import { Task } from '../../fixtures/types';
import { RandomAvatar } from '../index';

import './TaskItem.scss';

export interface Props {
  task: Task;
  deleteTask?: (id: string) => void;
}

class TaskItem extends React.Component<Props> {
  state = { isOpen: false };

  private onTaskClick = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  private get taskIcon() {
    return <RandomAvatar randomFace={this.props.task.id} className="task-icon" />;
  }

  private get taskContent() {
    const { id, description } = this.props.task;

    return (
      <React.Fragment>
        <div className="description">{description}</div>
        <div className="action-buttons">
          <Link className="ui image label yellow" to={`/task/edit/${id}`}>
            <i className="pencil alternate icon" />
            Edit
          </Link>
          <Link className="ui inverted label red" to={`/task/delete/${id}`}>
            <i className="trash alternate outline icon" />
            Remove
          </Link>
        </div>
      </React.Fragment>
    );
  }

  private get contentClassName() {
    return classnames('task-content', {
      isOpen: this.state.isOpen,
    });
  }

  /**
   * An array of items to be displayed (or a single item of any type),
   * this is used by Transition as the primary means of detecting changes.
   */
  private get transitionContent() {
    return (
      <Transition items={this.state.isOpen} from={{ height: 0 }} enter={{ height: 'auto' }} leave={{ height: 0 }}>
        {(isOpen: boolean) =>
          isOpen &&
          ((props) => (
            <animated.div className={this.contentClassName} style={props}>
              {this.taskContent}
            </animated.div>
          ))
        }
      </Transition>
    );
  }

  public render() {
    const { id, title } = this.props.task;

    return (
      <li className="task-item">
        <div className="task-header" onClick={this.onTaskClick}>
          <h3 className="title" title={`task nr ${id}`}>
            {title}
          </h3>
          {this.taskIcon}
        </div>
        {this.transitionContent}
      </li>
    );
  }
}

export default TaskItem;
