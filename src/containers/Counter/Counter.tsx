import { useDispatch, useSelector } from 'react-redux';
import {
  changeCounterValue,
   fetchCounter

} from './CounterSlice.ts';
import { AppDispatch, RootState } from '../../app/store.ts';
import { useEffect } from 'react';


const Counter = () => {
  const counterValue = useSelector((state: RootState) => state.counter.value);
  const dispatch: AppDispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCounter());
  }, [dispatch]);

  const changeValueInApi = async () => {
   await dispatch(changeCounterValue());
   await dispatch(fetchCounter());
  };
  return (
    <div>
      {counterValue}
      <hr/>
      <button onClick={changeValueInApi}>ChangeValue + 1 in API</button>
      <hr/>
    </div>
  );
};

export default Counter;