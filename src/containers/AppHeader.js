import React from 'react';
import { connect } from 'react-redux';
import { addTask, searchTask } from '../actions/index';
import { bindActionCreators } from 'redux';

import InputBar from '../components/InputBar';
import SearchBar from '../components/SearchBar';
import InputFilter from '../components/InputFilter';

class AppHeader extends React.Component {
    render() {
        return (
            <header className="ui fixed menu">
                <nav className="ui container">
                    <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png"/> Funny Todo App</a>
                    <InputBar addTask={this.props.addTask}/>
                    <SearchBar searchTask={this.props.searchTask} />
                    <div className="ui filter buttons">
                        <InputFilter name="All"/>
                        <InputFilter name="Incompleted"/>
                        <InputFilter name="Completed"/>
                    </div>
                </nav>
            </header>
        );
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators({
        addTask: addTask,
        searchTask: searchTask
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(AppHeader);