import React from 'react';
import { connect } from 'react-redux';
import { addTask } from '../actions';

export const AppHeader = ({ dispatch }) => (
    <header className="ui fixed menu">
        <nav className="ui container">
            <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png" /> Funny Todo App</a>
            <div className="ui action input">
                <input placeholder="Add new task" ref="task"></input>
                <button className="ui button" onClick={(e) => {
                    if (!input.value.trim()) {
                        return
                    }
                    dispatch(addTask(input.value))
                    input.value = ''
                    }}>Add Task</button>
            </div>
            <div className="ui icon input">
                <input type="text" placeholder="Search task..."></input>
                <i className="search icon"></i>
            </div>
        </nav>
    </header>
)

export default connect()(AppHeader)