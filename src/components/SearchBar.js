import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SearchBar extends Component {
  constructor(props) {
    super(props);

    this.state = { search: '' };
  }

  onSearcherChange(e) {
    const searchValue = e.target.value;

    this.setState({ search: searchValue });

    this.props.searchTask(searchValue.toLowerCase());
  }

  render() {
    return (
      <div className="ui icon input">
        <input
          type="text"
          placeholder="Search task... "
          value={this.state.search}
          onChange={(e) => this.onSearcherChange(e)}
        ></input>
        <i className="search icon"></i>
      </div>
    );
  }
}

SearchBar.propTypes = {
  searchTask: PropTypes.func,
};
