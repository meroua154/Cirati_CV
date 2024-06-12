import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';

export const fetchEvents = createAsyncThunk('events/fetchEvents', async () => {
  const response = await instance.get('/event/All');
  return response.data;
});

const eventsSlice = createSlice({
  name: 'events',
  initialState: {
    eventsData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEvents.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchEvents.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.eventsData = action.payload;
      })
      .addCase(fetchEvents.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const selectEvents = (state) => state.events.eventsData;

export default eventsSlice.reducer;
