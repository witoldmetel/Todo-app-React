import React from 'react';
import { connect } from 'react-redux';

import { setFilter } from '../../store/actions';
import { filters } from '../../fixtures/constants';

export interface Props {
  setFilter: (filterName: string) => void;
}

class FilterBar extends React.Component<Props> {
  state = { activeFilter: 1 };

  private setActiveFilter = (id: number, filterName: string) => {
    this.setState({ activeFilter: id });
    this.props.setFilter(filterName);
  };

  private get filterButtons() {
    return filters.map((filter) => {
      return (
        <button
          key={filter.id}
          type="button"
          onClick={() => this.setActiveFilter(filter.id, filter.filterName)}
          className={this.state.activeFilter === filter.id ? 'ui active button' : 'ui button'}
        >
          {filter.name}
        </button>
      );
    });
  }

  public render() {
    return <div className="ui filter buttons">{this.filterButtons}</div>;
  }
}

export default connect(null, { setFilter })(FilterBar);
