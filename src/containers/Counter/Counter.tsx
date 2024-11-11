import { useDispatch, useSelector } from 'react-redux';
import {
  changeCounterValue, deleteCounterValue,
  fetchCounter, switchCounter

} from './CounterSlice.ts';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect, useState } from 'react';


const Counter = () => {
  const inputs = useSelector((state: RootState) => state.counter.value);
  const isLoading = useSelector((state: RootState) => state.counter.isLoading);
  const error = useSelector((state: RootState) => state.counter.error);
  const dispatch: AppDispatch = useDispatch();
  const id = document.getElementById('d');
  const ids = document.getElementById('ds');


  const [newTaskofArray, setNewTaskofArray] = useState<string>('');

  useEffect(() => {
    dispatch(fetchCounter());
  }, [dispatch]);

  return (
    <div className="container">
      <h1>Todo List App</h1>

      {isLoading && <div className="loader"></div>}

      <div>
        <input
          id="d"
          type="text"
          value={newTaskofArray}
          onChange={(e) => setNewTaskofArray(e.target.value)}
          placeholder="Enter new task"
        />
        <button onClick={() => {dispatch(changeCounterValue(newTaskofArray))}} disabled={isLoading}>
          Add New Task
        </button>
      </div>

      {error}
      <div>
        <ul>
          {inputs.map((task) => (
            <li key={task.id}>
              <input
                type="checkbox"
                checked={task.loading}
                onChange={() => {
                  dispatch(switchCounter(task.id))
                }}
              />
              {task.title}
              <input
                type="text"
                id="ds"
              />
              <button onClick={() => {
                dispatch(deleteCounterValue(task.id))
              }}>Delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};


export default Counter;