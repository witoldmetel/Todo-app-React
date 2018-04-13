import React from 'react';
import TodoRandomImg from './TodoRandomImg';
import PropTypes from 'prop-types'

const TodoTask = ({ randomFace, taskNumber, taskDescription, removeTask }) => (
    <li className="item">
        <TodoRandomImg randomFace={randomFace} />
        <div className="content">
            <h4 className="header">Task {taskNumber}</h4>
            <div className="description">{taskDescription}</div>
        </div>
        <button className="removeTask" onClick={() => removeTask(this.taskNumber)}><i className="far fa-trash-alt"></i></button>
    </li>
)

TodoTask.propTypes = {
    randomFace: PropTypes.number.isRequired,
    taskNumber: PropTypes.number.isRequired,
    taskDescription: PropTypes.string.isRequired,
    removeTask: PropTypes.func.isRequired
}

export default TodoTask;