import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  searchValue: ''
};

const taskSlice = createSlice({
  name: 'task',
  initialState,
  reducers: {
    searchTask(state, { payload }) {
      state.searchValue = payload;
    }
  }
});

export const { searchTask } = taskSlice.actions;

export default taskSlice.reducer;
