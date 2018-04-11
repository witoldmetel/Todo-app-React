import React from 'react';
import AppHeader from './AppHeader';
import TodoList from './TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  addTask(textTask) {
    // this.props.addTask(textTask);
    console.log(textTask);
  }

  render() {
    return (
      <div>
        <AppHeader addTask={this.addTask}/>
        <main className="ui main text container">
          <TodoList />
        </main>
      </div>
    );
  }
}

export default App;
