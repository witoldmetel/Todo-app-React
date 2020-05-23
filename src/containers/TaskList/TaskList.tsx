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

const getTasks = (state: { tasks: Task[] }) => state.tasks;
const getKeyword = (state: { keyword: string }) => state.keyword;
const getFilters = (state: { filters: any }) => state.filters;

const getVisibleTasks = createSelector([getTasks, getKeyword, getFilters], (tasks: any, keyword: any, filters: any) => {
  switch (filters) {
    case 'SHOW_ALL':
      return tasks.filter((task: Task) => task.title?.toLowerCase().indexOf(keyword) !== -1);
    case 'SHOW_COMPLETED':
      return tasks.filter((task: Task) => task.status);
    case 'SHOW_INCOMPLETED':
      return tasks.filter((task: Task) => !task.status);
  }

  return tasks;
});

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

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
