import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';

export const fetchJobApplications = createAsyncThunk(
  'candidatures/fetchJobApplications',
  async (jobId) => {
    try {
      const response = await instance.get(`/application/get_job_applications/${jobId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const acceptApplication = createAsyncThunk(
  'candidatures/acceptApplication',
  async (applicationId) => {
    try {
      const response = await instance.put(`/application/accept/${applicationId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

export const rejectApplication = createAsyncThunk(
  'candidatures/rejectApplication',
  async (applicationId) => {
    try {
      const response = await instance.put(`/application/reject/${applicationId}`);
      return response.data;
    } catch (error) {
      return error.response.data;
    }
  }
);

const candidatureSlice = createSlice({
  name: 'candidatures',
  initialState: {
    candidatures: [],
    loading: false,
    error: null,
    status: 'idle'
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobApplications.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.status = 'loading';
      })
      .addCase(fetchJobApplications.fulfilled, (state, action) => {
        state.loading = false;
        state.candidatures = action.payload;
        state.error = null;
        state.status = 'succeeded';
      })
      .addCase(fetchJobApplications.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.status = 'failed';
      })
      .addCase(acceptApplication.fulfilled, (state, action) => {
        state.candidatures = state.candidatures.map(candidature =>
          candidature._id === action.payload._id ? action.payload : candidature
        );
      })
      .addCase(rejectApplication.fulfilled, (state, action) => {
        state.candidatures = state.candidatures.map(candidature =>
          candidature._id === action.payload._id ? action.payload : candidature
        );
      });
  }
});

export default candidatureSlice.reducer;
