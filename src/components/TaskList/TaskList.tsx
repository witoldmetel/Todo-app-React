import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import classnames from 'classnames';

import { getTasks } from '../../store/actions';
import { getTasksSelector } from '../../store/selectors';
import { Task } from '../../fixtures/types';
import { TaskItem, FilterBar, SearchBar } from '../index';

import './TaskList.scss';

export interface Props {
  tasks: Task[];
  getTasks: () => void;
}

class TaskList extends React.Component<Props> {
  public componentDidMount() {
    this.props.getTasks();
  }

  private get className() {
    return classnames('list', {
      empty: !this.props.tasks?.length,
    });
  }

  private get emptyList() {
    return (
      <React.Fragment>
        <h3 className="info">You have no task to do! Add first here:</h3>
        <Link className="add-icon" to="/task/new">
          <i className="plus circle icon green" />
        </Link>
      </React.Fragment>
    );
  }

  private get renderList() {
    if (!this.props.tasks) {
      return (
        <div className="ui active inverted dimmer">
          <div className="ui text loader">Loading tasks</div>
        </div>
      );
    }

    return !this.props.tasks.length
      ? this.emptyList
      : this.props.tasks.map((task: Task, index: number) => {
          return <TaskItem key={index} task={task} />;
        });
  }

  public render() {
    return (
      <div className="tasks-container">
        <div className="action-panel">
          <FilterBar />
          <SearchBar />
        </div>
        <ul className={this.className}>{this.renderList}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: getTasksSelector(state),
  };
};

export default connect(mapStateToProps, { getTasks })(TaskList);
