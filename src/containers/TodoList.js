import React from 'react';
import { connect } from 'react-redux';
import { getTasksThunk, editTask, deleteTask, toggleTask } from '../actions/index';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect'

import TodoTask from '../components/TodoTask';

class TodoList extends React.Component {
    renderList() {
            return this.props.todos.map((todo) => {
                return (
                    <TodoTask
                        key={todo.id}
                        id={todo.id}
                        randomFace={todo.taskNumber}
                        taskNumber={todo.taskNumber}
                        taskDescription={todo.taskDescription}
                        completed={todo.completed}
                        editTask={this.props.editTask}
                        deleteTask={() => this.props.deleteTask(todo)}
                        toggleTask={() => this.props.toggleTask(todo)}
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
                <ul className="ui relaxed divided list selection">
                    {this.renderList()}
                </ul>
            </main>
        )
    }
}

const getTodos = (state) => state.todos;
const getKeyword = (state) => state.keyword;
const getFilters = (state) => state.filters;

const getVisibleTodos = createSelector(
    [ getTodos, getKeyword, getFilters ],
    (todos, keyword, filters) => {
            switch (filters) {
                case 'SHOW_ALL':
                    return todos.filter(todo => todo.taskDescription.toLowerCase().indexOf(keyword) !== -1)
                case 'SHOW_COMPLETED':
                    return todos.filter(todo => todo.completed)
                case 'SHOW_INCOMPLETED':
                    return todos.filter(todo => !todo.completed)
            }
            return todos;
        }
)

function mapStateToProps(state) {
    return { todos: getVisibleTodos(state) };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        getTasksThunk: getTasksThunk,
        editTask: editTask,
        deleteTask: deleteTask,
        toggleTask: toggleTask
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);