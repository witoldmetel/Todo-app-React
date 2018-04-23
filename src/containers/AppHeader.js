import React from 'react';
import { connect } from 'react-redux';
import { addTask, showAll, showIncompleted, showCompleted } from '../actions/index';
import { bindActionCreators } from 'redux';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { text: '' };
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(e) {
        this.setState({ text: e.target.value })
    }

    onFormSubmit(e) {
        e.preventDefault();
        if (this.state.text.trim() !== '') {
            this.props.addTask(this.state.text.trim());
            this.setState({ text: '' })
        }
    }

    render() {
        return (
            <header className="ui fixed menu">
                <nav className="ui container">
                    <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png"/> Funny Todo App</a>
                        <form className="ui action input" onSubmit={this.onFormSubmit}>
                            <input
                                placeholder="Add new task"
                                type="text"
                                value={this.state.text}
                                onChange={this.onInputChange}>
                            </input>
                            <button className="ui button" type="submit">Add Task</button>
                        </form>
                        <div className="ui icon input">
                            <input type="search" placeholder="Search task... "></input>
                            <i className="search icon"></i>
                        </div>
                        <div className="ui filter buttons">
                            <button className="ui active button" onClick={() => this.props.showAll}>All</button>
                            <button className="ui button" onClick={() => this.props.showIncompleted}>Incompleted</button>
                            <button className="ui button">Completed</button>
                        </div>
                </nav>
            </header>
        );
    }
}

// function mapStateToProps(state) {
//     return {
//         todos: state.todos
//     };
// }

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTask: addTask,
        showAll: showAll,
        showIncompleted: showIncompleted,
        showCompleted: showCompleted
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(AppHeader);