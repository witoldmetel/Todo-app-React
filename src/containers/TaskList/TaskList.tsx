import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';

import { getTasksThunk, editTask, deleteTask, toggleTask } from '../../actions';
import TaskItem from '../../components/TaskItem';

import './TaskList.scss';

export interface Task {
  id: string;
  title: string;
  status: boolean;
}

export interface Props {
  getTasksThunk: () => void;
  editTask: () => void;
  deleteTask: (id: string) => void;
  toggleTask: (task: Task) => void;
  tasks: Task[];
}

class TaskList extends React.Component<Props> {
  public componentDidMount() {
    this.props.getTasksThunk();
  }

  private get renderList() {
    return this.props.tasks.map((task: Task) => {
      return (
        <TaskItem
          key={task.id}
          id={task.id}
          randomFace={task.id}
          title={task.title}
          status={task.status}
          editTask={this.props.editTask}
          deleteTask={() => this.props.deleteTask(task.id)}
          toggleTask={() => this.props.toggleTask(task)}
        />
      );
    });
  }

  public render() {
    return (
      <React.Fragment>
        <h1>Task List</h1>
        <div className="content">
          <ul className="list">{this.renderList}</ul>
        </div>
      </React.Fragment>
    );
  }
}

const getTasks = (state: any) => state.tasks;
const getSearchValue = (state: any) => state.searchValue;
const getFilters = (state: any) => state.filters;

const getVisibleTasks = createSelector(
  [getTasks, getSearchValue, getFilters],
  (tasks: any, searchValue: any, filters: any) => {
    switch (filters) {
      case 'SHOW_ALL':
        return tasks.filter((task: Task) => task.title?.toLowerCase().indexOf(searchValue) !== -1);

      case 'SHOW_COMPLETED':
        return tasks.filter((task: Task) => task.status);

      case 'SHOW_INCOMPLETED':
        return tasks.filter((task: Task) => !task.status);

      default:
        return tasks;
    }
  },
);

function mapStateToProps(state: any) {
  return { tasks: getVisibleTasks(state) };
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      getTasksThunk: getTasksThunk,
      editTask: editTask,
      deleteTask: deleteTask,
      toggleTask: toggleTask,
    },
    dispatch,
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskList as any);
