import React from 'react';
import TodoRandomImg from './TodoRandomImg';

class TodoTask extends React.Component {
    constructor(props) {
        super(props);
    }

    removeTask(id) {
        this.props.removeTask(id);
    }

    render() {
        const { randomFace, taskNumber, taskDescription } = this.props;
        return (
                <li className="item">
                    <TodoRandomImg randomFace={randomFace}/>
                    <div className="content">
                        <h4 className="header">{taskNumber}</h4>
                        <div className="description">{taskDescription}</div>
                    </div>
                    <button className="removeTask" onClick={(e) => this.removeTask(this.props.id)}>Remove Task</button>
                </li>
        );
    }
}

export default TodoTask;