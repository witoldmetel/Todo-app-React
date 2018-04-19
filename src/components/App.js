import React from 'react';
import AppHeader from '../containers/AppHeader';
import TodoList from '../containers/TodoList';

export default class App extends React.Component {
  render() {
    return (
      <div>
        <AppHeader />
        <TodoList />
      </div>
    );
  }
}
