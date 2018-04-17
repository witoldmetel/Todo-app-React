import React from 'react';
import AppHeader from '../components/AppHeader';
import TodoList from '../components/TodoList';

class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <TodoList />
      </div>
    )
  }
}

export default App;
