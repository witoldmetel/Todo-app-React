import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { filters, FILTERS } from '../../fixtures/constants';
import { setFilterStatus } from '../../store/slices/filtersSlice';

const FilterBar = () => {
  const [activeFilter, setActiveFilter] = useState(FILTERS.SHOW_ALL);
  const dispatch = useDispatch();

  const setFilter = (status: FILTERS) => () => {
    setActiveFilter(status);
    dispatch(setFilterStatus(status));
  };

  const filterButtons = filters.map((filter) => {
    const className = activeFilter === filter.status ? 'ui active button' : 'ui button';

    return (
      <button key={filter.status} type="button" onClick={setFilter(filter.status)} className={className}>
        {filter.name}
      </button>
    );
  });

  return <div className="ui filter buttons">{filterButtons}</div>;
};

export default FilterBar;
