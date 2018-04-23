import React from 'react';
import { connect } from 'react-redux';
import { addTask, searchTask, setFilter, filters } from '../actions/index';
import { bindActionCreators } from 'redux';

import FilterButton from '../components/FilterButton';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: '',
            search: ''
        };

        this.onSearcherChange = this.onSearcherChange.bind(this);
        this.onInputChange = this.onInputChange.bind(this);
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }

    onInputChange(e) {
        this.setState({ text: e.target.value });
    }

    onSearcherChange(e) {
        this.setState({ search: e.target.value });
        this.props.searchTask(this.state.search);
    }

    onFormSubmit(e) {
        e.preventDefault();
        if (this.state.text.trim() !== '') {
            this.props.addTask(this.state.text.trim());
            this.setState({ text: '' });
        }
    }

    render() {
        return (
            <header className="ui fixed menu">
                <nav className="ui container">
                    <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png"/> Funny Todo App</a>
                        <form className="ui action input" onSubmit={this.onFormSubmit}>
                            <input
                                type="text"
                                placeholder="Add new task"
                                value={this.state.text}
                                onChange={this.onInputChange}>
                            </input>
                            <button className="ui button" type="submit">Add Task</button>
                        </form>
                        <div className="ui icon input">
                            <input
                                type="text"
                                placeholder="Search task... "
                                value={this.state.search}
                                onChange={this.onSearcherChange}
                                disabled>
                            </input>
                            <i className="search icon"></i>
                        </div>
                </nav>
            </header>
        );
    }
}

function mapStateToProps(state) {
    return {
        todos: state.todos
    };
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTask: addTask,
        searchTask: searchTask,
        setFilter: setFilter
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);