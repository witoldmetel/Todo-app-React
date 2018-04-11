import React from 'react';
import AppHeader from './AppHeader';
import TodoList from './TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.addTask = this.addTask.bind(this);
  }

  addTask(textTask) {
    console.log("Task", textTask);
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
