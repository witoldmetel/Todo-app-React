var React = require('react');
var ReactDOM = require('react-dom');

//Create components
class TodoComponent extends React.Component {
    getInitialState() {
        this.state = {
            todos: ['wash up', 'eat some cheese', 'take a nap']
        };
    }
    render() {
        return (
            <div id="todo-list">
                <p>Some example texts</p>
                <ul>
                    <li>{this.state.todos[0]}</li>
                    <li>{this.state.todos[1]}</li>
                    <li>{this.state.todos[2]}</li>
                </ul>
            </div>
        );
    }
}

//putt component into html page
ReactDOM.render(
    <TodoComponent />,
    document.getElementById("todo-wrapper")
);