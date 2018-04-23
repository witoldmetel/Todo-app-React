import React from 'react';

import TodoRandomImg from './TodoRandomImg';

export default class TodoTask extends React.Component {
    render() {
        const { randomFace, taskNumber, taskDescription, completed, editTask, deleteTask, toggleTask } = this.props;
        return (
            <li className="item" completed={completed} onClick={toggleTask}>
                <TodoRandomImg randomFace={randomFace} />
                <div className="content" style={{textDecoration: completed ? 'line-through' : 'none'}}>
                    <div className="task-number">Task: {taskNumber}</div>
                    <div className="task-description">{taskDescription}</div>
                </div>
                <div className="task-buttons">
                    <button className="removeTask" onClick={deleteTask}><i className="far fa-trash-alt"></i></button>
                </div>
            </li>
        )
    }
}