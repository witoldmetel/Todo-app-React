import React from 'react';
import TodoRandomImg from '../components/TodoRandomImg';

class TodoTask extends React.Component {
    render() {
        return (
            <li className="item">
                <TodoRandomImg randomFace={this.props.randomFace} />
                <div className="content">
                    <div className="task-number">Task: {this.props.taskNumber}</div>
                    <div className="task-description">{this.props.taskDescription}</div>
                </div>
                <button className="removeTask"><i className="far fa-trash-alt"></i></button>
            </li>
        )
    }
}

export default TodoTask;