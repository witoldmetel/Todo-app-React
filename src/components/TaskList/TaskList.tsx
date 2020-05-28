import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

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

  private get renderList() {
    return !this.props.tasks ? (
      <div className="ui active inverted dimmer">
        <div className="ui text loader">Loading tasks</div>
      </div>
    ) : (
      this.props.tasks.map((task: Task) => {
        return <TaskItem key={task.id} task={task} />;
      })
    );
  }

  public render() {
    return (
      <div className="tasks-container">
        <div className="action-panel">
          <FilterBar />
          <SearchBar />
        </div>
        <ul className="list">{this.renderList}</ul>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    tasks: getTasksSelector(state),
  };
};

export default compose(firestoreConnect([{ collection: 'tasks' }]), connect(mapStateToProps, { getTasks }))(TaskList);
