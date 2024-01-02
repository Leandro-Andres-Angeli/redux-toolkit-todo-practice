import { createSlice } from '@reduxjs/toolkit';

const counterReducer = createSlice({
  name: 'counter',
  initialState: 0,
  reducers: {
    increment: (state) => state + 1,
    decrement: (state) => state - 1,
    incrementByValue: (state, action) => (state += action.payload),
    decrementByValue: (state, action) => (state -= action.payload),
  },
});
export default counterReducer.reducer;
export const counterActions = counterReducer.actions;
