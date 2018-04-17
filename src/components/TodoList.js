import React from 'react';
import { connect } from 'react-redux';

class TodoList extends React.Component {
    render() {
        return (
            <main className="ui main text container">
                <ul className="ui relaxed divided list selection">
                    {
                        this.props.todos.map((task,index) => {
                            <TodoTask key={index} text={task} />
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
    }
}

export default connect(mapStateToProps)(TodoList);