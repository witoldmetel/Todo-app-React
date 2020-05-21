import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import PropTypes from 'prop-types';

import { getTasksThunk, editTask, deleteTask, toggleTask } from '../actions';
import TaskItem from '../components/TaskItem';

class TaskList extends React.Component {
  renderList() {
    return this.props.tasks.map((task, index) => {
      return (
        <TaskItem
          key={index}
          id={task.id}
          randomFace={task.taskNumber}
          taskNumber={task.taskNumber}
          taskDescription={task.taskDescription}
          completed={task.completed}
          editTask={this.props.editTask}
          deleteTask={() => this.props.deleteTask(task)}
          toggleTask={() => this.props.toggleTask(task)}
        />
      );
    });
  }
  componentDidMount() {
    this.props.getTasksThunk();
  }

  render() {
    return (
      <main className="ui main text container">
        <ul className="ui relaxed divided list selection">{this.renderList()}</ul>
      </main>
    );
  }
}

const getTasks = (state) => state.tasks;
const getKeyword = (state) => state.keyword;
const getFilters = (state) => state.filters;

const getVisibleTasks = createSelector([getTasks, getKeyword, getFilters], (tasks, keyword, filters) => {
  switch (filters) {
    case 'SHOW_ALL':
      return tasks.filter((task) => task.taskDescription?.toLowerCase().indexOf(keyword) !== -1);
    case 'SHOW_COMPLETED':
      return tasks.filter((task) => task.completed);
    case 'SHOW_INCOMPLETED':
      return tasks.filter((task) => !task.completed);
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
