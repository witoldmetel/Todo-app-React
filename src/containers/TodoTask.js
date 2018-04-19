import React from 'react';

import TodoRandomImg from '../components/TodoRandomImg';

class TodoTask extends React.Component {
    render() {
        const { randomFace, taskNumber, taskDescription, deleteTask } = this.props;
        return (
            <li className="item">
                <TodoRandomImg randomFace={randomFace} />
                <div className="content">
                    <div className="task-number">Task: {taskNumber}</div>
                    <div className="task-description">{taskDescription}</div>
                </div>
                <button className="removeTask" onClick={deleteTask}><i className="far fa-trash-alt"></i></button>
            </li>
        )
    }
}

export default TodoTask;