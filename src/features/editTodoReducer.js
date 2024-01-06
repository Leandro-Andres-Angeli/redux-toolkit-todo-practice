import { createSlice } from '@reduxjs/toolkit';

const editTodoSlice = createSlice({
  name: 'editTodo',
  initialState: {
    todoToEdit: null,
    edition: false,
  },
  reducers: {
    setTodo: (state, action) => {
      state.todoToEdit = action.payload;
      state.edition = true;
    },
    resetTodo: (state, action) => {
      state.todoToEdit = null;
      state.edition = false;
    },
  },
});
export default editTodoSlice.reducer;
export const editTodosActions = editTodoSlice.actions;
