import React, { Component } from 'react';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = {
            search: ''
        };

        this.onSearcherChange = this.onSearcherChange.bind(this);
    }

    onSearcherChange(e) {
        this.setState({ search: e.target.value });
        this.props.searchTask(this.state.search);
    }

    render() {
        return (
            <div className="ui icon input">
                <input
                    type="text"
                    placeholder="Search task... "
                    value={this.state.search}
                    onChange={this.onSearcherChange}
                    >
                </input>
                <i className="search icon"></i>
            </div>
        );
    }
}