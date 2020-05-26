import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { firestoreConnect } from 'react-redux-firebase';

import { getTasks, deleteTask, toggleTask } from '../../store/actions';
import { getTasksSelector } from '../../store/selectors';

import { TaskItem, FilterBar, SearchBar } from '../index';

import './TaskList.scss';

export interface Task {
  id: string;
  title: string;
  description: string;
  status: boolean;
}

export interface Props {
  getTasks: () => void;
  deleteTask: (id: string) => void;
  toggleTask: (task: Task) => void;
  tasks: Task[];
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
        return (
          <TaskItem
            key={task.id}
            id={task.id}
            randomFace={task.id}
            title={task.title}
            description={task.description}
            status={task.status}
            deleteTask={this.props.deleteTask}
            toggleTask={() => this.props.toggleTask(task)}
          />
        );
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

const mapDispatchToProps = (dispatch) => {
  return {
    deleteTask: (id) => {
      dispatch(deleteTask(id));
    },
  };
};

export default compose(
  firestoreConnect([{ collection: 'tasks' }]),
  connect(mapStateToProps, { ...mapDispatchToProps, getTasks, toggleTask }),
)(TaskList);
