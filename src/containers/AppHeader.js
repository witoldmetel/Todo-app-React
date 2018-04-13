import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TodoTextInput from '../components/TodoTextInput';
import { addTask } from '../actions';

export const AppHeader = ({ addTask }) => (
    <header className="ui fixed menu">
        <nav className="ui container">
            <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png" /> Funny Todo App</a>
            <TodoTextInput newTask onSave={(text) => {
                if (text.length !== 0) {
                    addTask(text)
                }
            }} placeholder="Add new task" />
            <div className="ui icon input">
                <input type="text" placeholder="Search task..."></input>
                <i className="search icon"></i>
            </div>
        </nav>
    </header>
)

AppHeader.PropTypes = {
    addTask: PropTypes.func.isRequired
}

export default connect(null, { addTask })(AppHeader)