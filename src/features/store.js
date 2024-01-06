import { configureStore } from '@reduxjs/toolkit';
import counter from './counterReducer';
import products from './productsReducer';
import todos from './todosReducer';
import edit from './editTodoReducer';

const store = configureStore({
  reducer: {
    counter,
    products,
    todos,
    edit,
  },
});

export default store;
