import React from 'react';
import { connect } from 'react-redux';

import TodoTask from './TodoTask';

class TodoList extends React.Component {
    render() {
        return (
            <main className="ui main text container">
                <ul className="ui relaxed divided list selection">
                    {
                        this.props.todos.map((todo) => {
                            <TodoTask key={todo.taskNumber} randomFace={todo.taskNumber} taskNumber={todo.taskNumber} taskDescription={todo.taskDescription} />
                        })
                    }
                </ul>
            </main>
        )
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

export default connect(mapStateToProps)(TodoList);