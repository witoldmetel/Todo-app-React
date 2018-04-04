import React, { Component } from 'react';

class AppHeader extends Component {
    render() {
        return (
                <header className="ui fixed menu">
                    <nav className="ui container">
                        <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png"/> Funny Todo App</a>
                        <div class="ui action input">
                            <input type="text" placeholder="Add new task"></input>
                            <button class="ui button">Add Task</button>
                        </div>
                        <div class="ui icon input">
                                <input type="text" placeholder="Search task..."></input>
                                <i class="search icon"></i>
                        </div>
                    </nav>
                </header>
        );
    }
}

export default AppHeader;