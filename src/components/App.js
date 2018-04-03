import React, { Component } from 'react';
import AppHeader from './AppHeader';
import TodoList from './TodoList';

class App extends Component {
  render() {
    return (
      <div>
        <AppHeader />
        <main className="ui main text container">
          <TodoList />
        </main>
      </div>
    );
  }
}

export default App;
