import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';

export const fetchJobs = createAsyncThunk('jobs/fetchJobs', async () => {
  const response = await instance.get('/job/Alljobs');
  return response.data;
});
//selon les compétences du candidat
export const fetchAllJobs = createAsyncThunk('jobs/fetchAllJobs', async () => {
  const response = await instance.get('/job/MatchingJobs');
  return response.data;
});

const jobsSlice = createSlice({
  name: 'jobs',
  initialState: {
    jobsData: [],
    filteredJobs: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilteredJobs(state, action) {
      state.filteredJobs = action.payload;
    },
    resetFilters(state) {
      state.filteredJobs = state.jobsData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobsData = action.payload;
        state.filteredJobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchAllJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchAllJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobsData = action.payload;
        state.filteredJobs = action.payload;
      })
      .addCase(fetchAllJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

export const { setFilteredJobs, resetFilters } = jobsSlice.actions;

export default jobsSlice.reducer;
