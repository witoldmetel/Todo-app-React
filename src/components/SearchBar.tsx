import React from 'react';

export interface Props {
  searchTask: (searchValue: string) => void;
}

export default class SearchBar extends React.Component<Props> {
  state = { search: '' };

  onSearcherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    this.setState({ search: searchValue });

    this.props.searchTask(searchValue.toLowerCase());
  };

  render() {
    return (
      <div className="ui icon input">
        <input
          type="text"
          placeholder="Search task... "
          value={this.state.search}
          onChange={this.onSearcherChange}
        ></input>
        <i className="search icon"></i>
      </div>
    );
  }
}
