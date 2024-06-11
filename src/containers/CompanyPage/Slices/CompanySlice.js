
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';

export const fetchCompany = createAsyncThunk(
  'company/fetchCompany',
  async (id) => {
    const response = await instance.get(`/user/recruiter/${id}`);
    return response.data;
  }
);

export const fetchJobs = createAsyncThunk(
  'jobs/fetchJobs',
  async (id) => {
    const response = await instance.get(`/job/latest_jobs/${id}`);
    return response.data;
  }
);

const companySlice = createSlice({
  name: 'company',
  initialState: {
    companyData: {},
    status: 'idle',
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.companyData = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.companyData.latest_jobs = action.payload;
      });
  },
});

export const selectCompanyStatus = (state) => state.company.status;

export default companySlice.reducer;
