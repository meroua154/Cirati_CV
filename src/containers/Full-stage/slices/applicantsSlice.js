import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import instance from '../../../utils/setAuthToken';

export const fetchApplicants = createAsyncThunk('applicants/fetchApplicants', async () => {
  const response = await instance.get('/user/applicants');
  return response.data;
});

export const fetchApplicantById = createAsyncThunk('applicant/fetchApplicantById', async (applicantId) => {
  const response = await instance.get(`/user/applicant/${applicantId}`);
  return response.data;
});

const applicantsSlice = createSlice({
  name: 'applicants',
  initialState: {
    applicantsData: [],
    filteredApplicants: [],
    status: 'idle',
    error: null,
  },
  reducers: {
    setFilteredApplicants(state, action) {
      state.filteredApplicants = action.payload;
    },
    resetFilters(state) {
      state.filteredApplicants = state.applicantsData;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicants.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApplicants.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.applicantsData = action.payload;
        state.filteredApplicants = action.payload;
      })
      .addCase(fetchApplicants.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});

const applicantSlice = createSlice({
  name: 'applicant',
  initialState: {
    selectedApplicant: null,
    status: 'idle',
    error: null,
  },
  reducers: {
    clearSelectedApplicant(state) {
      state.selectedApplicant = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchApplicantById.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApplicantById.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.selectedApplicant = action.payload;
      })
      .addCase(fetchApplicantById.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});


export const { setFilteredApplicants, resetFilters } = applicantsSlice.actions;
export const { clearSelectedApplicant } = applicantSlice.actions;
export const applicantsReducer = applicantsSlice.reducer;
export const applicantReducer = applicantSlice.reducer;
