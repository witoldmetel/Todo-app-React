import React from 'react';
import { connect } from 'react-redux';
import { editTask, deleteTask, toggleTask } from '../actions/index';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect'

import TodoTask from '../components/TodoTask';

class TodoList extends React.Component {
    renderList() {
            return this.props.todos.map((todo) => {
                return (
                    <TodoTask
                        key={todo.taskNumber}
                        randomFace={todo.taskNumber}
                        taskNumber={todo.taskNumber}
                        taskDescription={todo.taskDescription}
                        completed={todo.completed}
                        editTask={() => this.props.editTask(todo)}
                        deleteTask={() => this.props.deleteTask(todo)}
                        toggleTask={() => this.props.toggleTask(todo)}
                    />
                );
            });
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
    }
)

function mapStateToProps(state) {
    return { todos: getVisibleTodos(state) };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        editTask: editTask,
        deleteTask: deleteTask,
        toggleTask: toggleTask
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);