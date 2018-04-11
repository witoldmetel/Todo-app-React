import React from 'react';
import TodoRandomImg from './TodoRandomImg';

class TodoTask extends React.Component {
    render() {
        const { randomFace, taskNumber, taskDescription } = this.props;
        return (
                <li className="item">
                    <TodoRandomImg randomFace={randomFace}/>
                    <div className="content">
                        <h4 className="header">{taskNumber}</h4>
                        <div className="description">{taskDescription}</div>
                    </div>
                </li>
        );
    }
}

export default TodoTask;