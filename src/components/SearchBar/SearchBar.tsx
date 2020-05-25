import React from 'react';
import { connect } from 'react-redux';

import { searchTask } from '../../store/actions';

export interface Props {
  searchTask: (searchValue: string) => void;
}

class SearchBar extends React.Component<Props> {
  state = { search: '' };

  private onSearcherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    this.setState({ search: searchValue });

    this.props.searchTask(searchValue.toLowerCase());
  };

  public render() {
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

export default connect(null, { searchTask })(SearchBar as any);
