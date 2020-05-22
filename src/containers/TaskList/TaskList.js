import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';

import { getTasksThunk, editTask, deleteTask, toggleTask } from '../../actions';
import TaskItem from '../../components/TaskItem';

import './TaskList.scss';

class TaskList extends React.Component {
  componentDidMount() {
    this.props.getTasksThunk();
  }

  get renderList() {
    return this.props.tasks.map((task, index) => {
      return (
        <TaskItem
          key={index}
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

  render() {
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

const getTasks = (state) => state.tasks;
const getKeyword = (state) => state.keyword;
const getFilters = (state) => state.filters;

const getVisibleTasks = createSelector([getTasks, getKeyword, getFilters], (tasks, keyword, filters) => {
  switch (filters) {
    case 'SHOW_ALL':
      return tasks.filter((task) => task.description?.toLowerCase().indexOf(keyword) !== -1);
    case 'SHOW_COMPLETED':
      return tasks.filter((task) => task.status);
    case 'SHOW_INCOMPLETED':
      return tasks.filter((task) => !task.status);
  }

  return tasks;
});

function mapStateToProps(state) {
  return { tasks: getVisibleTasks(state) };
}

function mapDispatchToProps(dispatch) {
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

TaskList.propTypes = {
  tasks: PropTypes.array,
  getTasksThunk: PropTypes.func,
  editTask: PropTypes.func,
  deleteTask: PropTypes.func,
  toggleTask: PropTypes.func,
};

export default connect(mapStateToProps, mapDispatchToProps)(TaskList);
