import React from 'react';
import { connect } from 'react-redux';
import { deleteTask, toggleTask } from '../actions/index';
import { bindActionCreators } from 'redux';

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
                    deleteTask={() => this.props.deleteTask(todo)}
                    toggleTask={() => this.props.toggleTask(todo)}/>
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

function mapStateToProps(state) {
    return { todos: state.todos };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        deleteTask: deleteTask,
        toggleTask: toggleTask
    }, dispatch)
}


export default connect(mapStateToProps, mapDispatchToProps)(TodoList);