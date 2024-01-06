import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
export const getTodosFromDb = createAsyncThunk(
  'todos/getTodoFromDb',
  async () => {
    const res = await fetch('http://localhost:5000/todos');

    return res.json();
  }
);
export const updateTodoToDb = createAsyncThunk(
  'todos/updateTodo',
  async (todo) => {
    const { id, ...rest } = todo;
    const res = await fetch('http://localhost:5000/todos/' + id, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rest),
    });
    const content = await res.json();

    return { status: res.status, content };
  }
);
export const postTodoToDb = createAsyncThunk(
  'todos/postTodos',
  async (data) => {
    const res = await fetch('http://localhost:5000/todos', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    const content = await res.json();
    return content;
  }
);
export const deleteTodoFromDb = createAsyncThunk(
  'todos/deleteTodo',
  async (id) => {
    try {
      const res = await fetch('http://localhost:5000/todos/' + id, {
        method: 'delete',
        headers: {
          Accept: 'application/json',
        },
      });
      if (res.status !== 200) {
        return { status: res.status, id: null };
      }
      return { status: 200, id };
    } catch (err) {
      return err.status;
    }
  }
);
//async () => {
//   const res = await fetch('http://localhost:5000/todos');
// };
const todosSlice = createSlice({
  name: 'todos',
  initialState: {
    todos: [],
    updateStatus: false,
    fireUpdate: null,
    status: null,
    loading: true,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getTodosFromDb.pending, (state, action) => {
      state.status = 'pending';
      state.loading = true;
    });
    builder.addCase(getTodosFromDb.fulfilled, (state, action) => {
      state.status = 'fullfilled';
      state.loading = false;
      console.log('fetching', action.payload);
      state.todos = action.payload;
    });
    builder.addCase(getTodosFromDb.rejected, (state, action) => {
      state.status = 'rejected';
      state.loading = false;
      state.todos = [];
    });
    builder.addCase(postTodoToDb.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(postTodoToDb.fulfilled, (state, action) => {
      state.status = 'fullfilled';
      state.todos.push(action.payload);
    });
    builder.addCase(postTodoToDb.rejected, (state, action) => {
      state.status = 'rejected';
    });
    builder.addCase(deleteTodoFromDb.pending, (state, action) => {
      state.status = 'pending';
    });
    builder.addCase(deleteTodoFromDb.fulfilled, (state, action) => {
      state.status = 'fullfilled';
      //   console.log('pl', action.payload);
      if (action.payload.status === 404) {
        console.log('not found');
        return;
      }
      state.todos = state.todos.filter((el) => el.id !== action.payload.id);
    });
    builder.addCase(deleteTodoFromDb.rejected, (state, action) => {
      state.status = 'rejected';

      return state;
    });
    builder.addCase(updateTodoToDb.pending, (state, action) => {
      state.status = 'pending';
      state.updateStatus = !action.updateStatus;
    });
    builder.addCase(updateTodoToDb.fulfilled, (state, action) => {
      state.status = 'fullfilled';
      console.log(action.payload);
      state.fireUpdate = {};
      if (action.payload.status !== 200) {
        console.log('error not found');
        return;
      }

      // state.triggerRender = (function() {
      //   setTimeout(() => {
      //     return false;
      //   }, 3000);
      // })();
    });
    builder.addCase(updateTodoToDb.rejected, (state, action) => {
      state.updateStatus = 500;
      state.status = 'rejected';
    });
  },
});
export default todosSlice.reducer;
