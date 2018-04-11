import React from 'react';
import TodoTask from './TodoTask';

class TodoList extends React.Component {
    render() {
        return (
            <ul className="ui relaxed divided list selection">
                <TodoTask
                    randomFace="todoapp1"
                    taskNumber="Task 1"
                    taskDescription="Do homework"
                />
                <TodoTask
                    randomFace="todoapp2"
                    taskNumber="Task 2"
                    taskDescription="Clean dishes"
                />
                <TodoTask
                    randomFace="todoapp3"
                    taskNumber="Task 3"
                    taskDescription="Buy milk"
                />
            </ul>
        )
    }
}

export default TodoList;