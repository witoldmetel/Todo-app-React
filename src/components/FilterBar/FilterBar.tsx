import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { setFilter } from '../../store/actions';
import { FILTERS } from '../../fixtures/constants';

export interface Props {
  setFilter: (filterName: string) => void;
}

class FilterBar extends React.Component<Props> {
  state = { activeFilter: 1 };

  private setActiveFilter = (id: number, filterName: string) => {
    this.setState({ activeFilter: id });
    this.props.setFilter(filterName);
  };

  public render() {
    const filters = [
      { id: 1, name: 'All', filterName: FILTERS.SHOW_ALL },
      { id: 2, name: 'Incompleted', filterName: FILTERS.SHOW_INCOMPLETED },
      { id: 3, name: 'Completed', filterName: FILTERS.SHOW_COMPLETED },
    ];

    return (
      <div className="ui filter buttons">
        return (
        {filters.map((filter) => {
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
        })}
        )
      </div>
    );
  }
}

function mapDispatchToProps(dispatch: any) {
  return bindActionCreators(
    {
      setFilter: setFilter,
    },
    dispatch,
  );
}

export default connect(null, mapDispatchToProps)(FilterBar as any);
