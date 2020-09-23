import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Transition, Keyframes, animated } from 'react-spring/renderprops';
import classnames from 'classnames';
import moment from 'moment';

import { Task, Project, Auth } from '../../../fixtures/types';
import { setTaskStatus } from '../../../store/actions';
import { RandomAvatar, Button } from '../../index';

import './TaskItem.scss';

export interface Props {
  projectId: string;
  project: Project;
  task: Task;
  auth: Auth;
  setTaskStatus: (task: Task, projectId: string) => void;
}

// Creates a keyframed trail
const ContextMenu = Keyframes.Trail({
  open: { right: 65, opacity: 1, delay: 100 },
  close: { right: 30, opacity: 0, delay: 0 },
}) as any;

class TaskItem extends React.Component<Props> {
  state = {
    isContentOpen: false,
    isMenuOpen: false,
  };

  private get isTaskEditable() {
    const {
      auth: { uid },
      task,
      project,
    } = this.props;

    return uid === task.authorId || uid === project.authorId;
  }

  private openMenu = () => {
    if (this.isTaskEditable) {
      if (!this.state.isContentOpen) {
        this.setState({ isMenuOpen: true });
      }
    }
  };

  private closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  private get menuState() {
    return this.state.isMenuOpen ? 'open' : 'close';
  }

  private onToggleStatus = () => {
    this.props.setTaskStatus(this.props.task, this.props.projectId);
  };

  private get statusIconClassName() {
    return classnames('icon', {
      'check green': !this.props.task.status,
      'close icon red': this.props.task.status,
    });
  }

  private formatTime = (time: any) => moment(time.toDate()).calendar();

  private get contextMenuOptions() {
    const { task, projectId } = this.props;

    return (
      <React.Fragment>
        <Button className="icon circular" onClick={this.onToggleStatus}>
          <i className={this.statusIconClassName} />
        </Button>
        <Link className="ui icon circular button" to={`/project/${projectId}/task/edit/${task.id}`}>
          <i className="pencil icon" />
        </Link>
        <Link className="ui icon circular button" to={`/project/${projectId}/task/delete/${task.id}`}>
          <i className="trash icon" />
        </Link>
      </React.Fragment>
    );
  }

  private get taskIcon() {
    return (
      <div className="context-menu" onMouseEnter={this.openMenu} onMouseLeave={this.closeMenu}>
        <RandomAvatar randomFace={this.props.task.authorId} className="task-icon" />
        {this.isTaskEditable ? (
          <ContextMenu items={this.contextMenuOptions} reverse={!this.state.isMenuOpen} state={this.menuState}>
            {(option, index: number) => (props) => (
              <animated.div key={`${option}-${index}`} className={`menu-option option-${index}`} style={props}>
                {option}
              </animated.div>
            )}
          </ContextMenu>
        ) : null}
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

  private get editableTaskContent() {
    const { task, projectId } = this.props;

    return this.isTaskEditable ? (
      <div className="action-buttons">
        <Link className="ui image label yellow" to={`/project/${projectId}/task/edit/${task.id}`}>
          <i className="pencil icon" />
          Edit
        </Link>
        <Link className="ui inverted label red" to={`/project/${projectId}/task/delete/${task.id}`}>
          <i className="trash icon" />
          Remove
        </Link>
      </div>
    ) : null;
  }

  private get taskContent() {
    const { description, author, createdAt, updatedAt } = this.props.task;

    return (
      <React.Fragment>
        <div className="first column">
          <div className="description">{description}</div>
          <div className="meta">
            <span>
              Created by: <b>{author}</b>
            </span>
            <span>Created: {this.formatTime(createdAt)}</span>
            <span>Updated: {this.formatTime(updatedAt)}</span>
          </div>
        </div>
        <div className="second column">
          {this.taskStatus}
          {this.editableTaskContent}
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

const mapStateToProps = (state) => {
  return {
    auth: state.firebase.auth,
  };
};

export default connect(mapStateToProps, { setTaskStatus })(TaskItem);
