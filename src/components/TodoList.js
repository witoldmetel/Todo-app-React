import React from 'react';
import TodoTask from './TodoTask';
import PropTypes from 'prop-types'

const TodoList = ({ todos, removeTask }) => (
    <main className="ui main text container">
        <ul className="ui relaxed divided list selection">
            {
                todos.map(todo => {
                    <TodoTask key={todo.taskNumber} {...todo} removeTask={removeTask} />
                })
            }
        </ul>
    </main>
)

TodoList.propTypes = {
    todos: {
        randomFace: PropTypes.number.isRequired,
        taskNumber: PropTypes.number.isRequired,
        taskDescription: PropTypes.string.isRequired
    },
    removeTask: PropTypes.func.isRequired
}

export default TodoList;