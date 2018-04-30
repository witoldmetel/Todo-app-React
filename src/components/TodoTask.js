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
        this.onCancelClick = this.onCancelClick.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.updateTextTask = this.updateTextTask.bind(this);
    }

    onEditClick() {
        this.setState({ activeEdit: true })
    }

    onCancelClick() {
        this.setState({
            editText: this.props.taskDescription,
            activeEdit: false
        })
    }

    onInputChange(e) {
        this.setState({ editText: e.target.value });
    }

    updateTextTask(e) {
        e.preventDefault();
        if (this.state.editText === '') {
            this.props.deleteTask(this.props.id);
        } else {
            this.props.editTask(this.state.editText, this.props.id);
            this.setState({ activeEdit: false })
        }
    }

    render() {
        const { id, randomFace, taskNumber, taskDescription, completed, editTask, deleteTask, toggleTask } = this.props;
        if (this.state.activeEdit) {
            return (
                <form className="ui item input" onSubmit={this.updateTextTask}>
                    <TodoRandomImg randomFace={randomFace} />
                    <div className="content">
                        <input
                            type="text"
                            className="edit-task-description"
                            placeholder={taskDescription}
                            value={this.state.editText}
                            onChange={this.onInputChange}>
                        </input>
                    </div>
                    <div className="edit-task-buttons">
                        <button className="ui button inverted green" title="accept edit" type="submit"><i className="fas fa-check"></i></button>
                        <button className="ui button inverted red" title="cancel edit" onClick={this.onCancelClick}><i className="fas fa-times"></i></button>
                    </div>
                </form>
            )
        } else {
            return (
                <div className="item">
                    <li className="task" completed={this.props.completed} onClick={toggleTask}>
                        <TodoRandomImg randomFace={randomFace} title={completed ? "I'm proud of you!" : "Just finish that task!"} />
                        <div className="content" style={{ textDecoration: completed ? 'line-through' : 'none' }}>
                            <div className="task-number">Task: {taskNumber}</div>
                            <div className="task-description">{taskDescription}</div>
                        </div>
                    </li>
                    <div className="task-buttons">
                        <button className="editTask" title="edit task" onClick={this.onEditClick}><i className="far fa-edit"></i></button>
                        <button className="removeTask" title="delete task" onClick={deleteTask}><i className="far fa-trash-alt"></i></button>
                    </div>
                </div>
            )
        }
    }
}