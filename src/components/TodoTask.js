import React from 'react';

import TodoRandomImg from './TodoRandomImg';

export default class TodoTask extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            activeEdit: false,
            editText: this.props.taskDescription
        }

        this.onEditClick = this.onEditClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.updateTextTask = this.updateTextTask.bind(this);
    }

    onEditClick() {
        this.setState({ activeEdit: true })
    }

    onInputChange(e) {
        this.setState({ editText: e.target.value });
    }

    updateTextTask(e) {
        e.preventDefault();
        console.log(this.state.editText);
        if (this.state.editText === '') {
            this.props.deleteTask(this.props.taskNumber);
        } else {
            this.props.editTask(this.state.editText, this.props.taskNumber);
            this.setState({ activeEdit: false })
        }
    }

    render() {
        const { randomFace, taskNumber, taskDescription, completed, editTask, deleteTask, toggleTask } = this.props;
        if (this.state.activeEdit) {
            return (
                <form className="ui item input" onSubmit={this.updateTextTask}>
                    <TodoRandomImg randomFace={randomFace} />
                    <div className="content">
                        <div className="task-number">Task: {taskNumber}</div>
                        <input
                            type="text"
                            placeholder={taskDescription}
                            value={this.state.editText}
                            onChange={this.onInputChange}>
                        </input>
                    </div>
                    <button className="ui button" type="submit">Edit Task</button>
                </form>
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
                        <button className="editTask" onClick={this.onEditClick}><i className="far fa-edit"></i></button>
                        <button className="removeTask" onClick={deleteTask}><i className="far fa-trash-alt"></i></button>
                    </div>
                </li>
            )
        }
    }
}