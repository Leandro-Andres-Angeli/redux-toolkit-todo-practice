import { configureStore } from '@reduxjs/toolkit';
import counter from './counterReducer';

const store = configureStore({
  reducer: {
    counter,
  },
});

export default store;
