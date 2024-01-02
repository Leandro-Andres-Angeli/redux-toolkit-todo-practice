import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import colors from '../utils/UI/colors';
import { counterActions } from '../features/counterReducer';
import { useDispatch } from 'react-redux';

const Counter = () => {
  const [num, setNum] = useState('');
  const { counter } = useSelector((state) => state);
  const dispatch = useDispatch();
  const handleClick = (action) => {
    dispatch(action());
  };
  return (
    <div>
      <h2> Redux Devtoolkit Counter</h2>
      {typeof counter === 'number' && (
        <p>
          Counter val{' '}
          {<strong style={{ color: colors.fuchsia }}> {counter} </strong>}{' '}
        </p>
      )}
      <div className='buttons' style={{ display: 'flex' }}>
        <button
          style={{ width: 'fit-content', margin: '10px' }}
          onClick={() => handleClick(counterActions.increment)}
        >
          +
        </button>
        <button
          style={{ width: 'fit-content', margin: '10px' }}
          onClick={() => handleClick(counterActions.decrement)}
        >
          -
        </button>
      </div>
      <div>
        <p>Operation Passing number</p>
        <input
          onChange={function(e) {
            setNum(Number(e.target.value));
          }}
          type='number'
          placeholder='your number here'
        />
        <button
          style={{ width: 'fit-content', margin: '10px' }}
          onClick={() =>
            dispatch(dispatch(counterActions.incrementByValue(num)))
          }
        >
          +
        </button>
        <button
          style={{ width: 'fit-content', margin: '10px' }}
          onClick={() =>
            dispatch(dispatch(counterActions.decrementByValue(num)))
          }
        >
          -
        </button>
      </div>
    </div>
  );
};

export default Counter;
