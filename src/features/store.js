import { configureStore } from '@reduxjs/toolkit';
import counter from './counterReducer';
import products from './productsReducer';

const store = configureStore({
  reducer: {
    counter,
    products,
  },
});

export default store;
