import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteTodoFromDb,
  getTodosFromDb,
  postTodoToDb,
  updateTodoToDb,
} from '../features/todosReducer';
import { createId } from '../utils/utils';
import { editTodosActions } from '../features/editTodoReducer';
const TodosForm = ({ setCheckUpdate }) => {
  const dispatch = useDispatch();
  const { todoToEdit, edition } = useSelector((state) => state.edit);
  const { fireUpdate } = useSelector((state) => state.todos);

  const handleUpdate = (data) => {
    dispatch(updateTodoToDb(data));
    setCheckUpdate(fireUpdate);
  };
  useEffect(() => {
    console.log('mode change');
  }, [todoToEdit]);
  function handleTodos(newTodo) {
    const data = {
      id: (edition && todoToEdit.id) || createId(),
      ...Object.fromEntries(new FormData(newTodo)),
    };

    !edition ? dispatch(postTodoToDb(data)) : handleUpdate(data);
    //  handleUpdate(data, getTodosFromDb)
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    // const data = {
    //   id: createId(),
    //   ...Object.fromEntries(new FormData(e.target)),
    // };
    // dispatch(postTodoToDb(data));

    // !edition && handleAddTo(e.target);
    //  edition && handleAddTo(e.target);
    handleTodos(e.target);
    e.target.reset();
  };
  const handleReset = () => {
    if (edition) {
      dispatch(editTodosActions.resetTodo());
    }
  };
  return (
    <div className='ph5' onSubmit={handleSubmit} onReset={handleReset}>
      <form className='ba ph2 pv3'>
        <label>
          title
          <input
            type='text'
            name='title'
            defaultValue={todoToEdit === null ? '' : todoToEdit.title}
          />
        </label>
        <label>
          description
          <textarea
            type='text'
            name='description'
            defaultValue={!edition ? '' : todoToEdit.description}
          />
        </label>
        <div className='flex pv2'>
          {!edition && (
            <button className='bg-green' type='submit'>
              add
            </button>
          )}
          {edition && (
            <button className='bg-green' type='submit'>
              update todo
            </button>
          )}

          <button className='bg-red ml2' type='reset'>
            reset
          </button>
        </div>
      </form>
    </div>
  );
};
const Todos = () => {
  const dispatch = useDispatch();
  const { todos, status, loading, fireUpdate } = useSelector(
    (state) => state.todos
  );
  const [checkUpdate, setCheckUpdate] = useState(fireUpdate);
  useEffect(() => {
    dispatch(getTodosFromDb());
  }, []);
  useEffect(() => {
    dispatch(getTodosFromDb());
    console.log('refetched');
  }, [fireUpdate]);

  return (
    <div>
      <h1>Todos</h1>
      <TodosForm {...{ setCheckUpdate }} />
      {loading && 'loading state'}
      {status === 'fullfilled' && todos && (
        <ul className='ph5'>
          {todos.map((el) => {
            const { id, title, description } = el;
            return (
              <li key={id}>
                <article className='ba'>
                  <p>id = {id} </p>
                  <p>title = {title} </p>
                  <p>description = {description} </p>
                  <div className='btn-container flex '>
                    <button
                      className='bg-red'
                      onClick={() => dispatch(deleteTodoFromDb(id))}
                    >
                      delete
                    </button>
                    <button
                      className='ml2'
                      onClick={() =>
                        dispatch(
                          editTodosActions.setTodo(
                            todos.find((el) => el.id === id)
                          )
                        )
                      }
                    >
                      edit
                    </button>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Todos;
