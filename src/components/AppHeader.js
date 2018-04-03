import React, { Component } from 'react';

class AppHeader extends Component {
    render() {
        return (
                <header className="ui fixed menu">
                    <nav className="ui container">
                        <a href="#" className="header item"><img className="logo" src="http://taylorehat.com/images/todo-cloud-hero.png"/> Todo Application</a>
                        <div class="ui action input">
                            <input type="text" placeholder="Add new task"></input>
                            <button class="ui button">Add Task</button>
                        </div>
                    </nav>
                </header>
        );
    }
}

export default AppHeader;