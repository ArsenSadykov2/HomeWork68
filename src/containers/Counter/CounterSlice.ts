import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';
import axiosApi from '../../axiosApi.ts';

interface CounterState {
  value: number;
  isLoading: boolean;
  error: boolean;
}

const initialState: CounterState = {
  value: 0,
  isLoading: false,
  error: false,
}

export const fetchCounter = createAsyncThunk('counter/fetchCounter', async () => {
  const {data: counter} = await axiosApi<number | null>('counter.json');
  return counter || 0;
});

export const changeCounterValue = createAsyncThunk<void, void, {state: RootState}>('counter/changeCounterValue', async (_arg,thunkAPI ) => {
  const currentValueCOunterFromState = thunkAPI.getState().counter.value;
  await axiosApi.put('counter.json', currentValueCOunterFromState + 1);
});

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increase: (state) => {
      state.value += 1;
    },
    increaseByNumber: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    decrease: (state) => {
      state.value -= 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounter.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchCounter.fulfilled, (state, action) => {
        state.isLoading = false;
        state.value = action.payload;
      })
      .addCase(fetchCounter.rejected, (state) => {
        state.isLoading = true;
        state.error = true;
      })
      .addCase(changeCounterValue.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(changeCounterValue.fulfilled, (state) => {
        state.isLoading = false;
      })
      .addCase(changeCounterValue.rejected, (state) => {
        state.isLoading = true;
        state.error = true;
      })
  }
});

export const counterReducer = counterSlice.reducer;
export const {increase, decrease, increaseByNumber} = counterSlice.actions;