import { createSlice } from '@reduxjs/toolkit';

import { FILTERS } from '../../fixtures/constants';

type Action = { payload: FILTERS; type: string };

const initialState = FILTERS.SHOW_ALL;

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setFilterStatus(state, action: Action) {
      state = action.payload;
    }
  }
});

export const { setFilterStatus } = filtersSlice.actions;

export default filtersSlice.reducer;
