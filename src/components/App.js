import React from 'react';
import AppHeader from './AppHeader';
import TodoList from './TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      todos: [
        { randomFace: "todoapp1", taskNumber: `Task ${1}`, taskDescription: "Do homework" },
        { randomFace: "todoapp2", taskNumber: `Task ${2}`, taskDescription: "Clean dishes" },
        { randomFace: "todoapp3", taskNumber: `Task ${3}`, taskDescription: "Buy milk" }
      ],
      nextTaskNumber: `Task ${4}`
    };

    this.addTask = this.addTask.bind(this);
    this.removeTask - this.removeTask.bind(this);
  }

  addTask(textTask) {
    console.log("TASK", textTask);
  }

  removeTask(id) {
    console.log("remove", id);
  }

  render() {
    return (
      <div>
        <AppHeader todoTask="" addTask={this.addTask}/>
        <main className="ui main text container">
          <TodoList />
        </main>
      </div>
    );
  }
}

export default App;
