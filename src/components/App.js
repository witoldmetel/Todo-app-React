import React from 'react';
import AppHeader from './AppHeader';
import TodoList from './TodoList';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
        textFromHeaderApp: null
    };
    this.addTaskCallback = this.addTaskCallback.bind(this);
  }

  addTaskCallback(textTask) {
    this.setState({ textFromHeaderApp: textTask });
  }

  render() {
    return (
      <div>
        <AppHeader addTask={this.addTaskCallback}/>
        <main className="ui main text container">
          <TodoList addTask={this.state.textFromHeaderApp}/>
        </main>
      </div>
    );
  }
}

export default App;
