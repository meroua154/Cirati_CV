import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';

export const fetchSponsors = createAsyncThunk('sponsors/fetchSponsors', async () => {
  const response = await instance.get('/sponsor/All');
  return response.data;
});

const sponsorsSlice = createSlice({
  name: 'sponsors',
  initialState: {
    sponsorsData: [],
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSponsors.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchSponsors.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.sponsorsData = action.payload;
      })
      .addCase(fetchSponsors.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export default sponsorsSlice.reducer;
