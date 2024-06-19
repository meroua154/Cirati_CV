// savedJobsSlice.js

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';

export const fetchSavedJobs = createAsyncThunk(
  'savedJobs/fetchSavedJobs',
  async (userId) => {
    try {
      const response = await instance.get(`/savedjobs/${userId}`);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const addSavedJob = createAsyncThunk(
  'savedJobs/addSavedJob',
  async ({ userId, jobId }) => {
    try {
      const response = await instance.post('/savedjobs/add', { userId, jobId });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  }
);

export const removeSavedJob = createAsyncThunk(
  'savedJobs/removeSavedJob',
  async (savedJobId) => {
    try {
      await instance.delete(`/savedjobs/remove/${savedJobId}`);
      return savedJobId;
    } catch (error) {
      throw error.response.data;
    }
  }
);

const savedJobsSlice = createSlice({
  name: 'savedJobs',
  initialState: {
    savedJobs: [],
    loading: false,
    error: null,
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchSavedJobs.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.loading = false;
        state.savedJobs = action.payload;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(addSavedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(addSavedJob.fulfilled, (state, action) => {
        state.loading = false;
        state.savedJobs.push(action.payload); 
        state.status = 'succeeded';
      })
      .addCase(addSavedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(removeSavedJob.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(removeSavedJob.fulfilled, (state, action) => {
        state.loading = false;
        state.savedJobs = state.savedJobs.filter(job => job._id !== action.payload);
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(removeSavedJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      });
  }
});

export default savedJobsSlice.reducer;
