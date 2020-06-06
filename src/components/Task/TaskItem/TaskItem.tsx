import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition, Keyframes, animated } from 'react-spring/renderprops';
import classnames from 'classnames';

import { Task } from '../../../fixtures/types';
import { setTaskStatus } from '../../../store/actions';
import { RandomAvatar } from '../../index';

import './TaskItem.scss';

export interface Props {
  task: Task;
  setTaskStatus: (task: Task) => void;
}

// Creates a keyframed trail
const ContextMenu = Keyframes.Trail({
  open: { right: 65, opacity: 1, delay: 100 },
  close: { right: 30, opacity: 0, delay: 0 },
});

class TaskItem extends React.Component<Props> {
  state = {
    isContentOpen: false,
    isMenuOpen: false,
  };

  private openMenu = () => {
    if (!this.state.isContentOpen) {
      this.setState({ isMenuOpen: true });
    }
  };

  private closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  private get menuState() {
    return this.state.isMenuOpen ? 'open' : 'close';
  }

  private onToggleStatus = () => {
    this.props.setTaskStatus(this.props.task);
  };

  private get statusIconClassName() {
    return classnames('icon', {
      'check green': !this.props.task.status,
      'close icon red': this.props.task.status,
    });
  }

  private get contextMenuOptions() {
    const { id } = this.props.task;

    return (
      <React.Fragment>
        <button className="ui icon circular button" onClick={this.onToggleStatus}>
          <i className={this.statusIconClassName} />
        </button>
        <Link className="ui icon circular button" to={`/task/edit/${id}`}>
          <i className="pencil icon" />
        </Link>
        <Link className="ui icon circular button" to={`/task/delete/${id}`}>
          <i className="trash icon" />
        </Link>
      </React.Fragment>
    );
  }

  private get taskIcon() {
    return (
      <div className="context-menu" onMouseEnter={this.openMenu} onMouseLeave={this.closeMenu}>
        <RandomAvatar randomFace={this.props.task?.id} className="task-icon" />
        <ContextMenu items={this.contextMenuOptions} reverse={!this.state.isMenuOpen} state={this.menuState}>
          {(option, index: number) => (props) => (
            <animated.div key={`${option}-${index}`} className={`menu-option option-${index}`} style={props}>
              {option}
            </animated.div>
          )}
        </ContextMenu>
      </div>
    );
  }

  private onTaskClick = () => {
    if (!this.state.isMenuOpen) {
      this.setState({ isContentOpen: !this.state.isContentOpen });
    }
  };

  private get taskStatus() {
    // @todo: unify this
    const status = this.props.task.status ? 'completed' : 'incompleted';
    const labelColor = this.props.task.status ? 'green' : 'red';
    const icon = this.props.task.status ? 'check' : 'close icon';

    return (
      <div className={`ui label ${labelColor}`}>
        <i className={`${icon} icon`}></i> Task {status}
      </div>
    );
  }

  private get taskContent() {
    const { id, description, author, createdAt, updatedAt } = this.props.task;

    return (
      <React.Fragment>
        <div className="first column">
          <div className="description">{description}</div>
          <div className="meta">
            <span>
              Created by: <b>{author}</b>
            </span>
            <span>Created: {createdAt}</span>
            <span>Updated: {updatedAt}</span>
          </div>
        </div>
        <div className="second column">
          {this.taskStatus}
          <div className="action-buttons">
            <Link className="ui image label yellow" to={`/task/edit/${id}`}>
              <i className="pencil icon" />
              Edit
            </Link>
            <Link className="ui inverted label red" to={`/task/delete/${id}`}>
              <i className="trash icon" />
              Remove
            </Link>
          </div>
        </div>
      </React.Fragment>
    );
  }

  private get contentClassName() {
    return classnames('task-content', {
      isContentOpen: this.state.isContentOpen,
    });
  }

  /**
   * An array of items to be displayed (or a single item of any type),
   * this is used by Transition as the primary means of detecting changes.
   */
  private get transitionContent() {
    return (
      <Transition
        items={this.state.isContentOpen}
        from={{ height: 0 }}
        enter={{ height: 'auto' }}
        leave={{ height: 0 }}
      >
        {(isContentOpen: boolean) =>
          isContentOpen &&
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

export default connect(null, { setTaskStatus })(TaskItem);
