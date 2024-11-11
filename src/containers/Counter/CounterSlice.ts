import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';

interface Task {
  id: number;
  title: string;
  loading: boolean;
}

interface CounterState {
  value: Task[];
  isLoading: boolean;
  error: boolean;
}

const initialState: CounterState = {
  value: [],
  isLoading: false,
  error: false,
}

export const fetchCounter = createAsyncThunk('counter/fetchCounter', async () => {
  const response = await axiosApi.get('/counter');
  return response.data;
});


export const changeCounterValue = createAsyncThunk('counter/changeCounterValue', async (title: string ) => {
  const currentValueCounterFromState = await axiosApi.post('counter.json', {title, loading: false});
  return currentValueCounterFromState.data;
});

export const deleteCounterValue = createAsyncThunk('counter/deleteCounterValue', async (valueId: number) => {
  await axiosApi.delete(`/counter/${valueId}`);
  return valueId;
});

export const switchCounter = createAsyncThunk('counter/switchCounter', async (valueId: number) => {
  const response = await axiosApi.patch(`/counter/${valueId}`, (task) => ({
    loading: !task.loading,
  }));
  return response.data;
});
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCounter.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(fetchCounter.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.value = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchCounter.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(changeCounterValue.fulfilled, (state, action: PayloadAction<Task>) => {
        state.value.push(action.payload);
      })
      .addCase(changeCounterValue.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteCounterValue.fulfilled, (state, action: PayloadAction<number>) => {
        state.value = state.value.filter((task) => task.id !== action.payload);
      })
      .addCase(deleteCounterValue.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(switchCounter.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.value.findIndex((task) => task.id === action.payload.id);
          state.value[index] = action.payload;
      })
      .addCase(switchCounter.rejected, (state) => {
        state.isLoading = false;
      });
  }
});

export const counterReducer = counterSlice.reducer;