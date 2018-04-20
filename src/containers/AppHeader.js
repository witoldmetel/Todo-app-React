import React from 'react';
import { connect } from 'react-redux';
import { addTask, searchTask } from '../actions/index';
import { bindActionCreators } from 'redux';

class AppHeader extends React.Component {
    render() {
        return (
            <header className="ui fixed menu">
                <nav className="ui container">
                    <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png"/> Funny Todo App</a>
                        <div className="ui action input">
                        <input placeholder="Add new task" type="text" ref="inputText"></input>
                        <button className="ui button" onClick={() => {
                            if (this.refs.inputText.value.trim() !== '') {
                                this.props.addTask(this.refs.inputText.value.trim());
                                this.setState(this.refs.inputText.value = '');
                            }
                        }}>Add Task</button>
                        </div>
                        <div className="ui icon input">
                            <input type="search" placeholder="Search task..."></input>
                            <i className="search icon"></i>
                        </div>
                </nav>
            </header>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addTask: addTask }, dispatch)
}

export default connect(()=>{}, mapDispatchToProps)(AppHeader);