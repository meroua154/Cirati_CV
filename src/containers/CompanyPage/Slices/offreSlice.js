import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';

export const fetchCompany = createAsyncThunk('offre/fetchCompany', async (recId) => {
  const response = await instance.get(`/user/recruiter/${recId}`);
  return response.data;
});

export const fetchOffres = createAsyncThunk('offre/fetchOffres', async ({ recId, id }) => {
  const response = await instance.get(`/job/get_job/${recId}/${id}`);
  return response.data;
});

export const fetchJobs = createAsyncThunk('offre/fetchJobs', async ({recruiterId}) => {
  const response = await instance.get(`/job/get_jobs/${recruiterId}`);
  return response.data;
});

export const addApplication = createAsyncThunk('offre/addApplication', async ({ file, applicantId, jobId, recruiterId }) => {
  const formData = new FormData();
  formData.append('cv', file);
  formData.append('applicantId', applicantId);
  formData.append('jobId', jobId);
  formData.append('recruiterId', recruiterId);
  try {
    const response = await instance.post('/application/add_application', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
});

const offreSlice = createSlice({
  name: 'offre',
  initialState: {
    company: {},
    offre: {},
    jobs: [], 
    status: 'idle',
    error: null,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompany.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCompany.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.company = action.payload;
      })
      .addCase(fetchCompany.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchOffres.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchOffres.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.offre = action.payload;
      })
      .addCase(fetchOffres.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(fetchJobs.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.jobs = action.payload; 
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addApplication.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addApplication.fulfilled, (state) => {
        state.status = 'succeeded';
      })
      .addCase(addApplication.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});
export const selectoffreSliceStatus = (state) => state.offre.status;
export default offreSlice.reducer;
