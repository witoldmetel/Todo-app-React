import React from 'react';
import { connect } from 'react-redux';
import TodoRandomImg from './TodoRandomImg';
import { bindActionCreators } from 'redux';
import { deleteTask } from '../actions/';

class TodoTask extends React.Component {
    render() {
        return (
            <li className="item">
                <TodoRandomImg randomFace={3} />
                <div className="content">
                    <div className="description">{this.props.task}</div>
                </div>
                <button className="removeTask" onClick={() => this.props.deleteTask(this.props.id)}><i className="far fa-trash-alt"></i></button>
            </li>
        )
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({deleteTask}, dispatch);
}

export default connect(() => {}, mapDispatchToProps)(TodoTask);