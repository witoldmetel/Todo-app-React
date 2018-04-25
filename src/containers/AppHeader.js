import React from 'react';
import { connect } from 'react-redux';
import { addTask, searchTask } from '../actions/index';
import { bindActionCreators } from 'redux';

import InputBar from '../components/InputBar';
import SearchBar from '../components/SearchBar';
import InputFilter from '../components/InputFilter';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { activeFilter: 1 }

        this.setFilter = this.setFilter.bind(this);
    }

    setFilter(id) {
        this.setState({ activeFilter: id })
    }

    render() {
        const filters = [
            { name: "All", id: 1 },
            { name: "Incompleted", id: 2 },
            { name: "Completed", id: 3 }
        ]
        return (
            <header className="ui fixed menu">
                <nav className="ui container">
                    <a href="#" className="header item"><img className="logo" src="https://api.adorable.io/avatars/55/TodoApp.png"/> Funny Todo App</a>
                    <InputBar addTask={this.props.addTask}/>
                    <SearchBar searchTask={this.props.searchTask} />
                    <div className="ui filter buttons">
                        return (
                            {
                                filters.map(filter => {
                                    return (
                                        <InputFilter
                                            key={filter.id}
                                            id={filter.id}
                                            name={filter.name}
                                            isActive={this.state.activeFilter === filter.id}
                                            onClick={() => this.setFilter(filter.id)}
                                        />
                                    );
                                })
                            }
                        )
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