import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { searchTask } from '../../store/slices/taskSlice';

const SearchBar = () => {
  const dispatch = useDispatch();
  const [searchValue, setSearchValue] = useState('');

  const onSearcherChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const searchValue = e.target.value;

    setSearchValue(searchValue);
    dispatch(searchTask(searchValue.toLowerCase()));
  };

  return (
    <div className="ui icon input">
      <input type="text" placeholder="Search task... " value={searchValue} onChange={onSearcherChange} />
      <i className="search icon" />
    </div>
  );
};

export default SearchBar;
