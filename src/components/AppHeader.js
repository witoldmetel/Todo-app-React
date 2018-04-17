import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addTask } from '../actions/';

class AppHeader extends React.Component {
    render() {
        return (
                <header className="ui fixed menu">
                    <nav className="ui container">
                        <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png"/> Funny Todo App</a>
                            <div className="ui action input">
                                <input placeholder="Add new task" type="text" ref ="task"></input>
                                <button className="ui button" onClick={()=>this.props.addTask(this.refs.task.value)} >Add Task</button>
                            </div>
                            <div className="ui icon input">
                                <input type="text" placeholder="Search task..."></input>
                                <i className="search icon"></i>
                            </div>
                    </nav>
                </header>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({addTask}, dispatch);
}

export default connect(() => {}, mapDispatchToProps)(AppHeader);