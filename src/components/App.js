import React from 'react';
import AppHeader from './AppHeader';
import TodoList from './TodoList';

class App extends React.Component {
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
