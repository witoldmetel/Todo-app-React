import React from 'react';
import { connect } from 'react-redux';
import { addTask, searchTask, setFilter } from '../actions/index';
import { bindActionCreators } from 'redux';

import InputBar from '../components/InputBar';
import SearchBar from '../components/SearchBar';
import InputFilter from '../components/InputFilter';

class AppHeader extends React.Component {
    constructor(props) {
        super(props);

        this.state = { activeFilter: 1 }

        this.setActiveFilter = this.setActiveFilter.bind(this);
    }

    setActiveFilter(id, filterName) {
        this.setState({ activeFilter: id })
        this.props.setFilter(filterName);
    }

    render() {
        const filters = [
            { name: "All", id: 1, filterName: "SHOW_ALL" },
            { name: "Incompleted", id: 2, filterName: "SHOW_INCOMPLETED" },
            { name: "Completed", id: 3, filterName: "SHOW_COMPLETED" }
        ]
        return (
            <header className="ui menu">
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
                                            onClick={() => this.setActiveFilter(filter.id, filter.filterName)}
                                            filter={filter.filterName}
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
        searchTask: searchTask,
        setFilter: setFilter
    }, dispatch)
}

export default connect(null, mapDispatchToProps)(AppHeader);