import React from 'react';
import AppHeader from './AppHeader';
import TodoTask from './TodoTask';

class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            todos: [
                { randomFace: "todoapp1", taskNumber: 1, taskDescription: "Do homework" },
                { randomFace: "todoapp2", taskNumber: 2, taskDescription: "Clean dishes" },
                { randomFace: "todoapp3", taskNumber: 3, taskDescription: "Buy milk" }
            ],
            nextTaskNumber: 4
        };

        this.addTask = this.addTask.bind(this);
        this.removeTask - this.removeTask.bind(this);
    }

    addTask(textTask) {
        let todos = this.state.todos.slice();
        todos.push({ randomFace: `todoapp${nextTaskNumber}`, taskNumber: nextTaskNumber, taskDescription: textTask });
        this.setState({
            todos: todos,
            nextTaskNumber: ++this.state.nextTaskNumber
        })
    }

    removeTask(id) {
        console.log("remove", id);
        // this.setState({
        //     todos: this.state.todos.filter((todo, index) => todo.id !== id)
        // })
    }

    render() {
        return (
            <ul className="ui relaxed divided list selection">
            {
                this.state.todos.map((todo) => {
                    return <TodoTask key={todo.taskNumber} randomFace={todo.randomFace} taskNumber={todo.taskNumber} taskDescription={todo.taskDescription} removeTask={this.removeTask} />
                })
            }
            </ul>
        )
    }
}

export default TodoList;