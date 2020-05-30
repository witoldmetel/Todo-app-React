import React from 'react';
import { Link } from 'react-router-dom';
import { Transition, Keyframes, animated } from 'react-spring/renderprops';
import classnames from 'classnames';

import { Task } from '../../fixtures/types';
import { RandomAvatar } from '../index';

import './TaskItem.scss';

export interface Props {
  task: Task;
  deleteTask?: (id: string) => void;
}

// Creates a keyframed trail
const MenuTrail = Keyframes.Trail({
  open: { x: 0, opacity: 1, delay: 100 },
  close: { x: -100, opacity: 0, delay: 0 },
});

class TaskItem extends React.Component<Props> {
  state = { isContentOpen: false, isMenuOpen: false };

  private openMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  private closeMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  private get menuState() {
    return this.state.isMenuOpen ? 'open' : 'close';
  }

  private get taskIcon() {
    return (
      <React.Fragment>
        <RandomAvatar
          randomFace={this.props.task.id}
          className="task-icon"
          onMouseEnter={this.openMenu}
          onMouseLeave={this.closeMenu}
        />
        <MenuTrail items={['Item1', 'Item2', 'Item3']} reverse={!this.state.isMenuOpen} state={this.menuState}>
          {(item) => (props) => (
            <animated.div className="menu-option" style={props}>
              <div>{item}</div>
            </animated.div>
          )}
        </MenuTrail>
      </React.Fragment>
    );
  }

  private onTaskClick = () => {
    this.setState({ isOpen: !this.state.isContentOpen });
  };

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
      isOpen: this.state.isContentOpen,
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
