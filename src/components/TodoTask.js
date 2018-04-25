import React from 'react';

import TodoRandomImg from './TodoRandomImg';

export default class TodoTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = { activeEdit: false }
        this.onEditClick = this.onEditClick.bind(this);
    }

    onEditClick() {
        this.setState({ activeEdit: true })
    }

    render() {
        const { randomFace, taskNumber, taskDescription, completed, editTask, deleteTask, toggleTask } = this.props;
        if (this.state.activeEdit) {
            return (
                console.log("EDIT !")
            )
        } else {
            return (
                <li className="item" completed={completed} onClick={toggleTask}>
                    <TodoRandomImg randomFace={randomFace} />
                    <div className="content" style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                        <div className="task-number">Task: {taskNumber}</div>
                        <div className="task-description">{taskDescription}</div>
                    </div>
                    <div className="task-buttons">
                        <button className="editTask" onClick={this.onEditClick} hidden><i className="far fa-edit"></i></button>
                        <button className="removeTask" onClick={deleteTask}><i className="far fa-trash-alt"></i></button>
                    </div>
                </li>
            )
        }
    }
}